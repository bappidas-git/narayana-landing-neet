/* ============================================
   Footer Component - Narayana Coaching Centers
   Multi-column footer with links, contact info,
   social media, and legal modals
   ============================================ */

import React, { useState } from "react";
import { Container, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import styles from "./Footer.module.css";

// Privacy Policy Content Component
const PrivacyPolicyContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Introduction</h3>
      <p>
        Narayana Group ("we," "our," or "us") respects your privacy and is
        committed to protecting your personal data. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit our website or engage with our coaching services.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Information We Collect</h3>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other contact details you provide when filling out inquiry
          forms or contacting us.
        </li>
        <li>
          <strong>Academic Preferences:</strong> Information about your course
          preferences, class, and academic requirements shared during
          consultations.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, including pages visited, time spent, and navigation
          patterns.
        </li>
        <li>
          <strong>Device Information:</strong> IP address, browser type,
          operating system, and device identifiers for analytics and security
          purposes.
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>How We Use Your Information</h3>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To respond to your inquiries and provide course information</li>
        <li>To schedule counselling sessions and centre visits</li>
        <li>
          To send relevant academic updates and promotional communications (with
          your consent)
        </li>
        <li>To improve our website and services based on user feedback</li>
        <li>
          To comply with legal obligations and protect our legitimate business
          interests
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Data Security</h3>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access and request a copy of your personal data</li>
        <li>Correct any inaccurate or incomplete information</li>
        <li>
          Request deletion of your personal data (subject to legal obligations)
        </li>
        <li>Opt-out of marketing communications at any time</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p>
        <strong>Narayana Group</strong>
        <br />
        Email: bm.guwahati@narayanagroup.com
        <br />
        Phone: 1800-102-3344
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: January 2025</p>
  </div>
);

// Terms & Conditions Content Component
const TermsConditionsContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Acceptance of Terms</h3>
      <p>
        By accessing and using this website, you accept and agree to be bound by
        these Terms and Conditions. If you do not agree to these terms, please
        do not use this website. Narayana Group reserves the right to modify
        these terms at any time without prior notice.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>About This Website</h3>
      <p>
        This website is operated by Narayana Group for the purpose of providing
        information about our coaching programmes, courses, and services. All
        content is for general informational purposes only.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Information Disclaimer</h3>
      <p>
        The information provided on this website is for general informational
        purposes only:
      </p>
      <ul>
        <li>
          All course details, fees, schedules, and offerings are subject to
          change without prior notice.
        </li>
        <li>
          Results and rankings mentioned are based on past performance and do
          not guarantee future outcomes.
        </li>
        <li>Images and representations are for illustrative purposes only.</li>
        <li>
          Availability of courses and batches is subject to real-time status.
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>User Responsibilities</h3>
      <p>By using this website, you agree to:</p>
      <ul>
        <li>
          Provide accurate and complete information when submitting inquiries
        </li>
        <li>
          Use the website only for lawful purposes and in compliance with
          applicable laws
        </li>
        <li>
          Not engage in any activity that could harm, disable, or impair the
          website
        </li>
        <li>
          Not attempt to gain unauthorized access to any part of the website or
          its systems
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Intellectual Property</h3>
      <p>
        All content on this website, including but not limited to text,
        graphics, logos, images, and software, is the property of Narayana Group
        and is protected by intellectual property laws. You may not reproduce,
        distribute, or create derivative works without prior written consent.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Limitation of Liability</h3>
      <p>
        Narayana Group shall not be liable for any direct, indirect, incidental,
        consequential, or punitive damages arising from your use of this website
        or reliance on any information provided herein.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Governing Law</h3>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of India. Any disputes arising from or related
        to these terms shall be subject to the exclusive jurisdiction of the
        courts in Hyderabad, Telangana.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Information</h3>
      <p>
        For any questions regarding these Terms and Conditions, please contact
        us at:
      </p>
      <p>
        <strong>Narayana Group</strong>
        <br />
        Email: bm.guwahati@narayanagroup.com
        <br />
        Phone: 1800-102-3344
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: January 2025</p>
  </div>
);

// Disclaimer Content Component
const DisclaimerContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>General Disclaimer</h3>
      <p>
        The information provided on this website is for general informational
        purposes only. While we strive to keep the information up to date and
        correct, we make no representations or warranties of any kind about the
        completeness, accuracy, reliability, suitability, or availability with
        respect to the website or the information, products, services, or
        related graphics contained on the website.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Results Disclaimer</h3>
      <p>
        Past results and rankings are based on historical data and are not
        indicative of future performance. Individual results may vary based on
        the student's aptitude, dedication, and other factors.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact</h3>
      <p>
        For any questions or concerns, please contact us at
        bm.guwahati@narayanagroup.com or call 1800-102-3344.
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: January 2025</p>
  </div>
);

