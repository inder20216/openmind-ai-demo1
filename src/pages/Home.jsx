import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { botDetails } from '../data/botDetails.js'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import BotDetailPage from './BotDetailPage'
import DemoChoicePage from './DemoChoicePage'  // ← ADD THIS
import Select from 'react-select'



function Home({ setCurrentPage, user, onLogout }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedIndustry, setSelectedIndustry] = useState('Healthcare')
  const [showSignup, setShowSignup] = useState(false)
  const [selectedBot, setSelectedBot] = useState(null)
  const [formStep, setFormStep] = useState(1)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [userOtp, setUserOtp] = useState('')
  const [userWebsite, setUserWebsite] = useState('')
  const [otpSentTime, setOtpSentTime] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes = 300 seconds
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [selectedBotForDetail, setSelectedBotForDetail] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isUserVerified, setIsUserVerified] = useState(false)  // ← ADD THIS
  const [userPhone, setUserPhone] = useState('')
const [countryCode, setCountryCode] = useState('+91') // Default India
const [phoneOtp, setPhoneOtp] = useState('')
const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  
  // Step 4: Knowledge Upload States
  const [knowledgeTab, setKnowledgeTab] = useState('documents') // 'documents' | 'website' | 'text' | 'faq'
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [directText, setDirectText] = useState('')
  const [faqFile, setFaqFile] = useState(null)
  const [isCreatingBot, setIsCreatingBot] = useState(false)

  const countryOptions = [
  { value: '+93', label: '🇦🇫 Afghanistan (+93)' },
  { value: '+355', label: '🇦🇱 Albania (+355)' },
  { value: '+213', label: '🇩🇿 Algeria (+213)' },
  { value: '+54', label: '🇦🇷 Argentina (+54)' },
  { value: '+61', label: '🇦🇺 Australia (+61)' },
  { value: '+43', label: '🇦🇹 Austria (+43)' },
  { value: '+973', label: '🇧🇭 Bahrain (+973)' },
  { value: '+880', label: '🇧🇩 Bangladesh (+880)' },
  { value: '+32', label: '🇧🇪 Belgium (+32)' },
  { value: '+55', label: '🇧🇷 Brazil (+55)' },
  { value: '+1', label: '🇨🇦 Canada (+1)' },
  { value: '+86', label: '🇨🇳 China (+86)' },
  { value: '+45', label: '🇩🇰 Denmark (+45)' },
  { value: '+20', label: '🇪🇬 Egypt (+20)' },
  { value: '+358', label: '🇫🇮 Finland (+358)' },
  { value: '+33', label: '🇫🇷 France (+33)' },
  { value: '+49', label: '🇩🇪 Germany (+49)' },
  { value: '+30', label: '🇬🇷 Greece (+30)' },
  { value: '+852', label: '🇭🇰 Hong Kong (+852)' },
  { value: '+91', label: '🇮🇳 India (+91)' },
  { value: '+62', label: '🇮🇩 Indonesia (+62)' },
  { value: '+353', label: '🇮🇪 Ireland (+353)' },
  { value: '+972', label: '🇮🇱 Israel (+972)' },
  { value: '+39', label: '🇮🇹 Italy (+39)' },
  { value: '+81', label: '🇯🇵 Japan (+81)' },
  { value: '+962', label: '🇯🇴 Jordan (+962)' },
  { value: '+254', label: '🇰🇪 Kenya (+254)' },
  { value: '+965', label: '🇰🇼 Kuwait (+965)' },
  { value: '+60', label: '🇲🇾 Malaysia (+60)' },
  { value: '+52', label: '🇲🇽 Mexico (+52)' },
  { value: '+31', label: '🇳🇱 Netherlands (+31)' },
  { value: '+64', label: '🇳🇿 New Zealand (+64)' },
  { value: '+234', label: '🇳🇬 Nigeria (+234)' },
  { value: '+47', label: '🇳🇴 Norway (+47)' },
  { value: '+968', label: '🇴🇲 Oman (+968)' },
  { value: '+92', label: '🇵🇰 Pakistan (+92)' },
  { value: '+63', label: '🇵🇭 Philippines (+63)' },
  { value: '+48', label: '🇵🇱 Poland (+48)' },
  { value: '+351', label: '🇵🇹 Portugal (+351)' },
  { value: '+974', label: '🇶🇦 Qatar (+974)' },
  { value: '+7', label: '🇷🇺 Russia (+7)' },
  { value: '+966', label: '🇸🇦 Saudi Arabia (+966)' },
  { value: '+65', label: '🇸🇬 Singapore (+65)' },
  { value: '+27', label: '🇿🇦 South Africa (+27)' },
  { value: '+82', label: '🇰🇷 South Korea (+82)' },
  { value: '+34', label: '🇪🇸 Spain (+34)' },
  { value: '+94', label: '🇱🇰 Sri Lanka (+94)' },
  { value: '+46', label: '🇸🇪 Sweden (+46)' },
  { value: '+41', label: '🇨🇭 Switzerland (+41)' },
  { value: '+886', label: '🇹🇼 Taiwan (+886)' },
  { value: '+66', label: '🇹🇭 Thailand (+66)' },
  { value: '+90', label: '🇹🇷 Turkey (+90)' },
  { value: '+971', label: '🇦🇪 UAE (+971)' },
  { value: '+380', label: '🇺🇦 Ukraine (+380)' },
  { value: '+44', label: '🇬🇧 UK (+44)' },
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+84', label: '🇻🇳 Vietnam (+84)' }
]

  const industries = [
    { name: 'Healthcare', icon: '🏥', color: '#00ffff' },
    { name: 'Education', icon: '📚', color: '#0080ff' },
    { name: 'E-Commerce', icon: '🛒', color: '#8000ff' },
    { name: 'Finance', icon: '💰', color: '#00ff88' },
    { name: 'Real Estate', icon: '🏢', color: '#ff8800' },
    { name: 'Hospitality', icon: '🏨', color: '#ff0088' },
    { name: 'Retail', icon: '🛍️', color: '#ff6600' },
    { name: 'Legal', icon: '⚖️', color: '#6600ff' },
    { name: 'Manufacturing', icon: '🏭', color: '#ffdd00' },
    { name: 'Transportation', icon: '🚚', color: '#00ddff' },
    { name: 'Insurance', icon: '🛡️', color: '#dd00ff' },
    { name: 'Telecommunications', icon: '📡', color: '#ff0066' },
    { name: 'Media', icon: '🎬', color: '#66ff00' },
    { name: 'Travel & Tourism', icon: '✈️', color: '#00ff66' },
    { name: 'Food & Beverage', icon: '🍽️', color: '#ffaa00' },
    { name: 'Banking', icon: '🏦', color: '#0099ff' },
    { name: 'Automotive', icon: '🚗', color: '#ff3300' },
    { name: 'Energy', icon: '⚡', color: '#ffff00' },
    { name: 'Construction', icon: '🏗️', color: '#888888' },
    { name: 'Agriculture', icon: '🌾', color: '#88ff00' }
  ]

  // Industry-specific bots
  const industryBots = {  // ✅ ADD THIS LINE
    'Healthcare': [
      { name: 'Patient Support Bot', icon: '🏥', desc: 'Appointment Booking, Doctor Availability, Speciality check, Appointment Rescheduling' },
      { name: 'Hospital Support', icon: '📋', desc: 'LAB test reports & booking, Trimester Scan Instructuins, Packages, Insurance queries' },
      { name: 'Heart Health Assistant', icon: '❤️', desc: 'Heart disease education, prevention tips, warning signs, treatment guidance, lifestyle advice' },
      { name: 'Kidney Care Companion', icon: '💙', desc: 'Kidney health information, diet guidance, treatment options, lifestyle management' },
      { name: 'Fertility Support Bot', icon: '👶', desc: 'Infertility guidance, treatment options, emotional support, family planning advice' }
    ],
    'Education': [
      { name: 'Student Support Bot', icon: '📚', desc: 'Course enrollment, grade inquiries, assignment submissions, library resources' },
      { name: 'Admissions Assistant', icon: '🎓', desc: 'Application tracking, campus tours scheduling, scholarship info, document verification' },
      { name: 'Learning Management Bot', icon: '📝', desc: 'Course materials delivery, quiz automation, attendance tracking, progress reports' }
    ],
   'E-Commerce': [
  { name: 'Customer Support Bot', icon: '🛒', desc: 'Order tracking, complaint registration, delivery status, returns & refunds support' }
],
    'Finance': [
      { name: 'Account Management Bot', icon: '💰', desc: 'Balance inquiries, transaction history, account opening, card services' },
      { name: 'Loan Processing Bot', icon: '🏦', desc: 'Loan applications, eligibility checks, document collection, approval status' },
      { name: 'Investment Advisor Bot', icon: '📈', desc: 'Portfolio analysis, market insights, trading alerts, financial planning' }
    ],
    'Real Estate': [
      { name: 'Property Search Bot', icon: '🏢', desc: 'Property listings, virtual tours scheduling, price comparisons, neighborhood info' },
      { name: 'Client Management Bot', icon: '👥', desc: 'Lead qualification, viewing appointments, document signing, follow-ups' },
      { name: 'Property Management Bot', icon: '🔧', desc: 'Maintenance requests, rent collection, tenant screening, lease renewals' }
    ],
    'Hospitality': [
      { name: 'Booking Assistant', icon: '🏨', desc: 'Room reservations, availability checks, special requests, loyalty programs' },
      { name: 'Guest Services Bot', icon: '🛎️', desc: 'Concierge services, dining reservations, spa bookings, local recommendations' },
      { name: 'Operations Bot', icon: '📊', desc: 'Housekeeping coordination, staff scheduling, inventory management, maintenance alerts' }
    ],
    'Retail': [
      { name: 'Store Assistant', icon: '🛍️', desc: 'Product location, price checks, promotions, gift cards, store policies' },
      { name: 'Loyalty Program Bot', icon: '⭐', desc: 'Points tracking, rewards redemption, personalized offers, membership tiers' },
      { name: 'Supply Chain Bot', icon: '🚛', desc: 'Vendor management, purchase orders, delivery tracking, stock optimization' }
    ],
    'Legal': [
      { name: 'Client Intake Bot', icon: '⚖️', desc: 'Case inquiry, document collection, appointment scheduling, conflict checks' },
      { name: 'Legal Research Bot', icon: '📚', desc: 'Case law search, document templates, compliance checks, contract analysis' },
      { name: 'Billing & Time Tracking Bot', icon: '⏱️', desc: 'Invoice generation, time entry, expense tracking, payment reminders' }
    ],
    'Manufacturing': [
      { name: 'Production Planning Bot', icon: '🏭', desc: 'Order processing, production scheduling, capacity planning, material requirements' },
      { name: 'Quality Control Bot', icon: '✅', desc: 'Inspection scheduling, defect tracking, compliance reporting, certification management' },
      { name: 'Maintenance Bot', icon: '🔧', desc: 'Equipment monitoring, preventive maintenance, work orders, spare parts inventory' }
    ],
    'Transportation': [
      { name: 'Dispatch Assistant', icon: '🚚', desc: 'Route optimization, driver assignment, delivery scheduling, load planning' },
      { name: 'Customer Tracking Bot', icon: '📍', desc: 'Shipment tracking, delivery updates, pickup requests, proof of delivery' },
      { name: 'Fleet Management Bot', icon: '🚛', desc: 'Vehicle maintenance, fuel tracking, driver logs, compliance monitoring' }
    ],
    'Insurance': [
      { name: 'Policy Assistant', icon: '🛡️', desc: 'Quote generation, policy comparisons, coverage details, premium calculations' },
      { name: 'Claims Processing Bot', icon: '📋', desc: 'Claim filing, document submission, status tracking, damage assessment' },
      { name: 'Underwriting Bot', icon: '📊', desc: 'Risk assessment, application review, eligibility checks, policy issuance' }
    ],
    'Telecommunications': [
      { name: 'Customer Support Bot', icon: '📡', desc: 'Plan upgrades, billing inquiries, network issues, device troubleshooting' },
      { name: 'Technical Support Bot', icon: '🔧', desc: 'Connection problems, router setup, signal issues, service activation' },
      { name: 'Sales Assistant Bot', icon: '📱', desc: 'Plan recommendations, device upgrades, contract renewals, bundle offers' }
    ],
    'Media': [
      { name: 'Content Management Bot', icon: '🎬', desc: 'Content scheduling, asset management, rights tracking, distribution automation' },
      { name: 'Subscriber Support Bot', icon: '📺', desc: 'Subscription management, streaming issues, content recommendations, billing support' },
      { name: 'Production Assistant Bot', icon: '🎥', desc: 'Crew scheduling, equipment booking, location scouting, permit tracking' }
    ],
    'Travel & Tourism': [
      { name: 'Travel Planning Bot', icon: '✈️', desc: 'Flight/hotel booking, itinerary planning, visa info, travel insurance' },
      { name: 'Trip Support Bot', icon: '🗺️', desc: 'Real-time updates, rebooking, cancellations, travel alerts, emergency assistance' },
      { name: 'Destination Guide Bot', icon: '🏖️', desc: 'Local attractions, restaurant recommendations, weather updates, cultural tips' }
    ],
    'Food & Beverage': [
      { name: 'Order Management Bot', icon: '🍽️', desc: 'Table reservations, online ordering, menu inquiries, delivery tracking' },
      { name: 'Kitchen Operations Bot', icon: '👨‍🍳', desc: 'Recipe management, inventory tracking, supplier orders, food cost analysis' },
      { name: 'Customer Feedback Bot', icon: '⭐', desc: 'Review collection, complaint resolution, loyalty rewards, special offers' }
    ],
    'Banking': [
      { name: 'Digital Banking Bot', icon: '🏦', desc: 'Account services, fund transfers, bill payments, statement requests' },
      { name: 'Fraud Detection Bot', icon: '🔒', desc: 'Transaction monitoring, suspicious activity alerts, card blocking, identity verification' },
      { name: 'Wealth Management Bot', icon: '💼', desc: 'Portfolio management, investment advice, retirement planning, tax optimization' }
    ],
    'Automotive': [
      { name: 'Sales Assistant Bot', icon: '🚗', desc: 'Vehicle comparison, test drive booking, financing options, trade-in valuation' },
      { name: 'Service Scheduler Bot', icon: '🔧', desc: 'Maintenance appointments, service reminders, repair estimates, warranty claims' },
      { name: 'Parts & Accessories Bot', icon: '⚙️', desc: 'Parts catalog, availability checks, order tracking, installation guides' }
    ],
    'Energy': [
      { name: 'Utility Management Bot', icon: '⚡', desc: 'Usage monitoring, billing inquiries, outage reporting, energy saving tips' },
      { name: 'Smart Grid Bot', icon: '🔌', desc: 'Load balancing, demand response, equipment monitoring, maintenance scheduling' },
      { name: 'Customer Service Bot', icon: '💡', desc: 'Plan comparisons, rate inquiries, service activation, payment processing' }
    ],
    'Construction': [
      { name: 'Project Management Bot', icon: '🏗️', desc: 'Project timeline, task assignment, progress tracking, milestone alerts' },
      { name: 'Resource Planning Bot', icon: '📋', desc: 'Material orders, equipment rental, labor scheduling, budget tracking' },
      { name: 'Safety Compliance Bot', icon: '⚠️', desc: 'Safety inspections, incident reporting, training tracking, permit management' }
    ],
    'Agriculture': [
      { name: 'Farm Management Bot', icon: '🌾', desc: 'Crop planning, planting schedules, harvest tracking, yield forecasting' },
      { name: 'Agri-Supply Bot', icon: '🚜', desc: 'Seed/fertilizer orders, equipment maintenance, weather alerts, irrigation control' },
      { name: 'Market Assistant Bot', icon: '📊', desc: 'Price monitoring, sales orders, distribution planning, buyer connections' }
    ]
  }

