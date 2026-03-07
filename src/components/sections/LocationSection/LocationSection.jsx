/* ============================================
   LocationSection Component - Narayana NEET
   Our Centre section showing Guwahati centre info
   ============================================ */

import React from "react";
import { Container, Grid, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import Button from "../../common/Button/Button";
import { useModal } from "../../../context/ModalContext";
import { centreData } from "../../../data/centreData";
import styles from "./LocationSection.module.css";

const LocationSection = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 40px rgba(26, 35, 126, 0.15)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/search/Narayana+Coaching+Center+Guwahati+Assam",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleBookDemo = () => {
    openLeadDrawer("book-free-demo");
  };

  const connectivityHighlights = [
    {
      icon: "mdi:map-marker-radius",
      title: "Accessible from all parts of Guwahati",
      color: "#FF9800",
    },
    {
      icon: "mdi:train",
      title: "Well-connected via Guwahati Railway Station & LGBI Airport",
      color: "#2196F3",
    },
    {
      icon: "mdi:earth",
      title: "Students from across North-East India can enroll",
      color: "#9C27B0",
    },
    {
      icon: "mdi:home-city",
      title: "Hostel assistance available for outstation students",
      color: "#4CAF50",
    },
  ];

  return (
    <section id="centre" className={styles.section}>
      <Container maxWidth="xl">
        {/* Section Title */}
        <SectionTitle
          badge="OUR CENTRE"
          title="Narayana Coaching Centre in"
          highlight="Guwahati"
          subtitle="Bringing world-class NEET coaching to Assam & North-East India"
          align="center"
          variant="light"
          badgeVariant="gold"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4} className={styles.mainContent}>
            {/* Centre Info Card */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={itemVariants}
                className={styles.centreInfoCard}
              >
                <div className={styles.centreHeader}>
                  <div className={styles.centreIconWrapper}>
                    <Icon icon="mdi:school" />
                  </div>
                  <div>
                    <Typography variant="h5" className={styles.centreName}>
                      {centreData.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.centreAddress}
                    >
                      {centreData.address}
                    </Typography>
                  </div>
                </div>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Icon icon="mdi:phone" />
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className={styles.contactLabel}
                      >
                        Phone
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.contactValue}
                      >
                        <a href={`tel:${centreData.phone}`}>+91-6002500672</a>
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Icon icon="mdi:phone-in-talk" />
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className={styles.contactLabel}
                      >
                        Toll Free
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.contactValue}
                      >
                        <a href={`tel:${centreData.tollFree}`}>
                          {centreData.tollFree}
                        </a>
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Icon icon="mdi:email-outline" />
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className={styles.contactLabel}
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.contactValue}
                      >
                        <a href={`mailto:${centreData.email}`}>
                          {centreData.email}
                        </a>
                      </Typography>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>

            {/* Map Section */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants} className={styles.mapWrapper}>
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop"
                      alt="Narayana Coaching Centre Guwahati Location Map"
                      className={styles.mapImage}
                    />
                    <div className={styles.mapOverlay}>
                      <Icon
                        icon="mdi:map-marker"
                        className={styles.mapPinIcon}
                      />
                      <Typography variant="h6" className={styles.mapTitle}>
                        Narayana Coaching Centre
                      </Typography>
                      <Typography variant="body2" className={styles.mapAddress}>
                        Guwahati, Assam
                      </Typography>
                      <Button
                        variant="primary"
                        size="small"
                        startIcon="mdi:map-marker"
                        onClick={handleGetDirections}
                        className={styles.mapButton}
                      >
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Areas Served Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.areasSection}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              className={styles.areasTitle}
              sx={{ marginBottom: "1.5rem" }}
            >
              Now Serving Students From
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.areasGrid}>
            {centreData.nearbyAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                <Chip
                  label={area}
                  className={styles.areaPill}
                  icon={<Icon icon="mdi:map-marker" />}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Connectivity Highlights - 2x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.connectivitySection}
        >
          <Grid container spacing={3}>
            {connectivityHighlights.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={styles.connectivityCard}
                >
                  <div
                    className={styles.connectivityIcon}
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  <Typography
                    variant="body1"
                    className={styles.connectivityText}
                  >
                    {item.title}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.bottomCta}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              className={styles.ctaTitle}
              sx={{ color: "#fff", marginBottom: "2rem" }}
            >
              Visit our Guwahati centre today!
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.ctaButtons}>
            <Button
              variant="primary"
              size="large"
              startIcon="mdi:directions"
              onClick={handleGetDirections}
            >
              Get Directions
            </Button>
            <Button
              variant="outline"
              size="large"
              startIcon="mdi:calendar-check"
              onClick={handleBookDemo}
            >
              Book Free Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background Decorations */}
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />
    </section>
  );
};

export default LocationSection;
