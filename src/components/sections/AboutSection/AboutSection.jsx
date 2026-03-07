/* ============================================
   AboutSection Component - About Narayana
   NEET legacy, stats, content grid & differentiators
   ============================================ */

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import styles from "./AboutSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

// Stats data
const keyStats = [
  {
    value: "47",
    suffix: "+",
    label: "Years of Excellence",
    icon: "mdi:trophy-award",
    color: "#FF6D00",
  },
  {
    value: "5",
    suffix: "",
    label: "out of Top 10 AIR (Every Year)",
    icon: "mdi:medal",
    color: "#1A237E",
  },
  {
    value: "3128",
    suffix: "",
    label: "Doctors in 2024",
    icon: "mdi:star-circle",
    color: "#FF6D00",
  },
  {
    value: "950",
    suffix: "+",
    label: "Schools Pan India",
    icon: "mdi:domain",
    color: "#1A237E",
  },
  {
    value: "350",
    suffix: "+",
    label: "Coaching Centres",
    icon: "mdi:map-marker-multiple",
    color: "#FF6D00",
  },
];

// Image grid data
const gridImages = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    alt: "Narayana Classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    alt: "Narayana Students",
  },
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&h=300&fit=crop",
    alt: "Narayana Results",
  },
];

// Key differentiators data
const differentiators = [
  {
    icon: "mdi:calendar-clock",
    title: "Micro-Schedules & Test Planners",
    description:
      "Structured daily plans and test schedules designed for maximum efficiency and consistent progress.",
  },
  {
    icon: "mdi:whatsapp",
    title: "WhatsApp Query Resolution System (WQRS)",
    description:
      "Instant doubt-clearing via WhatsApp so students never stay stuck on a problem.",
  },
  {
    icon: "mdi:file-document-check",
    title: "All India Test Series",
    description:
      "Compete with thousands of aspirants nationwide and benchmark your preparation level.",
  },
  {
    icon: "mdi:account-star",
    title: "Personalised Coaching",
    description:
      "Tailored guidance and mentoring based on each student's strengths and areas of improvement.",
  },
];

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleExploreCourses = () => {
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.overviewSection} id="why-narayana" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.mainWrapper}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <span className={styles.badge}>ABOUT NARAYANA</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
                color: "#1A237E",
                letterSpacing: "-0.01em",
              }}
            >
              Why Choose Narayana for NEET?
            </Typography>
            <Typography
              variant="h3"
              className={styles.sectionSubtitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem" },
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              India's Most Trusted Name in NEET Coaching Since 1979
            </Typography>
          </motion.div>

          {/* Stats Counter Row */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {keyStats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon icon={stat.icon} style={{ color: stat.color }} />
                </div>
                <div className={styles.statValue}>
                  <AnimatedCounter
                    value={stat.value}
                    duration={1.5}
                    delay={0.2 + index * 0.1}
                  />
                  {stat.suffix && (
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                  )}
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Grid (2 columns desktop, 1 column mobile) */}
          <div className={styles.contentGrid}>
            {/* Left Column - Text */}
            <motion.div variants={itemVariants} className={styles.textColumn}>
              <Typography className={styles.contentParagraph}>
                For more than forty-seven years, Narayana Group has established
                unparalleled standards in academic excellence. Consistently
                producing top performers in NEET since inception, Narayana is
                now the best coaching center for NEET in India.
              </Typography>
              <Typography className={styles.contentParagraph}>
                In NEET 2024, 5 out of the top-10 All India Rankers (All Categories)
                were from Narayana. A total of 3,128 students achieved their dream of
                becoming doctors.
              </Typography>
              <Button
                variant="contained"
                onClick={handleExploreCourses}
                className={styles.ctaButton}
                endIcon={<Icon icon="mdi:arrow-right" />}
                sx={{
                  background:
                    "linear-gradient(135deg, #FF6D00 0%, #FF9100 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: { xs: "0.9375rem", md: "1rem" },
                  padding: { xs: "12px 28px", md: "14px 36px" },
                  borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 8px 30px rgba(255, 109, 0, 0.3)",
                  marginTop: "1.5rem",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)",
                    boxShadow: "0 12px 40px rgba(255, 109, 0, 0.45)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Explore Our Courses →
              </Button>
            </motion.div>

            {/* Right Column - Image Grid */}
            <motion.div variants={itemVariants} className={styles.imageColumn}>
              {gridImages.map((img, index) => (
                <motion.div
                  key={index}
                  className={styles.imageWrapper}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={styles.gridImage}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key Differentiators Row */}
          <motion.div
            variants={itemVariants}
            className={styles.differentiatorsRow}
          >
            <Typography
              variant="h4"
              className={styles.differentiatorsTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "#1A237E",
                textAlign: "center",
                marginBottom: { xs: "1.5rem", md: "2rem" },
              }}
            >
              What Sets Narayana Apart
            </Typography>
            <div className={styles.differentiatorsGrid}>
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.differentiatorCard}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.differentiatorIcon}>
                    <Icon icon={item.icon} />
                  </div>
                  <h4 className={styles.differentiatorTitle}>{item.title}</h4>
                  <p className={styles.differentiatorDesc}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;
