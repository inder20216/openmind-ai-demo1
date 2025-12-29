// UI-focused bot data for detail pages (benefits, KPIs, charts)
export const botDetailsData = {
  // ========== HEALTHCARE BOTS ==========
  'Healthcare Admin Bot': {
    benefits: [
      { title: 'Insurance Verification', desc: 'Handles insurance queries 24/7 automatically', icon: '💳' },
      { title: 'Billing Support', desc: 'Processes billing inquiries and payments', icon: '💰' },
      { title: 'Claims Processing', desc: 'Manages claims status and updates', icon: '📋' }
    ],
    kpis: [
      { number: '80', label: 'Faster Response' },
      { number: '60', label: 'Cost Reduction' },
      { number: '90', label: 'Query Resolution' },
      { number: '95', label: 'Accuracy Rate' }
    ]
  },

  'Patient Support Bot': {
    benefits: [
      { title: 'Appointment Scheduling', desc: 'Book, reschedule appointments automatically', icon: '📅' },
      { title: 'Prescription Refills', desc: 'Handle refill requests instantly', icon: '💊' },
      { title: 'Symptom Triage', desc: 'Basic symptom checking and guidance', icon: '🏥' }
    ],
    kpis: [
      { number: '70', label: 'Call Reduction' },
      { number: '40', label: 'More Bookings' },
      { number: '35', label: 'Fewer No-shows' },
      { number: '85', label: 'Patient Satisfaction' }
    ]
  },

  'Telemedicine Assistant': {
    benefits: [
      { title: 'Virtual Consultations', desc: 'Manage video appointment bookings', icon: '💻' },
      { title: 'Pre-visit Forms', desc: 'Collect patient information automatically', icon: '📝' },
      { title: 'Health Tracking', desc: 'Monitor and upload patient metrics', icon: '📊' }
    ],
    kpis: [
      { number: '50', label: 'More Capacity' },
      { number: '65', label: 'Admin Time Saved' },
      { number: '92', label: 'Completion Rate' },
      { number: '94', label: 'Patient Rating' }
    ]
  },

  // ========== E-COMMERCE BOTS ==========
  'Product Recommendation Bot': {
    benefits: [
      { title: 'Smart Recommendations', desc: 'AI suggests products based on browsing history', icon: '🎯' },
      { title: 'Upselling Engine', desc: 'Increases average order value by 25%', icon: '📈' },
      { title: 'Visual Search', desc: 'Find products from uploaded images', icon: '📸' }
    ],
    kpis: [
      { number: '35', label: 'More Conversions' },
      { number: '25', label: 'Higher AOV' },
      { number: '80', label: 'Click-through Rate' },
      { number: '90', label: 'Recommendation Accuracy' }
    ]
  },

  'Order Tracking Bot': {
    benefits: [
      { title: 'Real-time Tracking', desc: 'Live updates from warehouse to doorstep', icon: '📦' },
      { title: 'Proactive Alerts', desc: 'Notify customers of delays instantly', icon: '🔔' },
      { title: 'Easy Returns', desc: 'Process returns without human intervention', icon: '↩️' }
    ],
    kpis: [
      { number: '60', label: 'Fewer Support Tickets' },
      { number: '90', label: 'Customer Satisfaction' },
      { number: '80', label: 'Self-service Rate' },
      { number: '95', label: 'Tracking Accuracy' }
    ]
  },

  'Shopping Cart Assistant': {
    benefits: [
      { title: 'Cart Recovery', desc: 'Convert 50% of abandoned carts into sales', icon: '🛒' },
      { title: 'Smart Reminders', desc: 'Personalized nudges at optimal times', icon: '⏰' },
      { title: 'Dynamic Discounts', desc: 'Offer deals to close hesitant buyers', icon: '💰' }
    ],
    kpis: [
      { number: '50', label: 'Cart Recovery Rate' },
      { number: '45', label: 'Revenue Recovered' },
      { number: '40', label: 'Conversion Boost' },
      { number: '85', label: 'Customer Response' }
    ]
  },

  // ========== FINANCE BOTS ==========
  'Banking Support Bot': {
    benefits: [
      { title: 'Account Inquiries', desc: 'Check balance, transactions instantly', icon: '💳' },
      { title: 'Fraud Detection', desc: 'Real-time suspicious activity alerts', icon: '🚨' },
      { title: 'Bill Payments', desc: 'Set up and manage payments via chat', icon: '💸' }
    ],
    kpis: [
      { number: '70', label: 'Call Reduction' },
      { number: '85', label: 'Query Resolution' },
      { number: '92', label: 'Customer Satisfaction' },
      { number: '99', label: 'Security Compliance' }
    ]
  },

  'Investment Advisor Bot': {
    benefits: [
      { title: 'Portfolio Analysis', desc: 'Real-time insights on investment performance', icon: '📊' },
      { title: 'Market Alerts', desc: 'Personalized notifications on relevant stocks', icon: '📈' },
      { title: 'Risk Assessment', desc: 'Automated risk evaluation for investments', icon: '⚖️' }
    ],
    kpis: [
      { number: '85', label: 'User Engagement' },
      { number: '45', label: 'Informed Trading' },
      { number: '60', label: 'Advisor Time Saved' },
      { number: '78', label: 'Client Satisfaction' }
    ]
  },

  'Loan Application Bot': {
    benefits: [
      { title: 'Quick Pre-approval', desc: 'Get loan eligibility in 5 minutes', icon: '✅' },
      { title: 'Document Collection', desc: 'Upload and verify documents via chat', icon: '📄' },
      { title: 'Status Tracking', desc: 'Real-time application progress updates', icon: '🔄' }
    ],
    kpis: [
      { number: '80', label: 'Faster Processing' },
      { number: '95', label: 'Digital Applications' },
      { number: '60', label: 'Staff Time Saved' },
      { number: '40', label: 'More Approvals' }
    ]
  },

  // ========== HOSPITALITY BOTS ==========
  'Hotel Booking Bot': {
    benefits: [
      { title: 'Instant Reservations', desc: 'Book rooms 24/7 without waiting', icon: '🏨' },
      { title: 'Best Price Guarantee', desc: 'Always shows lowest available rates', icon: '💰' },
      { title: 'Special Requests', desc: 'Handle room preferences automatically', icon: '⭐' }
    ],
    kpis: [
      { number: '45', label: 'More Bookings' },
      { number: '70', label: 'Self-service Rate' },
      { number: '90', label: 'Guest Satisfaction' },
      { number: '55', label: 'Revenue Increase' }
    ]
  },

  'Restaurant Reservation Bot': {
    benefits: [
      { title: 'Table Management', desc: 'Optimize seating and reduce wait times', icon: '🍽️' },
      { title: 'Menu Suggestions', desc: 'Recommend dishes based on preferences', icon: '👨‍🍳' },
      { title: 'Waitlist Management', desc: 'Automated notifications when tables ready', icon: '⏱️' }
    ],
    kpis: [
      { number: '50', label: 'More Reservations' },
      { number: '35', label: 'Fewer No-shows' },
      { number: '60', label: 'Staff Time Saved' },
      { number: '95', label: 'Table Utilization' }
    ]
  },

  'Concierge Service Bot': {
    benefits: [
      { title: 'Local Recommendations', desc: 'Personalized activity and dining suggestions', icon: '🗺️' },
      { title: 'Instant Bookings', desc: 'Reserve tours, shows, transport instantly', icon: '🎭' },
      { title: 'Guest Requests', desc: 'Handle room service and amenity requests', icon: '🛎️' }
    ],
    kpis: [
      { number: '80', label: 'Guest Engagement' },
      { number: '75', label: 'Upsell Revenue' },
      { number: '95', label: 'Guest Satisfaction' },
      { number: '65', label: 'Staff Efficiency' }
    ]
  },

  'Heart Health Assistant': {
    benefits: [
      { title: 'Heart Disease Education', desc: 'Comprehensive information on heart conditions', icon: '❤️' },
      { title: 'Prevention Guidance', desc: 'Lifestyle and diet tips for heart health', icon: '🏃' },
      { title: 'Warning Signs', desc: 'Recognize symptoms and when to seek help', icon: '🚨' }
    ],
    kpis: [
      { number: '92', label: 'Query Resolution' },
      { number: '75', label: 'Inquiry Reduction' },
      { number: '98', label: 'Patient Satisfaction' },
      { number: '24/7', label: 'Availability' }
    ]
  },

  'Kidney Care Companion': {
    benefits: [
      { title: 'Kidney Health Info', desc: 'Understanding kidney disease and care', icon: '💙' },
      { title: 'Diet Guidance', desc: 'Personalized nutrition recommendations', icon: '🥗' },
      { title: 'Treatment Options', desc: 'Explain dialysis and transplant info', icon: '🩺' }
    ],
    kpis: [
      { number: '88', label: 'Query Resolution' },
      { number: '45', label: 'Better Compliance' },
      { number: '96', label: 'Patient Satisfaction' },
      { number: '70', label: 'Time Saved' }
    ]
  },

  'Fertility Support Bot': {
    benefits: [
      { title: 'Fertility Education', desc: 'Comprehensive infertility information', icon: '👶' },
      { title: 'Treatment Guidance', desc: 'Explain IVF, IUI and other options', icon: '💉' },
      { title: 'Emotional Support', desc: 'Compassionate guidance through journey', icon: '💙' }
    ],
    kpis: [
      { number: '95', label: 'Found Helpful' },
      { number: '80', label: 'Inquiry Reduction' },
      { number: '60', label: 'Better Prepared' },
      { number: '99', label: 'Patient Satisfaction' }
    ]
  },

  // ========== DEFAULT FALLBACK ==========
  'default': {
    benefits: [
      { title: '24/7 Availability', desc: 'Never miss a customer inquiry', icon: '🕐' },
      { title: 'Instant Responses', desc: 'Answer questions in under 2 seconds', icon: '⚡' },
      { title: 'Multi-language', desc: 'Communicate in 50+ languages', icon: '🌍' }
    ],
    kpis: [
      { number: '60', label: 'Cost Reduction' },
      { number: '75', label: 'Response Speed' },
      { number: '95', label: 'Availability' },
      { number: '85', label: 'Satisfaction' }
    ]
  }
}