const integrations = [
  { name: 'WhatsApp', icon: '💬' },
  { name: 'Slack', icon: '💼' },
  { name: 'Website Widgets', icon: '🌐' },
  { name: 'Mobile Apps', icon: '📱' },
  { name: 'Facebook', icon: '👥' },
  { name: 'Instagram', icon: '📸' },
  { name: 'CRMs', icon: '📊' },
  { name: 'Custom APIs', icon: '🔌' },
  { name: 'Twitter/X', icon: '🐦' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'Email Automation', icon: '📧' },
  { name: 'Microsoft Teams', icon: '👔' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'Zendesk', icon: '🎫' }
]

  // Get bots for selected industry
  const displayBots = industryBots[selectedIndustry] || industryBots['Healthcare']

  // Auto-scroll effect
const handleScrollLeft = () => {
  setScrollPosition(prev => Math.max(0, prev - 300))
}

const handleScrollRight = () => {
  const maxScroll = industries.length * 225
  setScrollPosition(prev => Math.min(prev + 300, maxScroll))
}

  const handleIndustryClick = (industryName) => {
    setSelectedIndustry(industryName)
    // Smooth scroll to bots section
    setTimeout(() => {
      document.getElementById('bots-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

// Countdown timer for OTP expiry
useEffect(() => {
  if (otpSentTime && formStep === 3) {
    const timer = setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - otpSentTime) / 1000) // seconds elapsed
      const remaining = 300 - elapsed // 5 minutes = 300 seconds
      
      if (remaining <= 0) {
        setTimeRemaining(0)
        setCanResend(true)
        clearInterval(timer)
      } else {
        setTimeRemaining(remaining)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }
}, [otpSentTime, formStep])  

const verifyOtp = async () => {
  if (!userOtp.trim()) {
    alert('Please enter the OTP.');
    return;
  }

  setIsVerifying(true) // ✅ Start loading

  try {
    const response = await fetch('https://inder20216.app.n8n.cloud/webhook/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        otp: userOtp
      })
    });

    let result = await response.json();
    
    // 🔥 FIX: If response is an array, get the first object
    if (Array.isArray(result)) {
      result = result[0];
    }
    
    console.log('📦 Parsed Result:', result);
    
    // ✅ Handle both string "true" and boolean true
    const isSuccess = result.success === true || result.success === "true";
    
if (isSuccess) {
  alert('✅ OTP verified successfully!');
  setUserWebsite(result.website || userWebsite);
  setShowSignup(false);
  setIsUserVerified(true);  // ← ADD THIS
  
  // Scroll to top of page
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
} else {
      const message = result.message || '';
      
      if (message.toLowerCase().includes('expired')) {
        alert('⏱️ OTP has expired!\n\nClick "Resend OTP" below to get a new code.');
        setCanResend(true);
        setTimeRemaining(0);
      } else if (message.toLowerCase().includes('invalid')) {
        alert('❌ Invalid OTP entered.\n\nPlease check and try again, or click "Resend OTP".');
        setCanResend(true);
      } else {
        alert('❌ ' + (message || 'Verification failed. Please try again.'));
        setCanResend(true);
      }
    }
} catch (error) {
    console.error('Verification error:', error);
    alert('❌ Network error. Please check your connection and try again.');
  } finally {
    setIsVerifying(false) // ✅ Stop loading
  }
};

