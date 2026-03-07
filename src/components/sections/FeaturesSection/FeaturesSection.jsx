/* ============================================
   FeaturesSection Component - Benefits of Joining Narayana
   Tabbed benefits showcase with course highlights and CTA
   ============================================ */

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import { benefitsData } from "../../../data/benefitsData";
import styles from "./FeaturesSection.module.css";

// Category icons (replacing Lottie animations)
const categoryIcons = {
  1: "mdi:school",
  2: "mdi:hand-heart",
  3: "mdi:rocket-launch",
};

// Accent icons for decorative display (replacing Lottie)
const categoryAccentIcons = {
  1: "mdi:calculator-variant",
  2: "mdi:shield-check",
  3: "mdi:tree",
};

// Course highlights strip items
const courseHighlights = [
  { icon: "mdi:book-open-page-variant", label: "Complete Board + NEET Syllabus" },
  { icon: "mdi:earth", label: "All India Test Series" },
  { icon: "mdi:account-question", label: "Doubt Clearing Sessions" },
  { icon: "mdi:calendar-clock", label: "Micro-Schedule & Test Planners" },
  { icon: "mdi:account-supervisor", label: "Regular Parent Updates" },
  { icon: "mdi:trophy-award", label: "Up to 90% Scholarship via NACST & NSAT" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState(benefitsData[0]?.id ?? 1);
  const { openLeadDrawer } = useModal();

  const handleEnrollNow = () => {
    openLeadDrawer("enroll-now");
  };

  const activeCategory = benefitsData.find((c) => c.id === activeTab) || benefitsData[0];

  return (
    <section className={styles.benefitsSection} id="benefits" ref={ref}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#1A237E",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Benefits of Joining{" "}
              <span className={styles.accentText}>Narayana</span>
            </Typography>
            <Typography
              className={styles.sectionSubtitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: "0.875rem", md: "1.05rem" },
                color: "#546E7A",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              A complete ecosystem designed for your NEET success
            </Typography>
          </motion.div>

          {/* Category Tabs - Desktop */}
          <motion.div variants={itemVariants} className={styles.categoryTabs}>
            {benefitsData.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${
                  activeTab === category.id ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <Icon
                  icon={categoryIcons[category.id]}
                  className={styles.tabIcon}
                />
                <span className={styles.tabLabel}>{category.category}</span>
                {activeTab === category.id && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Benefits Grid - Desktop (tabbed) */}
          <div className={styles.desktopGrid}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className={styles.benefitsGrid}
              >
                {/* Decorative accent icon */}
                <div className={styles.lottieAccent}>
                  <Icon
                    icon={categoryAccentIcons[activeTab]}
                    className={styles.lottiePlayer}
                    style={{ width: '100%', height: '100%', color: '#FF6D00' }}
                  />
                </div>

                {activeCategory.items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={styles.benefitCard}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className={styles.benefitIconWrapper}>
                      <Icon icon={item.icon} className={styles.benefitIcon} />
                    </div>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitTitle}>{item.title}</h4>
                      <p className={styles.benefitDescription}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Benefits Grid - Mobile (all categories stacked) */}
          <div className={styles.mobileStack}>
            {benefitsData.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={styles.mobileCategory}
              >
                <div className={styles.mobileCategoryHeader}>
                  <div className={styles.mobileCategoryLottie}>
                    <Icon
                      icon={categoryAccentIcons[category.id]}
                      style={{ width: '100%', height: '100%', color: '#FF6D00' }}
                    />
                  </div>
                  <h3 className={styles.mobileCategoryTitle}>
                    {category.category}
                  </h3>
                </div>
                <div className={styles.mobileBenefitsGrid}>
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={styles.benefitCard}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className={styles.benefitIconWrapper}>
                        <Icon
                          icon={item.icon}
                          className={styles.benefitIcon}
                        />
                      </div>
                      <div className={styles.benefitContent}>
                        <h4 className={styles.benefitTitle}>{item.title}</h4>
                        <p className={styles.benefitDescription}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Course Highlights Strip */}
          <motion.div variants={itemVariants} className={styles.highlightsStrip}>
            <div className={styles.highlightsTrack}>
              {courseHighlights.map((item, index) => (
                <div key={index} className={styles.highlightChip}>
                  <Icon icon={item.icon} className={styles.highlightIcon} />
                  <span className={styles.highlightLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.ctaWrapper}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.35rem" },
                color: "#1A237E",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Ready to start your NEET journey?
            </Typography>
            <Button
              variant="contained"
              className={styles.ctaButton}
              onClick={handleEnrollNow}
              endIcon={<Icon icon="mdi:arrow-right" />}
              sx={{
                background:
                  "linear-gradient(135deg, #FF6D00 0%, #FF9100 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "0.9rem", md: "1rem" },
                padding: { xs: "12px 28px", md: "14px 36px" },
                borderRadius: "50px",
                textTransform: "none",
                boxShadow: "0 8px 32px rgba(255, 109, 0, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)",
                  boxShadow: "0 12px 40px rgba(255, 109, 0, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Enroll Now
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
