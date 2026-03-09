/* ============================================
   ContactSection Component - Narayana Coaching Centers
   "Get in Touch" contact section with contact cards
   and embedded lead form
   ============================================ */

import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import UnifiedLeadForm from "../../common/UnifiedLeadForm/UnifiedLeadForm";
import { useModal } from "../../../context/ModalContext";
import styles from "./ContactSection.module.css";

const ContactSection = () => {
  const { openLeadDrawer } = useModal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Contact info items
  const contactInfo = [
    {
      icon: "mdi:phone-outline",
      title: "Phone",
      content: "+91-6002500672",
      href: "tel:+916002500672",
    },
    {
      icon: "mdi:phone-in-talk",
      title: "Toll Free",
      content: "1800-102-3344",
      href: "tel:18001023344",
    },
    {
      icon: "mdi:email-outline",
      title: "Email",
      content: "bm.guwahati@narayanagroup.com",
      href: "mailto:bm.guwahati@narayanagroup.com",
    },
    {
      icon: "mdi:whatsapp",
      title: "WhatsApp",
      content: "Quick Chat",
      href: "https://wa.me/916002500672?text=Hi%20I%20am%20interested%20in%20Narayana%20NEET%20Coaching%20in%20Guwahati,%20I%20saw%20your%20ad%20on%20Google.",
      external: true,
    },
    {
      icon: "mdi:map-marker-outline",
      title: "Address",
      content: "Narayana Coaching Center, Guwahati, Assam",
    },
    {
      icon: "mdi:clock-outline",
      title: "Hours",
      content: "Mon-Sat, 9:00 AM - 7:00 PM",
    },
  ];

  const handleRequestCallback = () => {
    openLeadDrawer("default", {
      title: "Request a Callback",
      subtitle: "Fill in your details and our counsellors will call you back",
    });
  };

  return (
    <section id="contact" className={styles.section}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Typography variant="h2" className={styles.sectionTitle}>
              Get in <span className={styles.highlight}>Touch</span>
            </Typography>
            <Typography variant="body1" className={styles.sectionSubtitle}>
              Have questions? Our academic counsellors are here to help
            </Typography>
          </motion.div>

          {/* Quick Action Buttons (mobile-first, visible on all) */}
          <motion.div variants={itemVariants} className={styles.quickActions}>
            <a href="tel:+916002500672" className={styles.quickActionBtn}>
              <Icon icon="mdi:phone" className={styles.quickActionIcon} />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/916002500672?text=Hi%20I%20am%20interested%20in%20Narayana%20NEET%20Coaching%20in%20Guwahati,%20I%20saw%20your%20ad%20on%20Google."
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.quickActionBtn} ${styles.quickActionWhatsapp}`}
            >
              <Icon icon="mdi:whatsapp" className={styles.quickActionIcon} />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={handleRequestCallback}
              className={`${styles.quickActionBtn} ${styles.quickActionCallback}`}
            >
              <Icon
                icon="mdi:phone-callback"
                className={styles.quickActionIcon}
              />
              <span>Request Callback</span>
            </button>
          </motion.div>

          <Grid container spacing={6} alignItems="flex-start">
            {/* Left Side - Contact Cards */}
            <Grid item xs={12} lg={6}>
              <motion.div
                variants={itemVariants}
                className={styles.contentWrapper}
              >
                <div className={styles.contactGrid}>
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={styles.contactCard}
                    >
                      <div className={styles.contactIcon}>
                        <Icon icon={item.icon} />
                      </div>
                      <div className={styles.contactText}>
                        <Typography
                          variant="subtitle2"
                          className={styles.contactTitle}
                        >
                          {item.title}
                        </Typography>
                        {item.href ? (
                          <a
                            href={item.href}
                            className={styles.contactLink}
                            {...(item.external
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                          >
                            {item.content}
                          </a>
                        ) : (
                          <Typography
                            variant="body2"
                            className={styles.contactContent}
                          >
                            {item.content}
                          </Typography>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} lg={6}>
              <motion.div
                variants={formVariants}
                className={styles.formWrapper}
              >
                {/* Form Header */}
                <div className={styles.formHeader}>
                  <Typography variant="h5" className={styles.formTitle}>
                    Send Us Your Query
                  </Typography>
                  <Typography variant="body2" className={styles.formSubtitle}>
                    Fill in your details and we'll get back to you
                  </Typography>
                </div>

                {/* Unified Lead Form */}
                <UnifiedLeadForm
                  variant="default"
                  showTitle={false}
                  showSubtitle={false}
                  showTrustBadges={true}
                  showConsent={true}
                  showPhoneButton={false}
                  submitButtonText="Submit Enquiry"
                  formId="contact-form"
                  className={styles.formContent}
                />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactSection;