// ✅ NEW FUNCTION: Resend OTP
const resendOtp = async () => {
  setIsResending(true)
  
  try {
    const domain = userEmail.split('@')[1] || ''
    const website = domain ? `https://${domain}` : ''

    const response = await fetch('https://inder20216.app.n8n.cloud/webhook/generate-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        website,
        botName: selectedBot?.name || ''
      })
    })

    if (response.ok) {
      setOtpSentTime(Date.now()) // Restart timer
      setTimeRemaining(300) // Reset to 5 minutes
      setCanResend(false) // Disable resend button
      setUserOtp('') // Clear OTP input
      alert(`✅ New OTP sent to ${userEmail}. Please check your inbox.\n\n💡 Didn't receive it? Click "Back" to change your email.`)
    } else {
      alert('❌ Failed to resend OTP. Please try again.')
    }
  } catch (error) {
    console.error('Resend OTP error:', error)
    alert('❌ Network error. Please check your connection.')
  } finally {
    setIsResending(false)
  }
};

// Show demo choice page after OTP verification
if (selectedBotForDetail && isUserVerified) {
  return (
    <>
      <Header currentPage="home" setCurrentPage={setCurrentPage} user={user} onLogout={onLogout} />
      <DemoChoicePage
        bot={selectedBotForDetail}
        user={{ name: userName, email: userEmail, phone: countryCode + userPhone }}
        onBack={() => {
          setSelectedBotForDetail(null);
          setIsUserVerified(false);
          setShowSignup(false);
          setFormStep(1);
          setUserOtp('');
          setUserEmail('');
          setUserName('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  )
}

// Show bot detail page before verification
if (selectedBotForDetail) {
  return (
    <>
      <Header currentPage="home" setCurrentPage={setCurrentPage} user={user} onLogout={onLogout} />
      <BotDetailPage
  bot={selectedBotForDetail}
  onBack={() => {
    setSelectedBotForDetail(null);
    setShowSignup(false);
    setFormStep(1);
    setUserOtp('');
    setUserEmail('');
    setUserName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  onStartDemo={() => {
    setSelectedBot(selectedBotForDetail);
    setShowSignup(true);
  }}
/>
      
{/* Show signup popup if triggered */}
{showSignup && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000
  }}>
    <div style={{
      background: 'rgba(15, 20, 40, 0.98)',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid #00ffff',
      width: '95%',
      maxWidth: '600px',
      color: '#fff',
      position: 'relative',
      boxShadow: '0 0 25px rgba(0,255,255,0.4)'
    }}>

      <h2 style={{
        marginBottom: '10px',
        color: '#00ffff',
        textAlign: 'center'
      }}>
        Get Your Demo Bot
      </h2>

      <p style={{
        fontSize: '14px',
        color: '#a0a0b0',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        Enter your details to receive your personalized demo
      </p>

      {formStep === 1 && (
        <div>
          <p style={{ color: '#a0a0b0' }}>Step 1 of 2 – Your Name</p>
          <input
            type="text"
            placeholder="Enter your full name"
            value={userName}
            onChange={(e) => {
  const val = e.target.value;

  // Allow only letters + spaces
  if (val === "" || /^[A-Za-z ]+$/.test(val)) {
    setUserName(val);
  }
}}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #00ffff',
              background: 'transparent',
              color: '#fff'
            }}
          />
          <button
            onClick={() => {
              if (!userName.trim()) {
                alert('Please enter your name')
                return
              }
              setFormStep(2)
            }}
            style={{
              marginTop: '20px',
              width: '100%',
              background: '#00ffff',
              color: '#0a0a1e',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Next →
          </button>
        </div>
      )}

{formStep === 2 && (
  <div>
    <p style={{ color: '#a0a0b0' }}>Step 2 of 2 – Your Email & Phone</p>
    
    {/* Email Input */}
    <input
      type="email"
      placeholder="Enter your email"
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      onBlur={() => {
        const email = userEmail.trim().toLowerCase();
        const personalDomains = [
          "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
          "live.com", "rediffmail.com", "icloud.com", "aol.com"
        ];

        const domain = email.split("@")[1];
        if (!domain) return;

        if (personalDomains.includes(domain)) {
          alert("Please use your official company email, not a personal email.");
          setUserEmail("");
        }
      }}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #00ffff',
        background: 'transparent',
        color: '#fff'
      }}
    />
    
{/* Phone Number Input */}
<div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
  <div style={{ width: '200px' }}>
    <Select
      options={countryOptions}
      value={countryOptions.find(opt => opt.value === countryCode)}
      onChange={(selected) => setCountryCode(selected.value)}
      placeholder="Search country..."
      isSearchable={true}
      maxMenuHeight={100}
      styles={{
        control: (base) => ({
          ...base,
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid #00ffff',
          borderRadius: '8px',
          color: '#fff',
          minHeight: '42px'
        }),
        menu: (base) => ({
          ...base,
          background: '#1a1a2e',
          border: '1px solid #00ffff'
        }),
        option: (base, state) => ({
          ...base,
          background: state.isFocused ? 'rgba(0, 255, 255, 0.2)' : '#1a1a2e',
          color: '#fff',
          cursor: 'pointer'
        }),
        singleValue: (base) => ({
          ...base,
          color: '#fff'
        }),
        input: (base) => ({
          ...base,
          color: '#fff'
        }),
        placeholder: (base) => ({
          ...base,
          color: '#808090'
        })
      }}
    />
  </div>
  
  <input
    type="tel"
    placeholder="Enter phone number"
    value={userPhone}
    onChange={(e) => {
      const val = e.target.value;
      if (val === "" || /^[0-9]+$/.test(val)) {
        setUserPhone(val);
      }
    }}
    maxLength={countryCode === '+91' ? 10 : 15}
    style={{
      flex: 1,
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #00ffff',
      background: 'transparent',
      color: '#fff'
    }}
  />
</div>
    
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button
        onClick={() => setFormStep(1)}
        style={{
          flex: 1,
          background: 'transparent',
          color: '#00ffff',
          border: '1px solid #00ffff',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
      <button
        onClick={async () => {
          if (!userEmail.trim()) {
            alert('Please enter your email')
            return
          }
          if (!userPhone.trim()) {
            alert('Please enter your phone number')
            return
          }
          
          const minLength = countryCode === '+91' ? 10 : 7;
          if (userPhone.length < minLength) {
            alert('Please enter a valid phone number')
            return
          }
          
          setIsSendingOtp(true)
          try {
            const domain = userEmail.split('@')[1] || ''
            const website = domain ? `https://${domain}` : ''
            const fullPhone = countryCode + userPhone
            
            const response = await fetch('https://inder20216.app.n8n.cloud/webhook/generate-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: userEmail,
                phone: fullPhone,
                name: userName,
                website,
                botName: selectedBot?.name || ''
              })
            })
            if (response.ok) {
              setOtpSentTime(Date.now())
              setTimeRemaining(300)
              setCanResend(false)
              alert(`✅ OTP sent to ${userEmail}`)
              setFormStep(3)
            } else {
              alert('❌ Error sending OTP')
            }
          } catch (error) {
            alert('❌ Network error')
          } finally {
            setIsSendingOtp(false)
          }
        }}
        disabled={isSendingOtp}
        style={{
          flex: 1,
          background: isSendingOtp ? '#666' : '#00ffff',
          color: isSendingOtp ? '#aaa' : '#0a0a1e',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: isSendingOtp ? 'not-allowed' : 'pointer'
        }}
      >
        {isSendingOtp ? 'Sending...' : 'Send OTP →'}
      </button>
    </div>
  </div>
)}

{formStep === 3 && (
  <div>
    <p style={{ color: '#a0a0b0' }}>Step 3 – Verify OTP</p>
    <div style={{
      background: timeRemaining > 60 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 100, 100, 0.1)',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '15px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: '14px', color: timeRemaining > 60 ? '#00ffff' : '#ff6464', margin: 0 }}>
        {timeRemaining > 0 ? (
          <>⏱️ Expires in: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</>
        ) : (
          <>⚠️ OTP expired! Please resend.</>
        )}
      </p>
    </div>
    <input
      type="text"
      placeholder="Enter 6-digit OTP"
      value={userOtp}
      onChange={(e) => setUserOtp(e.target.value.replace(/\s/g, ''))}
      maxLength="6"
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #00ffff',
        background: 'transparent',
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
        letterSpacing: '2px'
      }}
    />
    {canResend && (
      <button
        onClick={resendOtp}
        disabled={isResending}
        style={{
          width: '100%',
          marginTop: '15px',
          padding: '10px',
          background: 'rgba(0, 255, 255, 0.2)',
          color: '#00ffff',
          border: '1px solid #00ffff',
          borderRadius: '8px',
          cursor: isResending ? 'not-allowed' : 'pointer'
        }}
      >
        {isResending ? 'Sending...' : '🔄 Resend OTP'}
      </button>
    )}
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button
        onClick={() => setFormStep(2)}
        style={{
          flex: 1,
          background: 'transparent',
          color: '#00ffff',
          border: '1px solid #00ffff',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
      <button
        onClick={verifyOtp}
        disabled={!userOtp.trim() || timeRemaining <= 0 || isVerifying}
        style={{
          flex: 1,
          background: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? '#444' : '#00ffff',
          color: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? '#888' : '#0a0a1e',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? 'not-allowed' : 'pointer'
        }}
      >
        {isVerifying ? '⏳ Verifying...' : 'Verify →'}
      </button>
    </div>
  </div>
)}
    </div>
  </div>
)}
    </>
  )
}

  return (
    <div style={styles.container}>
      <HeroSection />
      <FeaturesSection />

<div 
  style={{
    background: 'linear-gradient(180deg, rgba(20, 20, 50, 0.5) 0%, rgba(30, 30, 60, 0.5) 100%)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
    position: 'relative',
  }}
>
  <section style={styles.section}>
    <h2 style={styles.sectionTitle}>Choose Your Industry Bot</h2>
          <p style={styles.sectionSubtitle}>Select your business domain to see specialized AI bots</p>
          
          <div style={styles.carouselWrapper}>
            <button 
              className="arrow"
              style={{
                ...styles.arrow, 
                left: '10px',
                opacity: scrollPosition === 0 ? 0.3 : 1,
                cursor: scrollPosition === 0 ? 'not-allowed' : 'pointer'
              }}
              onClick={handleScrollLeft}
              disabled={scrollPosition === 0}
            >
              ←
            </button>

            <div style={styles.carouselContainer}>
              <div style={{
                ...styles.carouselTrack,
                transform: `translateX(-${scrollPosition}px)`
              }}>
                {industries.map((industry, i) => (
                  <div 
                    key={i}
                    className="industry-card"
                    style={{
                      ...styles.industryCard, 
                      borderColor: industry.color,
                      ...(selectedIndustry === industry.name ? {
                        background: `linear-gradient(135deg, ${industry.color}20, ${industry.color}10)`,
                        boxShadow: `0 0 20px ${industry.color}40`
                      } : {})
                    }}
                    onClick={() => handleIndustryClick(industry.name)}
                  >
                    <div style={styles.industryIcon}>{industry.icon}</div>
                    <h3 style={{...styles.industryName, color: industry.color}}>{industry.name}</h3>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="arrow"
              style={{
                ...styles.arrow, 
                right: '10px',
                opacity: scrollPosition >= industries.length * 225 ? 0.3 : 1,
                cursor: scrollPosition >= industries.length * 225 ? 'not-allowed' : 'pointer'
              }}
              onClick={handleScrollRight}
              disabled={scrollPosition >= industries.length * 225}
            >
              →
            </button>
          </div>
        </section>
      </div>

      <div 
        id="bots-section"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 40, 60, 0.3) 0%, rgba(0, 60, 80, 0.3) 100%)',
          borderBottom: '1px solid rgba(0, 255, 255, 0.1)'
        }}
      >
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {selectedIndustry} AI Bots
          </h2>
          <p style={styles.sectionSubtitle}>
            Specialized bots designed for {selectedIndustry} industry needs
          </p>
         <div style={styles.botsScrollContainer}>
  <div style={styles.botsScrollRow}>
    {displayBots.map((bot, i) => (
      <div key={i} className="bot-card" style={styles.botCard}>
        <div style={styles.botIcon}>{bot.icon}</div>
        <h3 style={styles.botName}>{bot.name}</h3>
        <p style={styles.botDesc}>{bot.desc}</p>

        <button
          className="test-button"
          style={styles.testButton}
          onClick={() => {
            setSelectedBotForDetail(bot)
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 100)
          }}
        >
          View Details →
        </button>
      </div>
    ))}
  </div>
