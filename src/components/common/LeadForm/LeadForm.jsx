/* ============================================
   LeadForm Component
   Reusable lead capture form with validation
   ============================================ */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Collapse,
  Alert,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { showAlert, showError, showInfo } from '../../../utils/swalHelper';
import Button from '../Button/Button';
import {
  validateIndianMobile,
  validateEmail,
  validateName,
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
} from '../../../utils/validators';
import styles from './LeadForm.module.css';

// Course interest options
const COURSE_OPTIONS = [
  "Two-Year Classroom Programme (TYCP)",
  "Apex/Spark Integrated Programme",
  "One-Year Classroom Programme (OYCP)",
  "Repeater/Dropper Programme",
  "Foundation Course (Class 8-10)",
  "Not Sure - Need Guidance",
];

// Student class options
const CLASS_OPTIONS = [
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "XII Passed (Dropper)",
];

// Initial form state
const initialFormState = {
  name: '',
  mobile: '',
  email: '',
  course_interest: '',
  student_class: '',
};

// Initial error state
const initialErrorState = {
  name: '',
  mobile: '',
  email: '',
  course_interest: '',
  student_class: '',
};

const LeadForm = ({
  variant = 'default', // 'default', 'compact', 'dark', 'card'
  title = 'Enroll Now',
  subtitle = '',
  submitButtonText = 'Submit',
  showTitle = true,
  showCourseFields = true,
  onSubmitSuccess,
  onSubmitError,
  className = '',
  formId = 'lead-form',
}) => {
  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Refs for input focus management
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const courseRef = useRef(null);
  const classRef = useRef(null);

  // Reset submit status after delay
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Handle input change
  const handleChange = useCallback((field) => (event) => {
    let value = event.target.value;

    // Special handling for mobile number - only allow digits
    if (field === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [errors]);

  // Handle input blur - validate on blur
  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validate the field
    let errorMessage = '';

    switch (field) {
      case 'name':
        errorMessage = getNameErrorMessage(formData.name);
        break;
      case 'mobile':
        errorMessage = getMobileErrorMessage(formData.mobile);
        break;
      case 'email':
        errorMessage = getEmailErrorMessage(formData.email);
        break;
      case 'course_interest':
        if (showCourseFields && !formData.course_interest) {
          errorMessage = 'Please select a course';
        }
        break;
      case 'student_class':
        if (showCourseFields && !formData.student_class) {
          errorMessage = 'Please select your class';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  }, [formData, showCourseFields]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      course_interest:
        showCourseFields && !formData.course_interest
          ? 'Please select a course'
          : '',
      student_class:
        showCourseFields && !formData.student_class
          ? 'Please select your class'
          : '',
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      course_interest: true,
      student_class: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData, showCourseFields]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus first field with error
      if (errors.name || !formData.name) {
        nameRef.current?.focus();
      } else if (errors.mobile || !formData.mobile) {
        mobileRef.current?.focus();
      } else if (errors.email || !formData.email) {
        emailRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit to PHP backend
      const apiUrl = process.env.REACT_APP_API_BASE_URL || '';
      const endpoint = `${apiUrl}/api/save-lead.php`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          course_interest: formData.course_interest || '',
          student_class: formData.student_class || '',
          source: 'website',
        }),
      });

      // Check if response has content before parsing JSON
      const responseText = await response.text();
      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error('Invalid server response');
        }
      }

      // Handle duplicate lead (409 Conflict)
      if (response.status === 409 || data.data?.duplicate) {
        await showInfo(
          'Already Registered!',
          'You have already submitted an enquiry with this email or mobile number. Our team will contact you soon.'
        );
        return;
      }

      // Handle validation errors
      if (response.status === 422 && data.data?.errors) {
        setErrors(data.data.errors);
        throw new Error('Validation failed');
      }

      // Handle other errors
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success handling
      setSubmitStatus('success');
      setFormData(initialFormState);
      setTouched({});

      // Show success message with SweetAlert2
      await showAlert({
        icon: 'success',
        title: 'Enrollment Request Received!',
        text: 'Thank you for your interest in Narayana Coaching Centers! Our academic counsellor will contact you within 24 hours.',
        confirmButtonColor: '#1A237E',
        confirmButtonText: 'Great!',
        timer: 3000,
        timerProgressBar: true,
      });

      // Callback for parent component
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');

      // Show error message with SweetAlert2 (skip if validation error)
      if (error.message !== 'Validation failed') {
        await showError(
          'Oops!',
          error.message || 'Something went wrong. Please try again.'
        );
      }

      // Callback for parent component
      if (onSubmitError) {
        onSubmitError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return styles.variantDark;
      case 'compact':
        return styles.variantCompact;
      case 'card':
        return styles.variantCard;
      default:
        return styles.variantDefault;
    }
  };

  return (
    <motion.div
      className={`${styles.formContainer} ${getVariantStyles()} ${className}`}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Form Title */}
      {showTitle && (
        <Box className={styles.formHeader}>
          <Typography variant="h5" className={styles.formTitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" className={styles.formSubtitle} sx={variant === 'dark' ? { color: '#FFFFFFB3 !important' } : undefined}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Form */}
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        {/* Name Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={nameRef}
            fullWidth
            placeholder="Student's Full Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="ic:outline-person"
                    className={styles.inputIcon}
                    style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                  />
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Your name',
              maxLength: 50,
            }}
          />
        </motion.div>

        {/* Mobile Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={mobileRef}
            fullWidth
            placeholder="Parent's / Student's Mobile"
            variant="outlined"
            value={formData.mobile}
            onChange={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            error={touched.mobile && !!errors.mobile}
            helperText={touched.mobile && errors.mobile}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={styles.mobilePrefix}>
                  <Typography variant="body2" className={styles.countryCode} sx={variant === 'dark' ? { color: '#FFFFFFCC !important' } : undefined}>
                    +91
                  </Typography>
                  <span className={styles.prefixDivider} style={variant === 'dark' ? { color: '#FFFFFF66' } : undefined}>-</span>
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Mobile number',
              maxLength: 10,
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={fieldVariants}>
          <TextField
            inputRef={emailRef}
            fullWidth
            placeholder="Email Address"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="ic:outline-email"
                    className={styles.inputIcon}
                    style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                  />
                </InputAdornment>
              ),
              classes: {
                root: styles.inputRoot,
                focused: styles.inputFocused,
                error: styles.inputError,
              },
            }}
            inputProps={{
              'aria-label': 'Email address',
            }}
          />
        </motion.div>

        {/* Course Interest Field */}
        {showCourseFields && (
          <motion.div variants={fieldVariants}>
            <FormControl
              fullWidth
              error={touched.course_interest && !!errors.course_interest}
              className={styles.textField}
            >
              <Select
                ref={courseRef}
                displayEmpty
                value={formData.course_interest}
                onChange={handleChange('course_interest')}
                onBlur={handleBlur('course_interest')}
                disabled={isSubmitting}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      icon="mdi:book-education-outline"
                      className={styles.inputIcon}
                      style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                    />
                  </InputAdornment>
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: variant === 'dark' ? '#FFFFFF80' : undefined, opacity: variant === 'dark' ? 1 : 0.5 }}>
                        Select Course Interest
                      </span>
                    );
                  }
                  return selected;
                }}
                classes={{
                  root: styles.inputRoot,
                }}
                inputProps={{
                  'aria-label': 'Course interest',
                }}
                sx={
                  variant === 'dark'
                    ? { color: '#FFFFFF', '& .MuiSelect-icon': { color: '#FFFFFF80' } }
                    : undefined
                }
              >
                {COURSE_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {touched.course_interest && errors.course_interest && (
                <FormHelperText>{errors.course_interest}</FormHelperText>
              )}
            </FormControl>
          </motion.div>
        )}

        {/* Student Class Field */}
        {showCourseFields && (
          <motion.div variants={fieldVariants}>
            <FormControl
              fullWidth
              error={touched.student_class && !!errors.student_class}
              className={styles.textField}
            >
              <Select
                ref={classRef}
                displayEmpty
                value={formData.student_class}
                onChange={handleChange('student_class')}
                onBlur={handleBlur('student_class')}
                disabled={isSubmitting}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      icon="mdi:school-outline"
                      className={styles.inputIcon}
                      style={variant === 'dark' ? { color: '#FFFFFF99' } : undefined}
                    />
                  </InputAdornment>
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: variant === 'dark' ? '#FFFFFF80' : undefined, opacity: variant === 'dark' ? 1 : 0.5 }}>
                        Select Student's Class
                      </span>
                    );
                  }
                  return selected;
                }}
                classes={{
                  root: styles.inputRoot,
                }}
                inputProps={{
                  'aria-label': 'Student class',
                }}
                sx={
                  variant === 'dark'
                    ? { color: '#FFFFFF', '& .MuiSelect-icon': { color: '#FFFFFF80' } }
                    : undefined
                }
              >
                {CLASS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {touched.student_class && errors.student_class && (
                <FormHelperText>{errors.student_class}</FormHelperText>
              )}
            </FormControl>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div variants={fieldVariants} className={styles.submitWrapper}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <Box className={styles.loadingState}>
                <CircularProgress size={20} color="inherit" />
                <span>Submitting...</span>
              </Box>
            ) : (
              submitButtonText
            )}
          </Button>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Collapse in={!!submitStatus}>
                <Alert
                  severity={submitStatus}
                  className={styles.statusAlert}
                  onClose={() => setSubmitStatus(null)}
                >
                  {submitStatus === 'success'
                    ? 'Your enquiry has been submitted successfully!'
                    : 'Failed to submit. Please try again.'}
                </Alert>
              </Collapse>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default LeadForm;
