// Detailed information for each bot type
export const botDetails = {
  'Healthcare Admin Bot': {
    tagline: 'Automate Your Healthcare Administration',
    whatItDoes: [
      'Handles insurance verification queries 24/7',
      'Processes billing inquiries and payment questions',
      'Manages claims processing and status updates',
      'Assists with document requests and submissions',
      'Provides appointment scheduling support'
    ],
    useCases: [
      '"What insurance plans do you accept?"',
      '"Why was I charged this amount?"',
      '"Where is my insurance claim?"',
      '"I need my medical records sent to another doctor"',
      '"Can I set up a payment plan for my bill?"'
    ],
    businessBenefits: [
      '60% reduction in admin staff workload',
      '80% faster response to patient queries',
      '$50,000+ annual cost savings',
      '95% accuracy in insurance verification',
      '24/7 availability without overtime costs'
    ],
    kpis: [
      { label: 'Response Time', value: '<30 sec', improvement: '80% faster' },
      { label: 'Cost Savings', value: '$50K+/year', improvement: '60% reduction' },
      { label: 'Query Resolution', value: '90%', improvement: 'First contact' },
      { label: 'Satisfaction', value: '4.8/5', improvement: '+35%' }
    ],
    automatedProcesses: [
      'Insurance eligibility verification',
      'Billing statement generation and explanation',
      'Claims status tracking and updates',
      'Document routing and filing',
      'Payment plan setup and reminders'
    ],
    knowledgeNeeded: [
      'Insurance policies and coverage details',
      'Billing procedures and payment methods',
      'Claims processing workflows',
      'Required document types and forms',
      'Department contacts and escalation paths'
    ],
    sampleDocs: [
      'Insurance policy PDFs',
      'Billing guidelines document',
      'Claims processing manual',
      'FAQ about billing and insurance',
      'Your hospital/clinic website'
    ]
  },
  'Patient Support Bot': {
    tagline: 'Enhanced Patient Care & Engagement',
    whatItDoes: [
      'Schedules and manages appointments automatically',
      'Handles prescription refill requests',
      'Provides symptom checking and triage',
      'Manages medical records access requests',
      'Sends medication and appointment reminders'
    ],
    useCases: [
      '"I need to book an appointment with Dr. Smith"',
      '"Can you refill my blood pressure medication?"',
      '"I have a fever and headache, should I come in?"',
      '"How do I access my lab results?"',
      '"Can you reschedule my appointment to next week?"'
    ],
    businessBenefits: [
      '70% reduction in phone call volume',
      '40% increase in appointment bookings',
      '$75,000+ annual savings in staff time',
      '85% patient satisfaction rating',
      'Reduced no-show rates by 35%'
    ],
    kpis: [
      { label: 'Booking Rate', value: '+40%', improvement: 'vs phone' },
      { label: 'Call Volume', value: '-70%', improvement: 'Reduced' },
      { label: 'No-shows', value: '-35%', improvement: 'Fewer' },
      { label: 'Patient NPS', value: '72', improvement: '+28 points' }
    ],
    automatedProcesses: [
      'Appointment scheduling and rescheduling',
      'Prescription refill coordination',
      'Basic symptom triage',
      'Medical records retrieval',
      'Automated reminders and follow-ups'
    ],
    knowledgeNeeded: [
      'Appointment scheduling rules and availability',
      'Prescription refill policies',
      'Symptom checker protocols',
      'Medical records access procedures',
      'Emergency escalation guidelines'
    ],
    sampleDocs: [
      'Appointment booking guidelines',
      'Prescription refill policy',
      'Symptom triage protocols',
      'Patient portal instructions',
      'Your practice website and services'
    ]
  },
  'Telemedicine Assistant': {
    tagline: 'Virtual Care Made Simple',
    whatItDoes: [
      'Manages virtual consultation bookings',
      'Collects pre-appointment forms and information',
      'Sends follow-up reminders and instructions',
      'Tracks patient health metrics',
      'Facilitates prescription delivery coordination'
    ],
    useCases: [
      '"I need a video consultation for my cold"',
      '"How do I prepare for my virtual appointment?"',
      '"Can you send my prescription to my pharmacy?"',
      '"I need to upload my blood pressure readings"',
      '"What do I do after my telemedicine visit?"'
    ],
    businessBenefits: [
      '50% increase in virtual visit capacity',
      '65% reduction in pre-visit admin time',
      '$40,000+ annual operational savings',
      '92% patient completion rate',
      '45% faster visit preparation'
    ],
    kpis: [
      { label: 'Visit Capacity', value: '+50%', improvement: 'More visits' },
      { label: 'Prep Time', value: '-65%', improvement: 'Faster' },
      { label: 'Completion', value: '92%', improvement: '+25%' },
      { label: 'Patient Rating', value: '4.7/5', improvement: '+30%' }
    ],
    automatedProcesses: [
      'Virtual appointment scheduling',
      'Pre-visit form collection',
      'Health data tracking and upload',
      'Post-visit follow-up automation',
      'Prescription and lab coordination'
    ],
    knowledgeNeeded: [
      'Telemedicine platform instructions',
      'Pre-visit form templates',
      'Health tracking guidelines',
      'Prescription delivery procedures',
      'Technical troubleshooting steps'
    ],
    sampleDocs: [
      'Telemedicine user guide',
      'Pre-visit questionnaires',
      'Health tracking protocols',
      'Post-visit instructions',
      'Platform FAQ and support docs'
    ]
  },
  'Heart Health Assistant': {
    tagline: 'Your Heart Health Companion',
    whatItDoes: [
      'Educates about heart disease and conditions',
      'Provides prevention and lifestyle guidance',
      'Explains warning signs and symptoms',
      'Offers treatment information and options',
      'Guides when to seek medical attention'
    ],
    useCases: [
      '"What are the signs of a heart attack?"',
      '"How can I lower my cholesterol naturally?"',
      '"Is chest pain always serious?"',
      '"What foods are good for heart health?"',
      '"When should I see a cardiologist?"'
    ],
    businessBenefits: [
      '75% reduction in routine heart health inquiries',
      '24/7 patient education availability',
      'Improved patient engagement and awareness',
      'Reduced emergency room visits through education',
      'Better preventive care compliance'
    ],
    kpis: [
      { label: 'Patient Education', value: '5000+', improvement: 'Monthly interactions' },
      { label: 'Query Resolution', value: '92%', improvement: 'First contact' },
      { label: 'Satisfaction', value: '4.9/5', improvement: 'Patient rating' },
      { label: 'Staff Time Saved', value: '40hrs/week', improvement: 'Freed up' }
    ],
    automatedProcesses: [
      'Heart disease education delivery',
      'Lifestyle and diet recommendations',
      'Warning sign identification',
      'Treatment options explanation',
      'Doctor referral guidance'
    ],
    knowledgeNeeded: [
      'Heart disease types and conditions',
      'Prevention strategies and lifestyle tips',
      'Warning signs and emergency protocols',
      'Treatment options and procedures',
      'When to escalate to cardiologist'
    ],
    sampleDocs: [
      'Heart health guidelines (WHO, AHA)',
      'Prevention and lifestyle protocols',
      'Symptom checker flowcharts',
      'Treatment information sheets',
      'Emergency escalation procedures'
    ]
  },

  'Kidney Care Companion': {
    tagline: 'Supporting Your Kidney Health Journey',
    whatItDoes: [
      'Provides kidney disease education',
      'Offers diet and nutrition guidance',
      'Explains treatment and care options',
      'Supports lifestyle management',
      'Guides when to seek specialist care'
    ],
    useCases: [
      '"What foods should I avoid with kidney disease?"',
      '"How do I know if my kidneys are healthy?"',
      '"What are dialysis options?"',
      '"Can kidney disease be reversed?"',
      '"What lifestyle changes help kidney health?"'
    ],
    businessBenefits: [
      '70% reduction in routine kidney care questions',
      'Improved patient compliance with care plans',
      'Better diet and lifestyle adherence',
      '24/7 support for chronic kidney patients',
      'Reduced specialist consultation time'
    ],
    kpis: [
      { label: 'Patient Support', value: '3000+', improvement: 'Monthly users' },
      { label: 'Care Compliance', value: '+45%', improvement: 'Better adherence' },
      { label: 'Satisfaction', value: '4.8/5', improvement: 'Patient rating' },
      { label: 'Query Resolution', value: '88%', improvement: 'First contact' }
    ],
    automatedProcesses: [
      'Kidney health education',
      'Diet and nutrition guidance',
      'Treatment options explanation',
      'Lifestyle modification support',
      'Specialist referral coordination'
    ],
    knowledgeNeeded: [
      'Kidney disease types and stages',
      'Dietary restrictions and guidelines',
      'Treatment options (dialysis, transplant)',
      'Lifestyle management strategies',
      'Emergency warning signs'
    ],
    sampleDocs: [
      'Kidney health guidelines',
      'Renal diet protocols',
      'Treatment information sheets',
      'Lifestyle management guides',
      'Specialist referral criteria'
    ]
  },

  'Fertility Support Bot': {
    tagline: 'Compassionate Fertility Guidance',
    whatItDoes: [
      'Provides infertility information and education',
      'Explains treatment options and procedures',
      'Offers emotional support and guidance',
      'Answers family planning questions',
      'Connects to fertility specialists'
    ],
    useCases: [
      '"What are common causes of infertility?"',
      '"How does IVF work?"',
      '"What tests do I need for fertility?"',
      '"How can I improve my chances of conception?"',
      '"When should we see a fertility specialist?"'
    ],
    businessBenefits: [
      '80% reduction in initial consultation questions',
      'Improved patient preparedness for appointments',
      '24/7 emotional support availability',
      'Better treatment understanding and compliance',
      'Increased patient satisfaction and trust'
    ],
    kpis: [
      { label: 'Patient Support', value: '2500+', improvement: 'Monthly interactions' },
      { label: 'Consultation Readiness', value: '+60%', improvement: 'Better prepared' },
      { label: 'Satisfaction', value: '4.9/5', improvement: 'Patient rating' },
      { label: 'Emotional Support', value: '95%', improvement: 'Found helpful' }
    ],
    automatedProcesses: [
      'Infertility education delivery',
      'Treatment options explanation',
      'Emotional support provision',
      'Pre-consultation preparation',
      'Specialist connection facilitation'
    ],
    knowledgeNeeded: [
      'Infertility causes and types',
      'Treatment options (IVF, IUI, etc.)',
      'Testing and diagnostic procedures',
      'Emotional support protocols',
      'Specialist referral guidelines'
    ],
    sampleDocs: [
      'Fertility treatment guides',
      'Infertility causes documentation',
      'Treatment procedure explanations',
      'Emotional support resources',
      'Specialist referral criteria'
    ]
  }
}