</div>
        </section>
      </div>
{/* AUTOMATION SUITES SECTION */}
<div
  style={{
    padding: "60px 0",
    background: "linear-gradient(180deg, rgba(10,25,50,0.4), rgba(10,15,35,0.7))",
    borderTop: "1px solid rgba(0,217,255,0.15)"
  }}
>
  <section style={styles.section}>
    <h2 style={styles.sectionTitle}>Automation Suites</h2>
    <p style={styles.sectionSubtitle}>Enterprise-grade AI automation for internal company workflows</p>

    <div style={styles.automationGrid}>
      {[
        { 
          icon: "👤", 
          name: "Workforce Automation Suite", 
          desc: "HR, IT, Admin & Facility workflows — onboarding, tickets, ID, payroll, access, assets" 
        },
        { 
          icon: "⚙️", 
          name: "Operations Automation Suite", 
          desc: "Machine issues, vendor escalations, shift updates, field reporting, SLAs & task logs" 
        },
        { 
          icon: "📊", 
          name: "Quality & Compliance Suite", 
          desc: "Audits, SOP guidance, compliance checks, incident reporting, CAPA & QA dashboards" 
        }
      ].map((suite, i) => (
        <div key={i} style={styles.automationCard}>
          <div style={styles.automationIcon}>{suite.icon}</div>
          <h3 style={styles.automationName}>{suite.name}</h3>
          <p style={styles.automationDesc}>{suite.desc}</p>
          <button
  style={styles.automationBtn}
  onClick={() => {
    if (suite.name === "Workforce Automation Suite")
      window.location.href = "/workforce";

    if (suite.name === "Operations Automation Suite")
      window.location.href = "/operations";

    if (suite.name === "Quality & Compliance Suite")
      window.location.href = "/quality";
  }}
>
  Explore →
</button>

        </div>
      ))}
    </div>
  </section>
