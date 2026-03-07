/* ============================================
   SecondaryCTASection Component - Narayana NEET
   Foundation Course CTA with inline lead form
   Placed before footer for Class 8-10 students
   ============================================ */

import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  submitLeadToWebhook,
  isDuplicateLead,
  markLeadAsSubmitted,
} from "../../../utils/webhookSubmit";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { showSuccess, showError, showInfo } from "../../../utils/swalHelper";
import Button from "../../common/Button/Button";
import {
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
} from "../../../utils/validators";
import styles from "./SecondaryCTASection.module.css";

const LEADS_STORAGE_KEY = "narayana_neet_submitted_leads";

const CLASS_OPTIONS = ["Class 7", "Class 8", "Class 9", "Class 10"];
const PROGRAMME_OPTIONS = [
  "1-Year Foundation",
  "2-Year Foundation",
  "3-Year Foundation",
];

const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  current_class: "",
  interested_programme: "",
};

const initialErrorState = {
  name: "",
  mobile: "",
  email: "",
  current_class: "",
  interested_programme: "",
};

const courseCards = [
  {
    title: "1-Year Foundation",
    eligibility: "Class IX/X Students",
    hours: "300 Hours",
    frequency: "2-3 Days/Week",
    startDate: "March / April",
    icon: "mdi:rocket-launch",
  },
  {
    title: "2-Year Foundation",
    eligibility: "Class VIII/IX Students",
    hours: "600 Hours",
    frequency: "2-3 Days/Week",
    startDate: "April / May",
    icon: "mdi:trending-up",
  },
  {
    title: "3-Year Foundation",
    eligibility: "Class VII/VIII Students",
    hours: "900 Hours",
    frequency: "2-3 Days/Week",
    startDate: "May",
    icon: "mdi:star-shooting",
  },
];

const highlights = [
  { text: "1, 2 & 3-Year Programmes", icon: "mdi:calendar-clock" },
  { text: "Covers NEET + IIT-JEE + Olympiads", icon: "mdi:book-open-variant" },
  { text: "NTSE & INSPIRE Preparation", icon: "mdi:medal" },
  { text: "Scholarships via NSAT", icon: "mdi:school" },
];

const whyStartEarly = [
  "More time to build strong concepts",
  "Less likely to get overwhelmed by competition",
  "Prepares for Olympiads, NTSE, and INSPIRE simultaneously",
  "Smoother transition to advanced NEET & IIT-JEE preparation",
];

