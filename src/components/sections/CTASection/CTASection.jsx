/* ============================================
   CTASection Component - Narayana IIT-JEE
   "Your Dream IIT Seat is One Step Away"
   Dark indigo CTA with stats and enrollment buttons
   ============================================ */

import React from "react";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "../../common/Button/Button";
import { useModal } from "../../../context/ModalContext";
import styles from "./CTASection.module.css";

const CTASection = () => {
  const { openLeadDrawer } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleEnrollNow = () => {
    openLeadDrawer("enroll-now");
  };

  const stats = [
    { value: "47+", label: "Years", icon: "mdi:trophy-award" },
    { value: "Top 10", label: "AIR", icon: "mdi:star-circle" },
    { value: "90%", label: "Scholarship", icon: "mdi:percent-circle" },
  ];

  return (
    <section id="cta" className={styles.section}>
      {/* Background Overlay Image */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Headline */}
          <motion.div variants={itemVariants}>
            <Typography variant="h3" className={styles.title}>
              Your Dream IIT Seat is{" "}
              <span className={styles.highlight}>One Step Away</span>
            </Typography>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              className={styles.description}
              sx={{ color: "#fff" }}
            >
              Join thousands of successful Narayana students who cracked
              IIT-JEE. Limited seats available for 2025-26 batch in Guwahati.
            </Typography>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && <div className={styles.statDivider} />}
                <div className={styles.statItem}>
                  <Icon icon={stat.icon} className={styles.statIcon} />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className={styles.ctaButtons}>
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            >
              <Button
                variant="primary"
                size="large"
                endIcon="mdi:arrow-right"
                onClick={handleEnrollNow}
                className={styles.primaryBtn}
              >
                Enroll Now — Limited Seats!
              </Button>
            </motion.div>

            <Button
              variant="outline"
              size="large"
              startIcon="mdi:phone-outline"
              href="tel:+916002500672"
              className={styles.secondaryBtn}
            >
              Call: 6002-500-672
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Corner Decorations */}
      <div className={styles.cornerDecoration1} />
      <div className={styles.cornerDecoration2} />
    </section>
  );
};

export default CTASection;
