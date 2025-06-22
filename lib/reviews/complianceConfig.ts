// lib/reviews/complianceConfig.ts
export const COMPLIANCE_SETTINGS = {
  minSatisfactionLevel: 4, // Only 4-5 star customers
  maxFollowUps: 2,         // Maximum follow-up emails
  followUpDelay: 7,        // Days between follow-ups
  requestCooldown: 30,     // Days between requests to same customer
  autoSendDelay: 2         // Days after service to auto-send
};