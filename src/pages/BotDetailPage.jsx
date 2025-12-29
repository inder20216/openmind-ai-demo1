import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, MessageSquare, Shield, Zap, TrendingUp, Clock, DollarSign, Users, CheckCircle, Send } from 'lucide-react'
import { botDetailsData } from '../data/botDetailsData'  // ← ADD THIS LINE
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'  // ← ADD THIS LINE

function BotDetailPage({ bot, onBack, onStartDemo }) {
  const [showDemoOptions, setShowDemoOptions] = useState(false)
  const [demoChoice, setDemoChoice] = useState(null) // 'live' or 'email'
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const botData = botDetailsData[bot.name] || botDetailsData['default']

  // Send bot link via email
  const sendBotLink = async () => {
  if (!email) {
    alert('Please enter your email')
    return
  }

  setIsLoading(true)
  
  try {
    const response = await fetch('https://inder20216.app.n8n.cloud/webhook/send-bot-demo-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        botName: bot.name,
        botUrl: `https://yourdomain.com/demo/${bot.name}`
      })
    })

    if (response.ok) {
      setLinkSent(true)
    } else {
      alert('Failed to send link. Please try again.')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Network error. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeft size={18} />
        Back to Bots
      </button>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.hero}
      >
        <div style={styles.heroIcon}>{bot.icon}</div>
        <h1 style={styles.heroTitle}>{bot.name}</h1>
        <p style={styles.heroDesc}>{bot.desc}</p>

 {!showDemoOptions && (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      onStartDemo()
      // After OTP verification, auto-show demo options
      setTimeout(() => setShowDemoOptions(true), 100)
    }}
    style={styles.ctaButton}
  >
    Get Started with Demo
  </motion.button>
)}
      </motion.section>

      {/* Demo Options */}
      {showDemoOptions && !demoChoice && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.demoOptions}
        >
          <h2 style={styles.optionsTitle}>Choose Your Demo Experience</h2>
          
          <div style={styles.optionsGrid}>
            {/* Option 1: Live Demo */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0, 217, 255, 0.3)' }}
              onClick={() => setDemoChoice('live')}
              style={styles.optionCard}
            >
              <MessageSquare size={40} color="#00D9FF" />
              <h3 style={styles.optionTitle}>Test Live Now</h3>
              <p style={styles.optionDesc}>
                Try the bot instantly in a live chat window. No email required.
              </p>
              <div style={styles.optionBadge}>⚡ Instant</div>
            </motion.div>

            {/* Option 2: Get Link via Email */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0, 255, 136, 0.3)' }}
              onClick={() => setDemoChoice('email')}
              style={styles.optionCard}
            >
              <Mail size={40} color="#00FF88" />
              <h3 style={styles.optionTitle}>Get Personalized Link</h3>
              <p style={styles.optionDesc}>
                Receive a private demo link via email. Test at your convenience.
              </p>
              <div style={{...styles.optionBadge, background: 'rgba(0, 255, 136, 0.2)', borderColor: '#00FF88'}}>
                📧 Flexible
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Live Demo Popup */}
      {demoChoice === 'live' && (
        <div style={styles.overlay} onClick={() => setDemoChoice(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={styles.demoPopup}
          >
            <div style={styles.popupHeader}>
              <h3>{bot.name} - Live Demo</h3>
              <button onClick={() => setDemoChoice(null)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.popupBody}>
              <iframe
                src={bot.demoUrl || 'https://example.com/chatbot-demo'}
                style={styles.iframe}
                title="Live Bot Demo"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Email Form */}
      {demoChoice === 'email' && !linkSent && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.emailSection}
        >
          <div style={styles.emailCard}>
            <Mail size={48} color="#00D9FF" />
            <h2 style={styles.emailTitle}>Get Your Personal Demo Link</h2>
            <p style={styles.emailDesc}>
              We'll send you a private link to test {bot.name} at your own pace. 
              The link remains active for 7 days.
            </p>
            
            <div style={styles.emailForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.emailInput}
                disabled={isLoading}
              />
              <button
                onClick={sendBotLink}
                disabled={isLoading}
                style={{...styles.sendBtn, opacity: isLoading ? 0.6 : 1}}
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={20} />
                    Send Link
                  </>
                )}
              </button>
            </div>

            <button onClick={() => setDemoChoice(null)} style={styles.backLink}>
              ← Choose different option
            </button>
          </div>
        </motion.section>
      )}

      {/* Success Message */}
      {linkSent && (
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.successSection}
        >
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>Demo Link Sent!</h2>
          <p style={styles.successText}>
            Check your email: <strong>{email}</strong>
            <br/><br/>
            You'll receive a personalized link to test {bot.name}
          </p>
          <button onClick={onBack} style={styles.doneBtn}>
            Done
          </button>
        </motion.section>
      )}

      {/* What You Get Section */}
     <div style={styles.benefitsGrid}>
  {botData.benefits.map((benefit, index) => (
    <div key={index} style={styles.benefitCard}>
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>{benefit.icon}</div>
      <h3 style={styles.benefitTitle}>{benefit.title}</h3>
      <p style={styles.benefitDesc}>{benefit.desc}</p>
    </div>
  ))}
