/**
 * Google Analytics 4 (GA4) Custom Event Tracking Helper
 * 
 * Safe wrappers for custom conversions:
 * - contact_form_submit
 * - whatsapp_click
 * - estimator_complete
 * - case_study_view
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    allConsentGranted?: () => void;
    allConsentDenied?: () => void;
  }
}

/**
 * Grant all Consent Mode v2 storage categories and save preference
 */
export function allConsentGranted() {
  if (typeof window !== "undefined") {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
    try {
      localStorage.setItem("cookie_consent", "granted");
    } catch (e) {}
  }
}

/**
 * Deny optional Consent Mode v2 categories and save preference
 */
export function allConsentDenied() {
  if (typeof window !== "undefined") {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }
    try {
      localStorage.setItem("cookie_consent", "denied");
    } catch (e) {}
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackContactFormSubmit(details: { category?: string } = {}) {
  trackEvent("contact_form_submit", {
    event_category: "Engagement",
    event_label: details.category || "Direct Contact Form",
  });
}

export function trackWhatsAppClick() {
  trackEvent("whatsapp_click", {
    event_category: "Conversion",
    event_label: "Direct WhatsApp Contact",
  });
}

export function trackEstimatorComplete(tier: string, range: string) {
  trackEvent("estimator_complete", {
    event_category: "Estimator",
    selected_tier: tier,
    indicative_range: range,
  });
}

export function trackCaseStudyView(caseStudyName: string) {
  trackEvent("case_study_view", {
    event_category: "Portfolio",
    case_study: caseStudyName,
  });
}