// Legal Modal Component
const LegalModal = ({ isOpen, onClose, title, children }) => {
  if (typeof window === "undefined") return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.modalBackdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={styles.legalModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <IconButton
                className={styles.modalCloseBtn}
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// Quick Links data
const quickLinks = [
  { label: "About Narayana", href: "#overview" },
  { label: "Why Narayana", href: "#amenities" },
  { label: "Results", href: "#pricing" },
  { label: "Centres", href: "#location" },
  {
    label: "Careers",
    href: "https://www.narayanacoachingcenters.in/careers",
    external: true,
  },
];

// Courses data
const courses = [
  { label: "NEET Coaching", href: "#overview" },
  {
    label: "IIT-JEE Coaching",
    href: "https://www.narayanacoachingcenters.in/iit-jee-coaching",
    external: true,
  },
  { label: "Foundation Courses", href: "#overview" },
  {
    label: "Crash Courses",
    href: "https://www.narayanacoachingcenters.in/neet-crash-course",
    external: true,
  },
  {
    label: "Test Series",
    href: "https://www.narayanacoachingcenters.in/naits/",
    external: true,
  },
];

// Social media links
const socialLinks = [
  { icon: "mdi:facebook", href: "#", label: "Facebook" },
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
  { icon: "mdi:youtube", href: "#", label: "YouTube" },
  { icon: "mdi:twitter", href: "#", label: "Twitter" },
];

const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        {/* Main Footer Content */}
        <div className={styles.mainFooter}>
          <Container maxWidth="xl">
            <div className={styles.footerGrid}>
              {/* Column 1: Logo & Tagline */}
              <div className={styles.footerBrand}>
                <div className={styles.logoWrapper}>
                  <img
                    src="https://www.narayanacoachingcenters.in/images/logo.png"
                    alt="Narayana Coaching Centers"
                    style={{
                      height: "36px",
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <p className={styles.tagline}>
                  One of Asia's largest educational conglomerates inspiring
                  success since 1979.
                </p>
                {/* Social Icons */}
                <div className={styles.socialIcons}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      aria-label={social.label}
                    >
                      <Icon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Quick Links</h4>
                <ul className={styles.footerLinks}>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={styles.footerLink}
                        {...(link.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Courses */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Courses</h4>
                <ul className={styles.footerLinks}>
                  {courses.map((course, index) => (
                    <li key={index}>
                      <a
                        href={course.href}
                        className={styles.footerLink}
                        {...(course.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {course.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Contact</h4>
                <ul className={styles.contactList}>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon icon="mdi:phone" className={styles.contactIcon} />
                      <span className={styles.contactLabel}>
                        Admission Support
                      </span>
                    </div>
                    <a href="tel:+916002500672" className={styles.contactValue}>
                      6002500672
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon
                        icon="mdi:phone-in-talk"
                        className={styles.contactIcon}
                      />
                      <span className={styles.contactLabel}>Toll Free</span>
                    </div>
                    <a href="tel:18001023344" className={styles.contactValue}>
                      1800-102-3344
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon icon="mdi:email" className={styles.contactIcon} />
                      <span className={styles.contactLabel}>Email</span>
                    </div>
                    <a
                      href="mailto:bm.guwahati@narayanagroup.com"
                      className={styles.contactValue}
                    >
                      bm.guwahati@narayanagroup.com
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon
                        icon="mdi:map-marker"
                        className={styles.contactIcon}
                      />
                      <span className={styles.contactLabel}>Address</span>
                    </div>
                    <span className={styles.contactValue}>
                      Nilomani Phukan Path
                      <br />
                      Nearby Tanishq Showroom, Sree Nagar
                      <br />
                      Guwahati, Assam 781005
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <Container maxWidth="xl">
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                &copy; 2025 Narayana Group. All Rights Reserved.
              </p>
              <div className={styles.legalLinks}>
                <button
                  className={styles.legalLink}
                  onClick={() => setTermsModalOpen(true)}
                >
                  Terms & Conditions
                </button>
                <span className={styles.linkDivider}>|</span>
                <button
                  className={styles.legalLink}
                  onClick={() => setPrivacyModalOpen(true)}
                >
                  Privacy Policy
                </button>
                <span className={styles.linkDivider}>|</span>
                <button
                  className={styles.legalLink}
                  onClick={() => setDisclaimerModalOpen(true)}
                >
                  Disclaimer
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Developer Credit Bar */}
        <div className={styles.developerBar}>
          <Container maxWidth="xl">
            <p className={styles.developerText}>
              Designed and Developed by{" "}
              <a
                href="https://assamdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
              >
                Assam Digital
              </a>
            </p>
          </Container>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms & Conditions"
      >
        <TermsConditionsContent />
      </LegalModal>

      <LegalModal
        isOpen={disclaimerModalOpen}
        onClose={() => setDisclaimerModalOpen(false)}
        title="Disclaimer"
      >
        <DisclaimerContent />
      </LegalModal>
    </>
  );
};

export default Footer;
