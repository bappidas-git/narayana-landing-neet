/* ============================================
   HighlightsSection Component - Results & Achievements
   Showcases Narayana's IIT-JEE results and testing ecosystem
   ============================================ */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import { useModal } from "../../../context/ModalContext";
import styles from "./HighlightsSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Results highlight data
const resultsData = [
  {
    id: 1,
    icon: "mdi:trophy-award",
    iconColor: "#FFD700",
    title: "JEE Advanced 2024",
    stat: 5,
    statSuffix: "",
    statLabel: "out of Top 10 AIR Every Year (Open Category)",
    subStats: "30 in Top 100",
  },
  {
    id: 2,
    icon: "mdi:earth",
    iconColor: "#42A5F5",
    title: "International Recognition",
    stat: null,
    statLabel:
      "Students regularly achieve top ranks in International Science & Mathematics Olympiads",
    subStats: null,
  },
  {
    id: 3,
    icon: "mdi:account-group",
    iconColor: "#66BB6A",
    title: "Overall Selections",
    stat: null,
    statLabel:
      "Thousands of students selected in IIT-JEE every year across all Narayana centers",
    subStats: null,
  },
];

// Test types data
const testTypes = [
  {
    icon: "mdi:calendar-week",
    name: "Weekly Test",
    tag: "CPT",
    description: "Common Practice Test to track weekly progress",
  },
  {
    icon: "mdi:calendar-range",
    name: "Fortnightly Test",
    tag: null,
    description: "Bi-weekly assessment for concept reinforcement",
  },
  {
    icon: "mdi:school-outline",
    name: "Term Exams",
    tag: null,
    description: "Comprehensive end-of-term evaluation",
  },
  {
    icon: "mdi:pencil-ruler",
    name: "Subjective Test",
    tag: null,
    description: "In-depth descriptive answer evaluation",
  },
  {
    icon: "mdi:map-marker-multiple",
    name: "All India Test Series",
    tag: null,
    description: "Pan-India ranking and benchmarking",
  },
  {
    icon: "mdi:star-circle-outline",
    name: "Grand Test",
    tag: null,
    description: "Full-length simulated JEE exam experience",
  },
];

const HighlightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openLeadDrawer } = useModal();

  const handleScholarshipClick = () => {
    openLeadDrawer("scholarship-test");
  };

  const handleBrochureClick = () => {
    openLeadDrawer("download-brochure");
  };

  return (
    <section className={styles.resultsSection} id="results" ref={ref}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>RESULTS & ACHIEVEMENTS</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#1A237E",
                marginTop: "0.75rem",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Our Results Speak for{" "}
              <span className={styles.highlightText}>Themselves</span>
            </Typography>
            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>
            <Typography className={styles.sectionSubtitle}>
              Narayana's Consistent Track Record in IIT-JEE
            </Typography>
          </motion.div>

          {/* Results Highlight Cards */}
          <motion.div variants={itemVariants} className={styles.resultsGrid}>
            {resultsData.map((card, index) => (
              <motion.div
                key={card.id}
                className={styles.resultCard}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                <div className={styles.resultCardIcon}>
                  <Icon icon={card.icon} style={{ color: card.iconColor }} />
                </div>
                <Typography className={styles.resultCardTitle}>
                  {card.title}
                </Typography>
                {card.stat !== null && (
                  <div className={styles.resultStatWrapper}>
                    <AnimatedCounter
                      value={card.stat}
                      suffix={card.statSuffix}
                      duration={2}
                      delay={0.3 + index * 0.15}
                      variant="large"
                      color="dark"
                    />
                  </div>
                )}
                <Typography className={styles.resultStatLabel}>
                  {card.statLabel}
                </Typography>
                {card.subStats && (
                  <div className={styles.subStatsRow}>
                    <Typography className={styles.subStatText}>
                      {card.subStats}
                    </Typography>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Test Types Section */}
          <motion.div variants={itemVariants} className={styles.testTypesBlock}>
            <Typography
              variant="h3"
              className={styles.testTypesTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "#1A237E",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Our Comprehensive Testing Ecosystem
            </Typography>
            <div className={styles.testTypesGrid}>
              {testTypes.map((test, index) => (
                <motion.div
                  key={test.name}
                  className={styles.testTypeCard}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.4 + index * 0.08 }}
                >
                  <div className={styles.testTypeIcon}>
                    <Icon icon={test.icon} />
                  </div>
                  <div className={styles.testTypeInfo}>
                    <div className={styles.testTypeNameRow}>
                      <Typography className={styles.testTypeName}>
                        {test.name}
                      </Typography>
                      {test.tag && (
                        <span className={styles.testTypeTag}>{test.tag}</span>
                      )}
                    </div>
                    <Typography className={styles.testTypeDesc}>
                      {test.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NACST Scholarship Banner */}
          <motion.div
            variants={itemVariants}
            className={styles.scholarshipBanner}
          >
            <div className={styles.scholarshipContent}>
              <div className={styles.scholarshipIconWrap}>
                <Icon icon="mdi:school" />
              </div>
              <div className={styles.scholarshipTextBlock}>
                <Typography
                  className={styles.scholarshipHeading}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Get Up to 90% Scholarship via NACST & NSAT!
                </Typography>
                <Typography
                  className={styles.scholarshipDesc}
                  sx={{ color: "#fff" }}
                >
                  Register for NACST (Narayana Admission cum Scholarship Test)
                  or NSAT (Narayana Scholastic Aptitude Test) and avail
                  scholarships up to 90% on course fees.
                </Typography>
              </div>
              <motion.button
                className={styles.scholarshipCta}
                onClick={handleScholarshipClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Register for NACST / NSAT</span>
                <Icon icon="mdi:arrow-right" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.bottomCta}>
            <Typography className={styles.bottomCtaText}>
              Want to know more about our results?
            </Typography>
            <motion.button
              className={styles.brochureBtn}
              onClick={handleBrochureClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon icon="mdi:download" />
              <span>Download Brochure</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HighlightsSection;
