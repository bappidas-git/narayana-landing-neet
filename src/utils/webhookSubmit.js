/* ============================================
   Webhook Lead Submission Utility
   Currently uses a DUMMY endpoint for testing.
   Replace WEBHOOK_URL with your Pabbly Connect
   webhook URL when ready for production.
   ============================================ */

// =============================================
// CONFIGURATION — REPLACE THIS URL WITH YOUR
// PABBLY CONNECT WEBHOOK URL
// =============================================
const WEBHOOK_URL =
  "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTZkMDYzZTA0Mzc1MjZmNTUzZCI_3D_pc/IjU3NjcwNTZmMDYzNDA0MzM1MjZmNTUzYzUxMzEi_pc";

// Set to true when Pabbly webhook is configured
const USE_PABBLY = true;

// Dummy endpoint for testing (simulates success after 1.5s)
const DUMMY_MODE = false;

/**
 * Submit lead data to Pabbly webhook or dummy endpoint
 * @param {Object} leadData - The form data to submit
 * @param {string} leadData.name - Student's full name
 * @param {string} leadData.mobile - Mobile number
 * @param {string} leadData.email - Email address
 * @param {string} leadData.course_interest - Selected course
 * @param {string} leadData.student_class - Student's current class
 * @param {string} leadData.source - Form source identifier (e.g., 'hero-form', 'drawer-enroll-now', 'foundation-form')
 * @param {Object} [leadData.metadata] - Additional metadata
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const submitLeadToWebhook = async (leadData) => {
  // Enrich data with timestamp and page info
  const enrichedData = {
    ...leadData,
    submitted_at: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    utm_source:
      new URLSearchParams(window.location.search).get("utm_source") || "",
    utm_medium:
      new URLSearchParams(window.location.search).get("utm_medium") || "",
    utm_campaign:
      new URLSearchParams(window.location.search).get("utm_campaign") || "",
    utm_term: new URLSearchParams(window.location.search).get("utm_term") || "",
    utm_content:
      new URLSearchParams(window.location.search).get("utm_content") || "",
    gclid: new URLSearchParams(window.location.search).get("gclid") || "",
  };

  // === DUMMY MODE (for testing) ===
  if (DUMMY_MODE || !USE_PABBLY) {
    console.log(
      "[DUMMY MODE] Lead captured:",
      JSON.stringify(enrichedData, null, 2),
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store in localStorage for testing verification
    const existingLeads = JSON.parse(
      localStorage.getItem("narayana_neet_test_leads") || "[]",
    );
    existingLeads.push(enrichedData);
    localStorage.setItem(
      "narayana_neet_test_leads",
      JSON.stringify(existingLeads),
    );

    console.log(
      `[DUMMY MODE] Lead stored. Total test leads: ${existingLeads.length}`,
    );
    console.log(
      'To view all test leads, run in console: JSON.parse(localStorage.getItem("narayana_neet_test_leads"))',
    );

    return { success: true, message: "Lead captured successfully (test mode)" };
  }

  // === PABBLY WEBHOOK MODE ===
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrichedData),
    });

    if (response.ok) {
      return { success: true, message: "Lead submitted successfully" };
    } else {
      console.error("Webhook error:", response.status, response.statusText);
      return {
        success: false,
        message: "Submission failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Webhook network error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};

/**
 * Check if a lead with this mobile number was already submitted
 * (Duplicate prevention)
 */
export const isDuplicateLead = (mobile) => {
  const storageKey = "narayana_neet_submitted_leads";
  const existingLeads = JSON.parse(localStorage.getItem(storageKey) || "[]");
  return existingLeads.some((lead) => lead.mobile === mobile);
};

/**
 * Mark a mobile number as submitted (for duplicate prevention)
 */
export const markLeadAsSubmitted = (mobile) => {
  const storageKey = "narayana_neet_submitted_leads";
  const existingLeads = JSON.parse(localStorage.getItem(storageKey) || "[]");
  existingLeads.push({ mobile, timestamp: Date.now() });
  localStorage.setItem(storageKey, JSON.stringify(existingLeads));
};