</div>

      <div style={{
        background: 'linear-gradient(180deg, rgba(40, 0, 60, 0.3) 0%, rgba(60, 0, 80, 0.3) 100%)',
        borderBottom: '1px solid rgba(255, 0, 255, 0.1)'
      }}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Deploy Anywhere, Integrate Everything</h2>
          <p style={styles.sectionSubtitle}>Connect your chatbot to your existing platforms</p>
          <div style={styles.integrationsGrid}>
            {integrations.map((int, i) => (
              <div key={i} className="integration-card" style={styles.integrationCard}>
                <div style={styles.integrationIcon}>{int.icon}</div>
                <p>{int.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Transform Your Business?</h2>
        <p style={styles.ctaText}>Start your 15-minute free demo now</p>
        <button
          className="cta-button"
          style={styles.ctaButton}
          onClick={() => alert('Scroll up and select a bot to start your demo!')}
        >
          Start Free Demo →
        </button>
      </section>
      
      {showSignup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'rgba(15, 20, 40, 0.98)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #00ffff',
            width: '95%',
            maxWidth: '600px',
            color: '#fff',
            position: 'relative',
            boxShadow: '0 0 25px rgba(0,255,255,0.4)'
          }}>
            <button
              onClick={() => setShowSignup(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                color: '#00ffff',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <h2 style={{
              marginBottom: '10px',
              color: '#00ffff',
              textAlign: 'center'
            }}>
              Create Your Personalized Demo Bot
            </h2>

            <p style={{
              fontSize: '14px',
              color: '#a0a0b0',
              marginBottom: '25px',
              textAlign: 'center'
            }}>
              Tell us a few details to prepare your live demo.<br/>
              <b>Only your Name, Email, and Website URL</b> will be saved.<br/>
              All other data is used temporarily and automatically deleted.
            </p>

            <div style={{
              background: 'rgba(0,255,255,0.05)',
              padding: '10px 15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: 0 }}>
                <b>Selected Industry:</b> {selectedIndustry}<br/>
                <b>Selected Bot:</b> {selectedBot?.name}
              </p>
            </div>

            <p style={{
              textAlign: 'center',
              color: '#00ffff',
              marginBottom: '25px'
            }}>
              💡 Tip: You'll get your demo link by email. It's valid for 15 minutes.
            </p>

            {(() => {
              switch (formStep) {
                case 1:
                  return (
                    <div>
                      <p style={{ color: '#a0a0b0' }}>Step 1 of 4 – Your Name</p>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #00ffff',
                          background: 'transparent',
                          color: '#fff'
                        }}
                      />
                      <p style={{ fontSize: '13px', color: '#00ffff', marginTop: '8px' }}>
                        💡 We use your name to personalize your demo bot's messages.
                      </p>
                      <button
                        onClick={() => {
                          const cleanName = userName.trim()
                          if (!cleanName) {
                            alert('Please enter your full name before proceeding.')
                            return
                          }
                          const namePattern = /^[A-Za-z ]{2,}$/
                          if (!namePattern.test(cleanName)) {
                            alert('Please enter a valid name (letters only, at least 2 characters).')
                            return
                          }
                          setFormStep(2)
                        }}
                        style={{
                          marginTop: '20px',
                          background: '#00ffff',
                          color: '#0a0a1e',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  )

                case 2:
                  return (
                    <div>
                      <p style={{ color: '#a0a0b0' }}>Step 2 of 4 – Your Email</p>
                      <input
                        type="email"
                        placeholder="Enter your business email"
                        value={userEmail}
                        onChange={(e) => {
                          const email = e.target.value
                          setUserEmail(email)
                          const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
                          const domain = email.split('@')[1] || ''
                          if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
                            setEmailError('Please enter a valid email format.')
                          } else if (freeDomains.includes(domain.toLowerCase())) {
                            setEmailError('Please use your official company email (not Gmail/Yahoo).')
                          } else {
                            setEmailError('')
                          }
                        }}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #00ffff',
                          background: 'transparent',
                          color: '#fff'
                        }}
                      />
                      {emailError && (
                        <p style={{ fontSize: '13px', color: 'red', marginTop: '8px' }}>{emailError}</p>
                      )}
                      <p style={{ fontSize: '13px', color: '#00ffff', marginTop: '8px' }}>
                        💡 We use your email to send your demo link securely.
                      </p>
                      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                          onClick={() => setFormStep(1)}
                          style={{
                            background: 'transparent',
                            color: '#00ffff',
                            border: '1px solid #00ffff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          ← Back
                        </button>
<button
  onClick={async () => {
    if (!userEmail.trim() || emailError)
      return alert('Please enter a valid business email.')

    setIsSendingOtp(true) // ✅ Start loading

    try {
      // 🧠 Auto-generate website from email domain
      const domain = userEmail.split('@')[1] || ''
      const website = domain ? `https://${domain}` : ''

      const response = await fetch('https://inder20216.app.n8n.cloud/webhook/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          website, // 👈 auto-generated website
          botName: selectedBot?.name || ''
        })
      })

      if (response.ok) {
        setOtpSentTime(Date.now()) // 🔥 Start timer
        setTimeRemaining(300) // Reset to 5 minutes
        setCanResend(false) // Disable resend initially
        alert(`✅ OTP sent to ${userEmail}. Please check your inbox.`)
        setFormStep(3) // ✅ move to next step (OTP entry)
      } else {
        alert('❌ Error sending OTP. Please try again.')
      }
    } catch (error) {
      console.error('OTP Send Error:', error)
      alert('❌ Network error. Please try again.')
    } finally {
      setIsSendingOtp(false) // ✅ Stop loading
    }
  }}
  disabled={isSendingOtp} // ✅ Disable when loading
  style={{
    background: isSendingOtp ? '#666' : '#00ffff',
    color: isSendingOtp ? '#aaa' : '#0a0a1e',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: isSendingOtp ? 'not-allowed' : 'pointer'
  }}
>
  {isSendingOtp ? '⏳ Sending OTP...' : 'Next →'}
</button>
                      </div>
                    </div>
                  )

case 3:
  return (
    <div>
      <p style={{ color: '#a0a0b0' }}>Step 3 of 4 – Verify OTP</p>
      
      {/* Timer Display */}
      <div style={{
        background: timeRemaining > 60 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 100, 100, 0.1)',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '15px',
        textAlign: 'center',
        border: `1px solid ${timeRemaining > 60 ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 100, 100, 0.3)'}`
      }}>
        <p style={{ 
          fontSize: '14px', 
          color: timeRemaining > 60 ? '#00ffff' : '#ff6464',
          margin: 0 
        }}>
          {timeRemaining > 0 ? (
            <>
              ⏱️ OTP expires in: <strong>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</strong>
            </>
          ) : (
            <>⚠️ OTP expired! Please resend.</>
          )}
        </p>
      </div>
s
<input
  type="text"
  placeholder="Enter the 6-digit OTP"
  value={userOtp}
  onChange={(e) => setUserOtp(e.target.value.replace(/\s/g, ''))} // Remove all spaces
  maxLength="6"
style={{
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #00ffff',
  background: 'transparent',
  color: '#fff',
  fontSize: '18px',
  textAlign: 'center',
  letterSpacing: '2px' // ✅ Reduced spacing
}}
      />
      
      <p style={{ fontSize: '13px', color: '#00ffff', marginTop: '8px' }}>
        💡 Please enter the OTP sent to your business email to verify your identity.
      </p>

      {/* Resend OTP Button */}
      {canResend && (
        <div style={{
          background: 'rgba(255, 200, 100, 0.1)',
          padding: '12px',
          borderRadius: '8px',
          marginTop: '15px',
          border: '1px solid rgba(255, 200, 100, 0.3)'
        }}>
          <p style={{ fontSize: '13px', color: '#ffc864', margin: '0 0 10px 0' }}>
            📩 Didn't receive the OTP?
          </p>
          <button
            onClick={resendOtp}
            disabled={isResending}
            style={{
              width: '100%',
              padding: '10px',
              background: isResending ? '#666' : 'rgba(0, 255, 255, 0.2)',
              color: '#00ffff',
              border: '1px solid #00ffff',
              borderRadius: '8px',
              cursor: isResending ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {isResending ? '⏳ Sending...' : '🔄 Resend OTP'}
          </button>
          <p style={{ fontSize: '11px', color: '#a0a0b8', marginTop: '8px', margin: 0 }}>
            💡 Click "Back" below if you need to change your email
          </p>
        </div>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setFormStep(2)}
          style={{
            background: 'transparent',
            color: '#00ffff',
            border: '1px solid #00ffff',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <button
  onClick={verifyOtp}
  disabled={!userOtp.trim() || timeRemaining <= 0 || isVerifying}
  style={{
    flex: 1,
    background: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? '#444' : '#00ffff',
    color: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? '#888' : '#0a0a1e',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: (!userOtp.trim() || timeRemaining <= 0 || isVerifying) ? 'not-allowed' : 'pointer'
  }}
>
  {isVerifying ? '⏳ Verifying...' : 'Verify →'}
</button>
      </div>
    </div>
  )


case 4:
  const currentBotDetails = botDetails[selectedBot?.name] || null;
  
  if (!currentBotDetails) {
    return (
      <div>
        <p style={{ color: '#ff6464' }}>Bot information not available.</p>
        <button onClick={() => setFormStep(3)} style={{ marginTop: '20px', padding: '10px 20px', background: '#00ffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {/* Bot Details Section */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <span style={{ fontSize: '48px' }}>{selectedBot?.icon}</span>
          <div>
            <h3 style={{ margin: 0, color: '#00ffff', fontSize: '24px' }}>{selectedBot?.name}</h3>
            <p style={{ margin: '5px 0 0 0', color: '#a0a0b8', fontSize: '14px' }}>{currentBotDetails.tagline}</p>
          </div>
        </div>

        {/* What It Does */}
        <div style={{ background: 'rgba(0, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
          <h4 style={{ color: '#00ffff', marginTop: 0, fontSize: '16px', marginBottom: '12px' }}>✨ What This Bot Does:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#fff' }}>
            {currentBotDetails.whatItDoes.map((item, i) => (
              <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
          {currentBotDetails.kpis.map((kpi, i) => (
            <div key={i} style={{ background: 'rgba(0, 200, 100, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0, 200, 100, 0.3)' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#a0a0b8' }}>{kpi.label}</p>
              <p style={{ margin: '5px 0', fontSize: '24px', fontWeight: '700', color: '#00ff88' }}>{kpi.value}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#00ffaa' }}>↑ {kpi.improvement}</p>
            </div>
          ))}
        </div>

        {/* Sample Questions */}
        <div style={{ background: 'rgba(128, 0, 255, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(128, 0, 255, 0.2)' }}>
          <h4 style={{ color: '#bb88ff', marginTop: 0, fontSize: '16px', marginBottom: '12px' }}>💡 Sample Questions It Handles:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentBotDetails.useCases.map((question, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 15px', borderRadius: '8px', fontSize: '13px', color: '#ddd' }}>
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* Business Benefits */}
        <div style={{ background: 'rgba(255, 150, 0, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(255, 150, 0, 0.2)' }}>
          <h4 style={{ color: '#ffaa44', marginTop: 0, fontSize: '16px', marginBottom: '12px' }}>🚀 Business Impact:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#fff' }}>
            {currentBotDetails.businessBenefits.map((benefit, i) => (
              <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Knowledge Upload Section */}
      <div style={{ borderTop: '2px solid rgba(0, 255, 255, 0.3)', paddingTop: '25px' }}>
        <h4 style={{ color: '#00ffff', fontSize: '18px', marginBottom: '15px' }}>📚 Add Your Knowledge Base</h4>
        <p style={{ fontSize: '13px', color: '#a0a0b8', marginBottom: '20px' }}>
          Choose how you want to provide information for your bot. You can use one or multiple methods.
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[
            { id: 'documents', label: '📄 Documents', desc: 'PDF, DOCX, TXT' },
            { id: 'website', label: '🔗 Website', desc: 'Scrape URL' },
            { id: 'text', label: '📝 Direct Text', desc: 'Paste content' },
            { id: 'faq', label: '❓ FAQ', desc: 'CSV/Excel' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setKnowledgeTab(tab.id)}
              style={{
                flex: '1',
                minWidth: '120px',
                padding: '12px',
                background: knowledgeTab === tab.id ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: knowledgeTab === tab.id ? '2px solid #00ffff' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: knowledgeTab === tab.id ? '#00ffff' : '#aaa',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: knowledgeTab === tab.id ? '600' : '400'
              }}
            >
              <div>{tab.label}</div>
              <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '25px', borderRadius: '12px', minHeight: '200px' }}>
          {knowledgeTab === 'documents' && (
            <div>
              <p style={{ color: '#00ffff', marginBottom: '15px', fontSize: '14px' }}>Upload your documents (PDF, DOCX, TXT)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={(e) => setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px dashed #00ffff',
                  borderRadius: '8px',
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              />
              {uploadedFiles.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <p style={{ fontSize: '13px', color: '#00ffff', marginBottom: '10px' }}>Uploaded Files:</p>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} style={{ padding: '8px 12px', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '6px', marginBottom: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>📄 {file.name}</span>
                      <button onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#ff6464', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {knowledgeTab === 'website' && (
            <div>
              <p style={{ color: '#00ffff', marginBottom: '15px', fontSize: '14px' }}>Enter your website URL to scrape content</p>
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #00ffff',
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <p style={{ fontSize: '12px', color: '#a0a0b8', marginTop: '10px' }}>💡 We'll extract relevant information from your website</p>
            </div>
          )}

          {knowledgeTab === 'text' && (
            <div>
              <p style={{ color: '#00ffff', marginBottom: '15px', fontSize: '14px' }}>Paste your content directly</p>
              <textarea
                placeholder="Paste your FAQ, policies, or any text content here..."
                value={directText}
                onChange={(e) => setDirectText(e.target.value)}
                rows={8}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #00ffff',
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  resize: 'vertical'
                }}
              />
              <p style={{ fontSize: '12px', color: '#a0a0b8', marginTop: '10px' }}>💡 Character count: {directText.length}</p>
            </div>
          )}

          {knowledgeTab === 'faq' && (
            <div>
              <p style={{ color: '#00ffff', marginBottom: '15px', fontSize: '14px' }}>Upload FAQ file (CSV or Excel format)</p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => setFaqFile(e.target.files[0])}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px dashed #00ffff',
                  borderRadius: '8px',
                  background: 'rgba(0, 255, 255, 0.05)',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              />
              {faqFile && (
                <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '6px', fontSize: '13px' }}>
                  📊 {faqFile.name}
                </div>
              )}
              <p style={{ fontSize: '12px', color: '#a0a0b8', marginTop: '10px' }}>💡 Format: Two columns - Question | Answer</p>
            </div>
          )}
        </div>

        {/* Suggested Docs */}
        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 200, 100, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 200, 100, 0.2)' }}>
          <p style={{ fontSize: '13px', color: '#ffcc88', marginBottom: '10px', fontWeight: '600' }}>💡 Suggested Documents:</p>
          <div style={{ fontSize: '12px', color: '#ddd', lineHeight: '1.8' }}>
            {currentBotDetails.sampleDocs.map((doc, i) => (
              <div key={i}>• {doc}</div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
          <button
            onClick={() => setFormStep(3)}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => {
              setIsCreatingBot(true)
              // TODO: Create demo bot logic
              setTimeout(() => {
                alert('🎉 Demo Bot Created! (This will be replaced with actual bot creation)')
                setIsCreatingBot(false)
              }, 2000)
            }}
            disabled={isCreatingBot}
            style={{
              padding: '12px 32px',
              background: isCreatingBot ? '#666' : '#00ffff',
              border: 'none',
              borderRadius: '8px',
              color: '#0a0a1e',
              cursor: isCreatingBot ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '700'
            }}
          >
{isCreatingBot ? '⏳ Creating...' : '🚀 Create My Demo Bot'}
          </button>
        </div>
      </div>
    </div>
  );

              }
            })()}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh'
  },
  hero: {
    position: 'relative',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 30px',
    textAlign: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(10, 10, 30, 0.9) 0%, rgba(20, 40, 80, 0.8) 100%)',
    borderBottom: '2px solid rgba(0, 255, 255, 0.2)',
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: '700',
    marginBottom: '30px',
    lineHeight: '1.2',
    textShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
  },
  gradient: {
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#c0c0d8',
    marginBottom: '40px',
    maxWidth: '800px'
  },
  automationGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  marginTop: "40px"
},

automationCard: {
  background: "rgba(20,27,46,0.8)",
  border: "1px solid rgba(0,217,255,0.2)",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center",
  transition: "0.3s ease",
  cursor: "pointer"
},

automationCardHover: {
  transform: "translateY(-8px)",
  boxShadow: "0 4px 25px rgba(0, 217, 255, 0.3)"
},

automationIcon: {
  fontSize: "45px",
  marginBottom: "10px"
},

automationName: {
  fontSize: "20px",
  fontWeight: "700",
  color: "#00D9FF",
  marginBottom: "8px"
},

automationDesc: {
  fontSize: "15px",
  color: "#cbd5e1",
  marginBottom: "20px"
},

automationBtn: {
  padding: "10px 20px",
  background: "transparent",
  border: "1px solid #00D9FF",
  borderRadius: "10px",
  color: "#00D9FF",
  cursor: "pointer"
},
  ctaButton: {
    padding: '18px 45px',
    fontSize: '20px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    color: '#0a0a1e',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)',
    transition: 'all 0.3s ease'
  },
  shape1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    fontSize: '60px',
    opacity: 0.15,
    animation: 'float 6s ease-in-out infinite'
  },
  shape2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    fontSize: '60px',
    opacity: 0.15,
    animation: 'float 6s ease-in-out infinite 2s'
  },
  shape3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    fontSize: '60px',
    opacity: 0.15,
    animation: 'float 6s ease-in-out infinite 4s'
  },
  section: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '80px 30px'
  },
  sectionTitle: {
    fontSize: '42px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '15px',
    color: '#00ffff',
    textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
  },
  sectionSubtitle: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#a0a0b8',
    marginBottom: '50px'
  },
carouselWrapper: {
  position: 'relative',
  width: '100%',
  padding: '30px 60px',
  overflow: 'hidden'
},
carouselContainer: {
  overflow: 'visible',
  width: '100%',
  padding: '20px 0'
},
  carouselTrack: {
    display: 'flex',
    gap: '25px',
    transition: 'transform 0.1s linear',
    width: 'fit-content'
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(0, 255, 255, 0.2)',
    border: '2px solid rgba(0, 255, 255, 0.5)',
    color: '#00ffff',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.3s ease'
  },
  industryCard: {
    minWidth: '200px',
    background: 'rgba(0, 255, 255, 0.05)',
    border: '2px solid',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  industryIcon: {
    fontSize: '50px',
    marginBottom: '15px'
  },
  industryName: {
    fontSize: '18px',
    fontWeight: '600'
  },
  botsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px'
  },
botCard: {
  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(0, 128, 255, 0.05))',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '16px',
  padding: '30px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  minWidth: '280px',
  maxWidth: '280px',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column'
},
  botIcon: {
    fontSize: '50px',
    marginBottom: '15px'
  },
 botName: {
  fontSize: '20px',
  fontWeight: '600',
  color: '#00ffff',
  marginBottom: '10px',
  whiteSpace: 'normal',
  wordWrap: 'break-word'
},
botDesc: {
  fontSize: '13px',
  color: '#a0a0b8',
  marginBottom: '20px',
  lineHeight: '1.6',
  height: '65px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  wordWrap: 'break-word',
  whiteSpace: 'normal'
},
  testButton: {
    padding: '10px 24px',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    background: 'transparent',
    color: '#00ffff',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  integrationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px'
  },
  integrationCard: {
    background: 'linear-gradient(135deg, rgba(128, 0, 255, 0.1), rgba(255, 0, 128, 0.1))',
    border: '1px solid rgba(255, 0, 255, 0.2)',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    color: '#e0e0f0'
  },
  integrationIcon: {
    fontSize: '40px',
    marginBottom: '10px'
  },
  ctaSection: {
    textAlign: 'center',
    padding: '100px 30px',
    background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%)',
    borderTop: '2px solid rgba(0, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(0, 255, 255, 0.3)'
  },
  ctaTitle: {
    fontSize: '42px',
    color: '#00ffff',
    marginBottom: '20px',
    textShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
  },
  ctaText: {
    fontSize: '18px',
    color: '#a0a0b8',
    marginBottom: '30px'
  },
  botsScrollContainer: {
  width: "100%",
  overflowX: "auto",
  whiteSpace: "nowrap",
  paddingBottom: "20px",
},

botsScrollRow: {
  display: "flex",
  gap: "25px",
  padding: "10px",
}
}

export default Home