</div>

{/* Business Impact Section */}
<section style={styles.impactSection}>
  <h2 style={styles.sectionTitle}>Business Impact</h2>
  <div style={styles.kpiGrid}>
    {botData.kpis.map((kpi, index) => {
      // Convert KPI to percentage for chart (extract number)
      const numericValue = parseInt(kpi.number) || 75
      const chartData = [
        { value: numericValue },
        { value: 100 - numericValue }
      ]
      const COLORS = ['#00D9FF', 'rgba(20, 27, 46, 0.3)']

      return (
        <div key={index} style={styles.kpiCard}>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {chartData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={styles.kpiNumber}>{kpi.number}%</div>
          <div style={styles.kpiLabel}>{kpi.label}</div>
        </div>
      )
    })}
  </div>
</section>

      {/* Security Badge */}
      <section style={styles.security}>
        <Shield size={32} color="#00D9FF" />
        <h3 style={styles.securityTitle}>Enterprise Security</h3>
        <p style={styles.securityText}>
          Bank-level encryption • GDPR compliant • Your data never leaves your control
        </p>
      </section>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0f24 0%, #1a1545 50%, #0a0f24 100%)',
    paddingTop: '100px',
    paddingBottom: '80px',
  },
  backButton: {
    position: 'fixed',
    top: '90px',
    left: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(0, 217, 255, 0.1)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '8px',
    color: '#00D9FF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    zIndex: 100,
    transition: 'all 0.3s ease',
  },
  hero: {
    maxWidth: '800px',
    margin: '0 auto 60px',
    padding: '0 30px',
    textAlign: 'center',
  },
  heroIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
  },
  heroDesc: {
    fontSize: '20px',
    color: '#94A3B8',
    lineHeight: '1.6',
    marginBottom: '40px',
  },
  ctaButton: {
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 0 30px rgba(0, 102, 255, 0.5)',
  },
  demoOptions: {
    maxWidth: '900px',
    margin: '0 auto 60px',
    padding: '0 30px',
  },
  optionsTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '40px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  optionCard: {
    background: 'rgba(20, 27, 46, 0.8)',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '16px',
    padding: '40px 30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  optionTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    margin: '20px 0 12px',
  },
  optionDesc: {
    fontSize: '16px',
    color: '#94A3B8',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  optionBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(0, 217, 255, 0.2)',
    border: '1px solid #00D9FF',
    borderRadius: '20px',
    color: '#00D9FF',
    fontSize: '14px',
    fontWeight: '600',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  demoPopup: {
    width: '90%',
    maxWidth: '600px',
    height: '80vh',
    maxHeight: '700px',
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 0 60px rgba(0, 217, 255, 0.6)',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    color: '#fff',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
  },
  popupBody: {
    height: 'calc(100% - 70px)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  emailSection: {
    maxWidth: '700px',
    margin: '0 auto 60px',
    padding: '0 30px',
  },
  emailCard: {
    background: 'rgba(20, 27, 46, 0.8)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '20px',
    padding: '50px 40px',
    textAlign: 'center',
  },
  emailTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    margin: '20px 0 12px',
  },
  emailDesc: {
    fontSize: '16px',
    color: '#94A3B8',
    lineHeight: '1.7',
    marginBottom: '30px',
  },
  emailForm: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  emailInput: {
    flex: 1,
    minWidth: '250px',
    padding: '16px 20px',
    background: 'rgba(10, 15, 28, 0.8)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
  },
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  backLink: {
    background: 'transparent',
    border: 'none',
    color: '#00D9FF',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  successSection: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '50px 40px',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '20px',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#00FF88',
    marginBottom: '16px',
  },
  successText: {
    fontSize: '18px',
    color: '#94A3B8',
    lineHeight: '1.7',
    marginBottom: '30px',
  },
  doneBtn: {
    padding: '14px 40px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  section: {
    maxWidth: '1100px',
    margin: '80px auto',
    padding: '0 30px',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: '50px',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  benefitCard: {
    background: 'rgba(20, 27, 46, 0.6)',
    border: '1px solid rgba(0, 217, 255, 0.2)',
    borderRadius: '16px',
    padding: '30px',
  },
  benefitTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    margin: '16px 0 10px',
  },
  benefitDesc: {
    fontSize: '15px',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  impactSection: {
    maxWidth: '1100px',
    margin: '80px auto',
    padding: '0 30px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
  },
  kpiCard: {
    background: 'rgba(20, 27, 46, 0.6)',
    border: '1px solid rgba(0, 217, 255, 0.2)',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
  },
  kpiNumber: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #00FF88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '16px 0 8px',
  },
  kpiLabel: {
    fontSize: '16px',
    color: '#94A3B8',
  },
  security: {
    maxWidth: '800px',
    margin: '80px auto 0',
    padding: '30px',
    background: 'rgba(0, 217, 255, 0.05)',
    border: '1px solid rgba(0, 217, 255, 0.2)',
    borderRadius: '16px',
    textAlign: 'center',
  },
  securityTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    margin: '12px 0 8px',
  },
  securityText: {
    fontSize: '15px',
    color: '#94A3B8',
  },
}

export default BotDetailPage