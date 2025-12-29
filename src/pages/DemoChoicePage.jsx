import RequirementsForm from '../components/RequirementsForm'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Settings, ArrowLeft } from 'lucide-react'
import CustomDemoForm from '../components/CustomDemoForm'

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(255, 136, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0); }
  }
`;
document.head.appendChild(styleSheet);

function DemoChoicePage({ bot, user, onBack }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [allowRestart, setAllowRestart] = useState(false)
  const messagesEndRef = useRef(null)
  

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isSending, setIsSending] = useState(false)
  const [quickQuestions, setQuickQuestions] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [showSampleRecords, setShowSampleRecords] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [showRequirementsForm, setShowRequirementsForm] = useState(false)

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  useEffect(() => {
    if (selectedOption !== 'quick-start') return
    
    if (timeLeft <= 0) {
      setTimeout(() => setShowFeedback(true), 500)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedOption, timeLeft])

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const getWebhookUrl = () => {
    if (bot?.name === 'Patient Support Bot') {
      return 'https://inder20216.app.n8n.cloud/webhook/dr-aisha-generative'
    }
    if (bot?.name === 'Hospital Support') {
      return 'https://inder20216.app.n8n.cloud/webhook/health-admin'
    }
    if (bot?.name === 'Heart Health Assistant') {
      return 'https://inder20216.app.n8n.cloud/webhook/heart'
    }
    if (bot?.name === 'Kidney Care Companion') {
      return 'https://inder20216.app.n8n.cloud/webhook/kidney'
    }
    if (bot?.name === 'Fertility Support Bot') {
      return 'https://inder20216.app.n8n.cloud/webhook/infertility'
    }
    if (bot?.name === 'Customer Support Bot') {
      return 'https://inder20216.app.n8n.cloud/webhook/-ecomm-cs'
    }
    
    console.error('⚠️ No webhook configured for bot:', bot?.name)
    return null
  }

  const isBotConfigured = () => {
    return getWebhookUrl() !== null
  }

  useEffect(() => {
    if (selectedOption === 'quick-start') {
      loadInitialGreeting()
    }
  }, [selectedOption])

  const loadInitialGreeting = async () => {
    setIsSending(true)
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    
    try {
      const response = await fetch(getWebhookUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: 'Hello',
          userName: user?.name || 'Guest',
          userEmail: user?.email || 'demo@openmind.in',
          userPhone: user?.phone || '9999999999',
          sessionId: newSessionId
        })
      })

      const text = await response.text()
      let result = JSON.parse(text)
      const botMessage = result.response || result.output || 'Hello! How can I help you today?'
      
      setMessages([{ sender: 'bot', text: botMessage }])
    } catch (err) {
      console.error('❌ Error:', err)
      setMessages([{ sender: 'bot', text: 'Hello! How can I help you today?' }])
    } finally {
      setIsSending(false)
    }
  }

  const handleQuickQuestion = async (questionId, questionText) => {
    setMessages(prev => [...prev, { sender: 'user', text: questionText }])
    setQuickQuestions([])
    setIsSending(true)

    try {
      const response = await fetch(getWebhookUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userName: user?.name || 'Guest',
          questionId: questionId
        })
      })

      const text = await response.text()
      let result = JSON.parse(text)
      const data = Array.isArray(result) ? result[0] : result
      const botReply = data.response || 'Sorry, no reply from bot.'
      
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }])

      if (data.currentNode === 'CONFIRMATION' || questionId.startsWith('CONFIRM_')) {
        try {
          await fetch('https://inder20216.app.n8n.cloud/webhook/Details-feedback-support', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
  action: 'support',
  name: user?.name || 'Guest',
  email: user?.email || '',
  phone: user?.phone || 'Not provided',
  botName: bot?.name || '',
  rating: selectedFeedback || 'Not provided',
  comments: feedbackText || 'No comments',
  timestamp: new Date().toISOString()
})
          })
        } catch (emailError) {
          console.error('❌ Failed to send email:', emailError)
        }
      }

      if (data.questions && Array.isArray(data.questions)) {
        setTimeout(() => setQuickQuestions(data.questions), 500)
      } else {
        setQuickQuestions([])
      }
    } catch (err) {
      console.error('❌ Quick question error:', err)
      setMessages(prev => [...prev, { sender: 'bot', text: 'Network error. Please try again.' }])
    } finally {
      setIsSending(false)
    }
  }

  const sendMessage = async () => {
    if (!userInput.trim() || isSending) return

    setMessages(prev => [...prev, { sender: 'user', text: userInput }])
    const currentMessage = userInput
    setUserInput('')
    setIsSending(true)

    try {
      const response = await fetch(getWebhookUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: currentMessage,
          userName: user?.name || 'Guest',
          userEmail: user?.email || 'demo@openmind.in',
          userPhone: user?.phone || '9999999999',
          sessionId: sessionId
        })
      })

      const text = await response.text()
      let result = JSON.parse(text)
      const botReply = result.response || result.output || 'Sorry, I didn\'t get that.'
      
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }])
    } catch (err) {
      console.error('❌ Send message error:', err)
      setMessages(prev => [...prev, { sender: 'bot', text: 'Network error. Please try again.' }])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={styles.container}>
      <button
        onClick={() => setAllowRestart(!allowRestart)}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          padding: '6px 10px',
          fontSize: '10px',
          background: allowRestart ? 'rgba(0,255,0,0.25)' : 'rgba(255,255,255,0.06)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '6px',
          opacity: 0.3,
          zIndex: 9999,
        }}
      >
        Dev Restart: {allowRestart ? 'ON' : 'OFF'}
      </button>

      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeft size={18} />
        Back
      </button>

      {!isBotConfigured() ? (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            background: 'rgba(15, 20, 40, 0.95)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '20px',
            padding: '60px 40px',
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>{bot?.icon}</div>
            <h1 style={{ fontSize: '32px', color: '#00ffff', marginBottom: '15px', fontWeight: '700' }}>
              {bot?.name}
            </h1>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #ff8800, #ff6600)',
              color: '#fff',
              padding: '10px 25px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '30px'
            }}>
              🚧 Not Yet Live
            </div>
            
          <p style={{ fontSize: '18px', color: '#a0a0b8', marginBottom: '40px', lineHeight: '1.6' }}>
  Welcome to the Demo bot "{bot?.name}"! This use case is not live yet, however the same can be created as per the requirement.
  <br /><br />
  If you want, you can connect with the support team or share the requirement in the feedback box in the next screen once you click on the Finish button.
  <br /><br />
  Meanwhile, if you want to try our <strong style={{ color: '#00ffff' }}>Healthcare</strong> (5 bots) & <strong style={{ color: '#00ffff' }}>E-Commerce</strong> (1 bot) live demos, click below:
</p>

            <div style={{
              background: 'rgba(0, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              <h3 style={{ color: '#00ffff', fontSize: '20px', marginBottom: '20px', fontWeight: '600' }}>
                ✨ Try Our Live Bots Now
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(0, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '40px' }}>🏥</span>
                <div>
                  <strong style={{ color: '#00ffff', fontSize: '18px' }}>Healthcare</strong>
                  <span style={{ color: '#fff', marginLeft: '10px' }}>- 5 live bots available</span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a0a0b8' }}>
                    Appointments, Lab Tests, Heart Health, Kidney Care, Fertility
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                padding: '15px',
                background: 'rgba(0, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '40px' }}>🛒</span>
                <div>
                  <strong style={{ color: '#00ffff', fontSize: '18px' }}>E-Commerce</strong>
                  <span style={{ color: '#fff', marginLeft: '10px' }}>- 1 live bot available</span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a0a0b8' }}>
                    Order Tracking & Complaint Registration
                  </span>
                </div>
              </div>

              <button 
                onClick={onBack}
                style={{
                  marginTop: '20px',
                  width: '100%',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  color: '#0a0a1e',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ← Explore Live Bots
              </button>
            </div>

            <div style={{
              background: 'rgba(255, 136, 0, 0.1)',
              border: '2px solid rgba(255, 136, 0, 0.3)',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#ff8800', fontSize: '20px', marginBottom: '10px', fontWeight: '600' }}>
                📋 Need This Bot Configured?
              </h3>
              <p style={{ color: '#d0d0d8', fontSize: '16px', marginBottom: '20px' }}>
                Share your requirements and we'll create this bot for your use case.
              </p>
<button
  onClick={() => {
    setShowRequirementsForm(true);
    setTimeout(() => {
      document
        .getElementById('requirements-form-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }}
  style={{
    background: 'linear-gradient(135deg, #ff8800, #ff6600)',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  }}
>
  Share Requirements →
</button>


            </div>
          </div>
        </div>


      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.hero}
          >
            <h2 style={styles.instructionsTitle}>Welcome to Your AI Bot Demo</h2>
            <p style={styles.heroDesc}>
              Hi {user?.name || 'Guest'}! Please read the important points before starting your live demo: {bot?.name || 'this bot'}?
            </p>
          </motion.section>

          {!selectedOption && (
            <div style={styles.instructionsContainer}>
              <ul style={styles.instructionsList}>
                <li>✔ You will get a <b>15-minute</b> demo window.</li>
                <li>✔ Do <b>not refresh</b> or close the page during the session.</li>
                <li>✔ You can ask up to <b>10 messages</b> during the demo.</li>
                <li>✔ Responses are <b>fully-generative</b> but guided by limited demo data.</li>
                <li>✔ In full version, the bot can connect to your <b>internal systems, APIs, CRM, website, or database</b>.</li>
                <li>✔ This demo uses a <b>sample knowledge base</b> only.</li>
                <li>✔ Advanced automation, workflows, and memory are available in production bots.</li>
              </ul>

              <h3 style={styles.gdprTitle}>🔐 GDPR & Data Safety</h3>
              <p style={styles.gdprText}>
                • No demo conversation is used to train any AI model.<br />
                • All data is processed securely and auto-deleted after the session.<br />
                • You should avoid sharing personal, financial, or medical details.<br />
                • Your IP is used only to secure this session.
              </p>

              <button
                style={styles.startDemoButton}
                onClick={() => {
                  setSelectedOption('quick-start');
                  setTimeLeft(15 * 60);
                }}
              >
                ✔ I Agree & Start Demo
              </button>
            </div>
          )}

          {selectedOption === 'custom-demo' && (
            <CustomDemoForm 
              bot={bot}
              user={user}
              onBack={() => setSelectedOption(null)}
            />
          )}

          {selectedOption === 'quick-start' && !showFeedback && (
            <div style={styles.finalOverlay}>
              <div style={styles.finalDemoBox}>
                <div style={styles.demoHeader}>
                  <div style={styles.demoHeaderLeft}>
                    <div style={styles.botAvatarLarge}>{bot.icon}</div>
                    <div>
                      <h2 style={styles.demoHeaderTitle}>{bot?.name || 'Demo Bot'}</h2>
                      <p style={styles.demoHeaderSubtitle}>Quick Demo - AI Assistant</p>
                    </div>
                  </div>
                  <div style={styles.demoHeaderRight}>
                    <button
                      onClick={() => setShowSampleRecords(!showSampleRecords)}
                      style={{
                        padding: '12px 20px',
                        background: 'rgba(255, 136, 0, 0.15)',
                        border: '2px solid rgba(255, 136, 0, 0.5)',
                        borderRadius: '12px',
                        color: '#FF8800',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        animation: 'pulse 2s infinite'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>ℹ️</span>
                      <span>Sample Patient Records</span>
                    </button>

                    <div style={styles.timerBox}>
                      <span style={styles.timerIcon}>⏱️</span>
                      <span style={styles.timerText}>{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.demoBody}>
                  <div style={styles.messagesContainer}>
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        style={m.sender === 'bot' ? styles.messageWrapperBot : styles.messageWrapperUser}
                      >
                        {m.sender === 'bot' && (
                          <div style={styles.botAvatarSmall}>{bot.icon}</div>
                        )}
                        <div style={m.sender === 'bot' ? styles.messageBubbleBot : styles.messageBubbleUser}>
                          <p style={styles.messageText}>{m.text}</p>
                        </div>
                      </div>
                    ))}

                    {isSending && (
                      <div style={styles.messageWrapperBot}>
                        <div style={styles.botAvatarSmall}>{bot.icon}</div>
                        <div style={styles.typingIndicator}>
                          <span style={styles.typingDot}></span>
                          <span style={styles.typingDot}></span>
                          <span style={styles.typingDot}></span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {quickQuestions.length > 0 && !isSending && (
                    <div style={styles.quickQuestionsPanel}>
                      <p style={styles.quickQuestionsLabel}>Choose an option:</p>
                      <div style={styles.quickQuestionsList}>
                        {quickQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickQuestion(q.id, q.text)}
                            style={styles.quickQuestionBtn}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)'
                              e.target.style.color = '#fff'
                              e.target.style.transform = 'translateX(5px)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(0, 217, 255, 0.1)'
                              e.target.style.color = '#00D9FF'
                              e.target.style.transform = 'translateX(0)'
                            }}
                          >
                            <span style={styles.quickQuestionIcon}>→</span>
                            <span>{q.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.newFooterRow}>
                  <input
                    type="text"
                    placeholder="Type your message... (e.g., I need an appointment)"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSending) sendMessage();
                    }}
                    style={styles.newFooterInput}
                    disabled={isSending || timeLeft <= 0}
                  />

                  <button
                    onClick={sendMessage}
                    style={styles.newFooterSendBtn}
                    disabled={isSending || !userInput.trim() || timeLeft <= 0}
                  >
                    {isSending ? 'Sending...' : 'Send'}
                  </button>

                  <button
                    onClick={() => {
                      const confirmFinish = window.confirm("This will close the demo permanently. Are you sure?");
                      if (confirmFinish) setShowFeedback(true);
                    }}
                    style={styles.newFooterFinishBtn}
                  >
                    Finish Demo
                  </button>
                </div>
              </div>

              {showSampleRecords && (
                <div 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5000,
                    backdropFilter: 'blur(10px)'
                  }}
                  onClick={() => setShowSampleRecords(false)}
                >
                  <div 
                    style={{
                      background: 'linear-gradient(135deg, #0a0f24 0%, #1a1545 100%)',
                      border: '2px solid rgba(255, 136, 0, 0.5)',
                      borderRadius: '20px',
                      padding: '40px',
                      maxWidth: '700px',
                      width: '90%',
                      maxHeight: '80vh',
                      overflowY: 'auto',
                      position: 'relative'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '30px',
                      borderBottom: '2px solid rgba(255, 136, 0, 0.3)',
                      paddingBottom: '20px'
                    }}>
                      <h2 style={{ 
                        margin: 0, 
                        color: '#FF8800', 
                        fontSize: '28px', 
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '32px' }}>📋</span>
                        Sample Patient Records
                      </h2>
                      <button
                        onClick={() => setShowSampleRecords(false)}
                        style={{
                          background: 'rgba(255, 0, 0, 0.2)',
                          border: '2px solid rgba(255, 0, 0, 0.5)',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          color: '#ff6464',
                          fontSize: '24px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{
                      background: 'rgba(0, 217, 255, 0.1)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '25px'
                    }}>
                      <p style={{ 
                        margin: '0 0 10px 0', 
                        color: '#00D9FF', 
                        fontSize: '16px', 
                        fontWeight: '700' 
                      }}>
                        💡 How to Use:
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: '#94A3B8', 
                        fontSize: '14px', 
                        lineHeight: '1.6' 
                      }}>
                        1. Click any phone number below to copy it<br/>
                        2. Type in chat: <strong style={{ color: '#00D9FF' }}>"Check my report 9876543210"</strong><br/>
                        3. The bot will show pre-loaded test results for that patient
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {[
                        { phone: '9876543210', name: 'Aarav Patel', tests: '3 lab tests (CBC Normal, Lipid elevated, HbA1c pre-diabetic)' },
                        { phone: '9988776655', name: 'Diya Sharma', tests: '2 tests (Thyroid hypothyroidism, Vitamin D deficient)' },
                        { phone: '9123456789', name: 'Arjun Kumar', tests: '2 tests (LFT elevated, KFT normal)' }
                      ].map((record, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(255, 136, 0, 0.1)',
                            border: '2px solid rgba(255, 136, 0, 0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(record.phone)
                            alert(`✅ Copied: ${record.phone}`)
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ color: '#FF8800', fontWeight: '700', fontSize: '16px' }}>
                              Phone Number:
                            </span>
                            <span style={{ 
                              color: '#00D9FF', 
                              fontWeight: '700', 
                              fontSize: '20px',
                              fontFamily: 'monospace',
                              letterSpacing: '1px'
                            }}>
                              {record.phone}
                            </span>
                          </div>
                          <p style={{ margin: 0, color: '#CBD5E1', fontSize: '14px' }}>
                            <strong>{record.name}</strong> - {record.tests}
                          </p>
                          <p style={{ margin: '8px 0 0 0', color: '#94A3B8', fontSize: '12px', fontStyle: 'italic' }}>
                            💡 Click anywhere to copy
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {showFeedback && (
            <div style={styles.finalOverlay}>
              <div style={styles.feedbackBox}>
                <h2 style={styles.feedbackTitle}>🎉 Thank You for Testing!</h2>
                <p style={styles.feedbackText}>
                  How was your experience with {bot?.name}?
                </p>

                <div style={styles.feedbackButtons}>
                  {['Excellent', 'Good', 'Average', 'Poor'].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedFeedback(rating)}
                      style={{
                        ...styles.feedbackBtn,
                        background: selectedFeedback === rating 
                          ? 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)' 
                          : 'rgba(0, 217, 255, 0.1)',
                        color: selectedFeedback === rating ? '#fff' : '#00D9FF',
                        transform: selectedFeedback === rating ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {rating === 'Excellent' && '⭐'} 
                      {rating === 'Good' && '👍'} 
                      {rating === 'Average' && '😐'} 
                      {rating === 'Poor' && '👎'} 
                      {' '}{rating}
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Tell us more about your experience... (optional)"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  style={styles.feedbackTextarea}
                  rows={4}
                />

                <div style={styles.feedbackActions}>
                  <button
                    onClick={async () => {
                      try {
                        await fetch('https://inder20216.app.n8n.cloud/webhook/Details-feedback-support', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            action: 'support',
                            name: user?.name || 'Guest',
                            email: user?.email || '',
                            botName: bot?.name || '',
                            rating: selectedFeedback || 'Not provided',
                            comments: feedbackText || 'No comments',
                            timestamp: new Date().toISOString()
                          })
                        })
                        alert('📞 Our support team will contact you shortly!')
                      } catch (error) {
                        console.error('❌ Support request error:', error)
                        alert('❌ Failed to send support request. Please try again.')
                      }
                    }}
                    style={styles.supportButton}
                  >
                    📞 Connect with Support
                  </button>

                  <button
                    onClick={async () => {
                      if (!selectedFeedback) {
                        alert('⚠️ Please select a rating before submitting!')
                        return
                      }

                      setIsSendingFeedback(true)

                      try {
                        const response = await fetch('https://inder20216.app.n8n.cloud/webhook/Details-feedback-support', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            action: 'feedback',
                            name: user?.name || 'Guest',
                            email: user?.email || '',
                            botName: bot?.name || '',
                            rating: selectedFeedback,
                            comments: feedbackText || 'No comments',
                            timestamp: new Date().toISOString()
                          })
                        })

                        if (response.ok) {
                          alert('✅ Thank you for your feedback!')
                          setShowFeedback(false)
                          onBack()
                        } else {
                          alert('❌ Failed to submit feedback. Please try again.')
                        }
                      } catch (error) {
                        console.error('❌ Feedback submission error:', error)
                        alert('❌ Network error. Please try again.')
                      } finally {
                        setIsSendingFeedback(false)
                      }
                    }}
                    disabled={isSendingFeedback}
                    style={{
                      ...styles.doneButton,
                      opacity: isSendingFeedback ? 0.6 : 1,
                      cursor: isSendingFeedback ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSendingFeedback ? '⏳ Submitting...' : 'Done'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
     {showRequirementsForm ? (
  <div id="requirements-form-section">
    <RequirementsForm
      bot={bot}
      user={user}
      onBack={() => setShowRequirementsForm(false)}
    />
  </div>
) : null}


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
  },
  hero: {
    maxWidth: '800px',
    margin: '0 auto 60px',
    padding: '0 30px',
    textAlign: 'center',
  },
  instructionsTitle: {
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00D9FF, #0066FF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroDesc: {
    fontSize: '20px',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  instructionsContainer: {
    maxWidth: '750px',
    margin: '40px auto',
    padding: '40px',
    background: 'rgba(20, 27, 46, 0.8)',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '20px',
    textAlign: 'center',
    color: '#fff'
  },
  instructionsList: {
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: 1.7,
    marginBottom: '30px'
  },
  gdprTitle: {
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#00D9FF'
  },
  gdprText: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#cbe7ff',
    marginBottom: '30px'
  },
  startDemoButton: {
    marginTop: '20px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #00D9FF, #0066FF)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '700'
  },
  finalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(10, 15, 36, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
    backdropFilter: 'blur(10px)',
  },
  finalDemoBox: {
    width: '95%',
    maxWidth: '1400px',
    height: '90vh',
    background: 'linear-gradient(135deg, #0a0f24 0%, #1a1545 100%)',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    boxShadow: '0 0 80px rgba(0, 217, 255, 0.4)',
  },
  demoHeader: {
    padding: '25px 30px',
    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 217, 255, 0.2) 100%)',
    borderBottom: '2px solid rgba(0, 217, 255, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  demoHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  botAvatarLarge: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    boxShadow: '0 4px 16px rgba(0, 217, 255, 0.4)',
  },
  demoHeaderTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
  },
  demoHeaderSubtitle: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#94A3B8',
  },
  demoHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  timerBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    background: 'rgba(0, 217, 255, 0.15)',
    border: '2px solid rgba(0, 217, 255, 0.4)',
    borderRadius: '12px',
  },
  timerIcon: {
    fontSize: '20px',
  },
  timerText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#00D9FF',
    fontFamily: 'monospace',
  },
  demoBody: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: 'rgba(10, 15, 36, 0.6)',
  },
  messageWrapperBot: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    maxWidth: '75%',
  },
  messageWrapperUser: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    maxWidth: '75%',
    marginLeft: 'auto',
    flexDirection: 'row-reverse',
  },
  botAvatarSmall: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0, 217, 255, 0.3)',
  },
  messageBubbleBot: {
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(0, 217, 255, 0.15) 100%)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '16px 16px 16px 4px',
    boxShadow: '0 4px 12px rgba(0, 217, 255, 0.1)',
  },
  messageBubbleUser: {
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 217, 255, 0.2) 100%)',
    border: '1px solid rgba(0, 255, 136, 0.4)',
    borderRadius: '16px 16px 4px 16px',
    boxShadow: '0 4px 12px rgba(0, 255, 136, 0.1)',
  },
  messageText: {
    margin: 0,
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#E0E7FF',
    whiteSpace: 'pre-wrap',
  },
  typingIndicator: {
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(0, 217, 255, 0.15) 100%)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '16px 16px 16px 4px',
    display: 'flex',
    gap: '8px',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00D9FF',
    animation: 'typing 1.4s infinite',
  },
  quickQuestionsPanel: {
    width: '400px',
    background: 'rgba(20, 27, 46, 0.9)',
    borderLeft: '2px solid rgba(0, 217, 255, 0.3)',
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
  },
  quickQuestionsLabel: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#00D9FF',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  quickQuestionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  quickQuestionBtn: {
    padding: '18px 20px',
    background: 'rgba(0, 217, 255, 0.1)',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '12px',
    color: '#00D9FF',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  quickQuestionIcon: {
    fontSize: '18px',
    fontWeight: '700',
  },
  newFooterRow: {
    display: "flex",
    gap: "10px",
    padding: "12px 20px",
    background: "rgba(255,255,255,0.05)",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },
  newFooterInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.07)",
    color: "#fff",
    fontSize: "14px",
    outline: "none"
  },
  newFooterSendBtn: {
    padding: "12px 18px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  newFooterFinishBtn: {
    padding: "12px 18px",
    background: "linear-gradient(135deg,#00D9FF,#0066FF)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },
  feedbackBox: {
    width: '90%',
    maxWidth: '700px',
    background: 'rgba(20, 27, 46, 0.98)',
    borderRadius: '24px',
    padding: '50px 40px',
    textAlign: 'center',
    border: '2px solid rgba(0, 217, 255, 0.4)',
  },
  feedbackTitle: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
  },
  feedbackText: {
    fontSize: '18px',
    color: '#94A3B8',
    marginBottom: '35px',
    lineHeight: '1.6',
  },
  feedbackButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  feedbackBtn: {
    padding: '16px',
    background: 'rgba(0, 217, 255, 0.1)',
    border: '2px solid rgba(0, 217, 255, 0.4)',
    borderRadius: '12px',
    color: '#00D9FF',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  feedbackTextarea: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(10, 15, 36, 0.6)',
    color: '#E0E7FF',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    marginBottom: '30px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  feedbackActions: {
    display: 'flex',
    gap: '15px',
  },
  supportButton: {
    flex: 1,
    padding: '16px',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8800 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  doneButton: {
    flex: 1,
    padding: '16px',
    background: 'linear-gradient(135deg, #0066FF, #00D9FF)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
}

export default DemoChoicePage