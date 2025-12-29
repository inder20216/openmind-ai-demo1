import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

function RequirementsForm({ bot, user, onBack }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
    requirements: '',
    timeline: '',
    budget: ''
  })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.requirements.trim()) {
      alert('⚠️ Please describe your requirements')
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('https://inder20216.app.n8n.cloud/webhook/Details-feedback-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'support',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          botName: bot?.name || 'Custom Bot',
          rating: 'Requirement Request',
          comments: `Company: ${formData.company}\n\nRequirements: ${formData.requirements}\n\nTimeline: ${formData.timeline}\n\nBudget: ${formData.budget}`,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        alert('✅ Thank you! Our team will contact you within 24 hours.')
        onBack()
      } else {
        alert('❌ Failed to send request. Please try again.')
      }
    } catch (error) {
      console.error('❌ Error:', error)
      alert('❌ Network error. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div style={styles.formContainer}>
        <div style={styles.header}>
          <div style={styles.botIcon}>{bot?.icon || '🤖'}</div>
          <h1 style={styles.title}>Share Your Requirements</h1>
          <p style={styles.subtitle}>
            Tell us what you need for <strong>{bot?.name}</strong> and we'll create a custom solution for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
              placeholder="John Doe"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
              placeholder="john@company.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={styles.input}
              placeholder="+91 98765 43210"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Company Name</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={styles.input}
              placeholder="Your Company Pvt Ltd"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Describe Your Requirements *</label>
            <textarea
              required
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              style={styles.textarea}
              placeholder="Tell us what features you need, what problems you're trying to solve, and any specific use cases..."
              rows={6}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Expected Timeline</label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              style={styles.input}
            >
              <option value="">Select timeline</option>
              <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
              <option value="Soon (1 month)">Soon (1 month)</option>
              <option value="Flexible (2-3 months)">Flexible (2-3 months)</option>
              <option value="Exploring options">Exploring options</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Budget Range</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              style={styles.input}
            >
              <option value="">Select budget range</option>
              <option value="Under ₹50,000">Under ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
              <option value="Above ₹2,50,000">Above ₹2,50,000</option>
              <option value="To be discussed">To be discussed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSending}
            style={{
              ...styles.submitButton,
              opacity: isSending ? 0.6 : 1,
              cursor: isSending ? 'not-allowed' : 'pointer'
            }}
          >
            {isSending ? '⏳ Sending...' : '📤 Submit Requirements'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0f24 0%, #1a1545 50%, #0a0f24 100%)',
    padding: '100px 20px 80px',
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
  formContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    background: 'rgba(20, 27, 46, 0.95)',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '20px',
    padding: '50px 40px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  botIcon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#00D9FF',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 16px',
    background: 'rgba(10, 15, 36, 0.6)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  textarea: {
    padding: '14px 16px',
    background: 'rgba(10, 15, 36, 0.6)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    marginTop: '16px',
    padding: '18px 32px',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

export default RequirementsForm