const SecondaryCTASection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const checkDuplicateLead = useCallback((email, mobile) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]",
      );
      return storedLeads.some(
        (lead) =>
          lead.email.toLowerCase() === email.toLowerCase() ||
          lead.mobile === mobile,
      );
    } catch {
      return false;
    }
  }, []);

  const saveLeadToStorage = useCallback((leadData) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]",
      );
      storedLeads.push({
        email: leadData.email,
        mobile: leadData.mobile,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(storedLeads));
    } catch (error) {
      console.error("Error saving lead to storage:", error);
    }
  }, []);

  const handleChange = useCallback(
    (field) => (event) => {
      let value = event.target.value;
      if (field === "mobile") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      let errorMessage = "";
      switch (field) {
        case "name":
          errorMessage = getNameErrorMessage(formData.name);
          break;
        case "mobile":
          errorMessage = getMobileErrorMessage(formData.mobile);
          break;
        case "email":
          errorMessage = getEmailErrorMessage(formData.email);
          break;
        case "current_class":
          if (!formData.current_class)
            errorMessage = "Please select your class";
          break;
        case "interested_programme":
          if (!formData.interested_programme)
            errorMessage = "Please select a programme";
          break;
        default:
          break;
      }
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    },
    [formData],
  );

  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      current_class: !formData.current_class ? "Please select your class" : "",
      interested_programme: !formData.interested_programme
        ? "Please select a programme"
        : "",
    };
    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      current_class: true,
      interested_programme: true,
    });
    return Object.values(newErrors).every((error) => !error);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      if (errors.name || !formData.name) nameRef.current?.focus();
      else if (errors.mobile || !formData.mobile) mobileRef.current?.focus();
      else if (errors.email || !formData.email) emailRef.current?.focus();
      return;
    }

    // Check for duplicate
    if (isDuplicateLead(formData.mobile)) {
      await showInfo(
        "Already Registered!",
        "This mobile number has already been registered. Our counsellor will contact you soon.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        current_class: formData.current_class || "",
        interested_programme: formData.interested_programme || "",
        source: "foundation-course",
      };

      const result = await submitLeadToWebhook(leadData);

      if (result.success) {
        markLeadAsSubmitted(formData.mobile);
        saveLeadToStorage(formData);
        sessionStorage.setItem("lead_submitted", "true");
        sessionStorage.setItem("lead_name", formData.name);

        await showSuccess(
          "Foundation Course Enquiry Received!",
          "Our counsellor will contact you soon.",
        );

        setFormData(initialFormState);
        setTouched({});
        setErrors(initialErrorState);

        navigate("/thank-you");
      } else {
        await showError("Oops!", result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      await showError(
        "Something went wrong",
        "Please try again or call us directly at +91-6002500672.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="foundation" className={styles.section}>
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className={styles.badgeWrapper}>
            <span className={styles.badge}>🌟 Start Early, Stay Ahead</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              className={styles.title}
              sx={{ color: "#fff" }}
            >
              Foundation Courses for NEET & IIT-JEE
            </Typography>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              className={styles.subtitle}
              sx={{ color: "#fff" }}
            >
              For Students in Class 8, 9 & 10 — Build a strong foundation for
              competitive exams with Narayana's expertly designed Foundation
              Programme
            </Typography>
          </motion.div>

          {/* Key Highlights Row */}
          <motion.div variants={itemVariants} className={styles.highlightsRow}>
            {highlights.map((item) => (
              <div key={item.text} className={styles.highlightItem}>
                <Icon icon={item.icon} className={styles.highlightIcon} />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Course Cards */}
          <div className={styles.cardsGrid}>
            {courseCards.map((card, index) => (
              <motion.div
                key={card.title}
                className={styles.courseCard}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.cardIcon}>
                  <Icon icon={card.icon} />
                </div>
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardEligibility}>{card.eligibility}</p>
                <div className={styles.cardDetails}>
                  <div className={styles.cardDetail}>
                    <Icon icon="mdi:clock-outline" />
                    <span>{card.hours}</span>
                  </div>
                  <div className={styles.cardDetail}>
                    <Icon icon="mdi:calendar-week" />
                    <span>{card.frequency}</span>
                  </div>
                  <div className={styles.cardDetail}>
                    <Icon icon="mdi:calendar-start" />
                    <span>Starts: {card.startDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form + Why Start Early layout */}
          <div className={styles.formSection}>
            {/* Inline Lead Form */}
            <motion.div variants={itemVariants} className={styles.formCard}>
              <div className={styles.formHeader}>
                <Icon icon="mdi:school" className={styles.formHeaderIcon} />
                <div>
                  <h4 className={styles.formTitle}>
                    Foundation Course Enquiry
                  </h4>
                  <p className={styles.formSubtitle}>
                    Fill in your details to get started
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                autoComplete="off"
              >
                {/* Student Name */}
                <TextField
                  inputRef={nameRef}
                  fullWidth
                  placeholder="Student's Full Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:account-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Student name", maxLength: 50 }}
                />

                {/* Parent Mobile */}
                <TextField
                  inputRef={mobileRef}
                  fullWidth
                  placeholder="Parent's Mobile Number"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500, mr: 0.5 }}
                        >
                          +91
                        </Typography>
                        <span style={{ color: "#CCC", marginRight: 4 }}>-</span>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    "aria-label": "Mobile number",
                    maxLength: 10,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />

                {/* Email */}
                <TextField
                  inputRef={emailRef}
                  fullWidth
                  placeholder="Email Address"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:email-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Email address" }}
                />

                {/* Current Class Dropdown */}
                <FormControl
                  fullWidth
                  error={touched.current_class && !!errors.current_class}
                  size="small"
                >
                  <Select
                    displayEmpty
                    value={formData.current_class}
                    onChange={handleChange("current_class")}
                    onBlur={handleBlur("current_class")}
                    disabled={isSubmitting}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:school-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    }
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ opacity: 0.5 }}>Current Class</span>
                        );
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Current class" }}
                  >
                    {CLASS_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.current_class && errors.current_class && (
                    <FormHelperText>{errors.current_class}</FormHelperText>
                  )}
                </FormControl>

                {/* Interested Programme Dropdown */}
                <FormControl
                  fullWidth
                  error={
                    touched.interested_programme &&
                    !!errors.interested_programme
                  }
                  size="small"
                >
                  <Select
                    displayEmpty
                    value={formData.interested_programme}
                    onChange={handleChange("interested_programme")}
                    onBlur={handleBlur("interested_programme")}
                    disabled={isSubmitting}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:book-education-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    }
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ opacity: 0.5 }}>
                            Interested Programme
                          </span>
                        );
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Interested programme" }}
                  >
                    {PROGRAMME_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.interested_programme &&
                    errors.interested_programme && (
                      <FormHelperText>
                        {errors.interested_programme}
                      </FormHelperText>
                    )}
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={20} color="inherit" />
                      <span>Submitting...</span>
                    </Box>
                  ) : (
                    <>
                      <Icon
                        icon="mdi:send"
                        style={{ marginRight: 8, fontSize: "1.1rem" }}
                      />
                      <span>Enroll in Foundation Course</span>
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Why Start Early */}
            <motion.div variants={itemVariants} className={styles.whyEarlyCard}>
              <h4 className={styles.whyEarlyTitle}>
                <Icon icon="mdi:lightbulb-on" className={styles.whyEarlyIcon} />
                Why Start Early?
              </h4>
              <ul className={styles.whyEarlyList}>
                {whyStartEarly.map((point) => (
                  <li key={point} className={styles.whyEarlyItem}>
                    <Icon
                      icon="mdi:check-circle"
                      className={styles.checkIcon}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SecondaryCTASection;
