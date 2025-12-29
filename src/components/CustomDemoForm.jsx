import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Link, FileText, HelpCircle, CheckCircle, ArrowLeft, Send } from 'lucide-react'

function CustomDemoForm({ bot, user, onBack }) {
  const [currentStep, setCurrentStep] = useState(1) // 1: Choose method, 2: Upload, 3: Confirmation
  const [knowledgeMethod, setKnowledgeMethod] = useState(null) // 'documents', 'website', 'text', 'faq'
  
  // Upload states
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [directText, setDirectText] = useState('')
  const [faqFile, setFaqFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles([...uploadedFiles, ...files])
  }

  // Remove uploaded file
  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  // Submit knowledge base
  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Create FormData
    const formData = new FormData()
    formData.append('userName', user.name)
    formData.append('userEmail', user.email)
    formData.append('botName', bot.name)
    formData.append('botIndustry', bot.industry || 'Healthcare')
    formData.append('knowledgeMethod', knowledgeMethod)

    // Add knowledge based on method
    if (knowledgeMethod === 'documents') {
      uploadedFiles.forEach(file => {
        formData.append('documents', file)
      })
    } else if (knowledgeMethod === 'website') {
      formData.append('websiteUrl', websiteUrl)
    } else if (knowledgeMethod === 'text') {
      formData.append('directText', directText)
    } else if (knowledgeMethod === 'faq') {
      formData.append('faqFile', faqFile)
    }

    try {
      // TODO: Replace with your actual backend endpoint
      const response = await fetch('https://your-backend-api.com/create-custom-bot', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSubmissionComplete(true)
        setCurrentStep(3)
      } else {
        alert('❌ Error creating bot. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('❌ Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Progress Indicator */}
      <div style={styles.progressBar}>
        <div style={{...styles.progressStep, ...(currentStep >= 1 ? styles.progressStepActive : {})}}>
          <div style={styles.progressNumber}>1</div>
          <p style={styles.progressLabel}>Choose Method</p>
        </div>
        <div style={styles.progressLine}></div>
        <div style={{...styles.progressStep, ...(currentStep >= 2 ? styles.progressStepActive : {})}}>
          <div style={styles.progressNumber}>2</div>
          <p style={styles.progressLabel}>Upload Knowledge</p>
        </div>
        <div style={styles.progressLine}></div>
        <div style={{...styles.progressStep, ...(currentStep >= 3 ? styles.progressStepActive : {})}}>
          <div style={styles.progressNumber}>3</div>
          <p style={styles.progressLabel}>Confirmation</p>
        </div>
      </div>

      {/* Step 1: Choose Knowledge Method */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.stepContainer}
        >
          <h2 style={styles.stepTitle}>How would you like to provide your knowledge base?</h2>
          <p style={styles.stepSubtitle}>Choose the method that works best for you</p>

          <div style={styles.methodsGrid}>
            {/* Method 1: Documents */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => {
                setKnowledgeMethod('documents')
                setCurrentStep(2)
              }}
              style={styles.methodCard}
            >
              <Upload size={40} color="#00D9FF" />
              <h3 style={styles.methodTitle}>📄 Upload Documents</h3>
              <p style={styles.methodDesc}>PDF, DOCX, TXT files</p>
              <p style={styles.methodExample}>Example: Product catalogs, FAQs, policies</p>
            </motion.div>

            {/* Method 2: Website */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => {
                setKnowledgeMethod('website')
                setCurrentStep(2)
              }}
              style={styles.methodCard}
            >
              <Link size={40} color="#00FF88" />
              <h3 style={{...styles.methodTitle, color: '#00FF88'}}>🔗 Website URL</h3>
              <p style={styles.methodDesc}>We'll scrape your website</p>
              <p style={styles.methodExample}>Example: yourcompany.com</p>
            </motion.div>

            {/* Method 3: Direct Text */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => {
                setKnowledgeMethod('text')
                setCurrentStep(2)
              }}
              style={styles.methodCard}
            >
              <FileText size={40} color="#FF6B00" />
              <h3 style={{...styles.methodTitle, color: '#FF6B00'}}>📝 Paste Text</h3>
              <p style={styles.methodDesc}>Copy-paste your content</p>
              <p style={styles.methodExample}>Example: FAQs, policies, scripts</p>
            </motion.div>

            {/* Method 4: FAQ */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => {
                setKnowledgeMethod('faq')
                setCurrentStep(2)
              }}
              style={styles.methodCard}
            >
              <HelpCircle size={40} color="#8B5CF6" />
              <h3 style={{...styles.methodTitle, color: '#8B5CF6'}}>❓ FAQ File</h3>
              <p style={styles.methodDesc}>CSV/Excel with Q&A</p>
              <p style={styles.methodExample}>Format: Question | Answer</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Upload Knowledge */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.stepContainer}
        >
          <h2 style={styles.stepTitle}>
            {knowledgeMethod === 'documents' && '📄 Upload Your Documents'}
            {knowledgeMethod === 'website' && '🔗 Enter Your Website URL'}
            {knowledgeMethod === 'text' && '📝 Paste Your Content'}
            {knowledgeMethod === 'faq' && '❓ Upload FAQ File'}
          </h2>

          <div style={styles.uploadArea}>
            {/* Documents Upload */}
            {knowledgeMethod === 'documents' && (
              <div>
                <label style={styles.fileInputLabel}>
                  <Upload size={48} color="#00D9FF" />
                  <p>Click to upload or drag and drop</p>
                  <p style={styles.fileInputHint}>PDF, DOCX, TXT (Max 10 files, 50MB total)</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    style={styles.fileInput}
                  />
                </label>

                {uploadedFiles.length > 0 && (
                  <div style={styles.filesList}>
                    <p style={styles.filesListTitle}>Uploaded Files ({uploadedFiles.length}):</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} style={styles.fileItem}>
                        <span>📄 {file.name}</span>
                        <button onClick={() => removeFile(index)} style={styles.removeFileBtn}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Website URL */}
            {knowledgeMethod === 'website' && (
              <div>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  style={styles.textInput}
                />
                <p style={styles.inputHint}>
                  💡 We'll extract content from your website automatically
                </p>
              </div>
            )}

            {/* Direct Text */}
            {knowledgeMethod === 'text' && (
              <div>
                <textarea
                  placeholder="Paste your FAQs, policies, or any text content here..."
                  value={directText}
                  onChange={(e) => setDirectText(e.target.value)}
                  rows={12}
                  style={styles.textarea}
                />
                <p style={styles.inputHint}>
                  💡 Character count: {directText.length} / 50,000
                </p>
              </div>
            )}

            {/* FAQ File */}
            {knowledgeMethod === 'faq' && (
              <div>
                <label style={styles.fileInputLabel}>
                  <HelpCircle size={48} color="#8B5CF6" />
                  <p>Upload FAQ file (CSV or Excel)</p>
                  <p style={styles.fileInputHint}>Format: Question | Answer</p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setFaqFile(e.target.files[0])}
                    style={styles.fileInput}
                  />
                </label>

                {faqFile && (
                  <div style={styles.filesList}>
                    <div style={styles.fileItem}>
                      <span>📊 {faqFile.name}</span>
                      <button onClick={() => setFaqFile(null)} style={styles.removeFileBtn}>✕</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              onClick={() => setCurrentStep(1)}
              style={styles.backBtn}
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || 
                (knowledgeMethod === 'documents' && uploadedFiles.length === 0) ||
                (knowledgeMethod === 'website' && !websiteUrl.trim()) ||
                (knowledgeMethod === 'text' && !directText.trim()) ||
                (knowledgeMethod === 'faq' && !faqFile)
              }
              style={{
                ...styles.submitBtn,
                opacity: isSubmitting || 
                  (knowledgeMethod === 'documents' && uploadedFiles.length === 0) ||
                  (knowledgeMethod === 'website' && !websiteUrl.trim()) ||
                  (knowledgeMethod === 'text' && !directText.trim()) ||
                  (knowledgeMethod === 'faq' && !faqFile) ? 0.5 : 1
              }}
            >
              {isSubmitting ? '⏳ Creating Bot...' : 'Create My Custom Bot →'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && submissionComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.confirmationContainer}
        >
          <CheckCircle size={80} color="#00FF88" />
          <h2 style={styles.confirmationTitle}>🎉 Bot Creation Started!</h2>
          <p style={styles.confirmationText}>
            Your custom {bot.name} is being prepared with your knowledge base.
          </p>

          <div style={styles.confirmationDetails}>
            <div style={styles.detailRow}>
              <span>📧 Email:</span>
              <strong>{user.email}</strong>
            </div>
            <div style={styles.detailRow}>
              <span>🤖 Bot:</span>
              <strong>{bot.name}</strong>
            </div>
            <div style={styles.detailRow}>
              <span>📚 Knowledge:</span>
              <strong>
                {knowledgeMethod === 'documents' && `${uploadedFiles.length} documents`}
                {knowledgeMethod === 'website' && 'Website content'}
                {knowledgeMethod === 'text' && 'Direct text input'}
                {knowledgeMethod === 'faq' && 'FAQ file'}
              </strong>
            </div>
            <div style={styles.detailRow}>
              <span>⏱️ Ready in:</span>
              <strong>15-30 minutes</strong>
            </div>
          </div>

          <div style={styles.confirmationInfo}>
            <p>📬 <strong>You'll receive an email with:</strong></p>
            <ul style={styles.confirmationList}>
              <li>✅ Your custom bot demo link</li>
              <li>✅ Instructions to test it</li>
              <li>✅ Next steps for full deployment</li>
            </ul>
          </div>

          <div style={styles.dataPrivacy}>
            <p>🔒 <strong>Your Data Privacy:</strong></p>
            <p style={styles.privacyText}>
              All uploaded data is encrypted and will be automatically deleted after 7 days. 
              We never share your information with third parties.
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            style={styles.doneButton}
          >
            Done
          </button>
        </motion.div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 30px',
  },
  backButton: {
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
    marginBottom: '30px',
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.4,
  },
  progressStepActive: {
    opacity: 1,
  },
  progressNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0, 217, 255, 0.2)',
    border: '2px solid #00D9FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00D9FF',
    fontWeight: '700',
    fontSize: '18px',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '12px',
    color: '#94A3B8',
    margin: 0,
  },
  progressLine: {
    width: '80px',
    height: '2px',
    background: 'rgba(0, 217, 255, 0.2)',
    margin: '0 20px 20px',
  },
  stepContainer: {
    background: 'rgba(20, 27, 46, 0.8)',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '20px',
    padding: '40px',
  },
  stepTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '12px',
  },
  stepSubtitle: {
    fontSize: '16px',
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: '40px',
  },
  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  methodCard: {
    background: 'rgba(0, 217, 255, 0.05)',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '16px',
    padding: '30px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  methodTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#00D9FF',
    margin: '15px 0 8px',
  },
  methodDesc: {
    fontSize: '14px',
    color: '#94A3B8',
    marginBottom: '8px',
  },
  methodExample: {
    fontSize: '12px',
    color: '#64748B',
    fontStyle: 'italic',
  },
  uploadArea: {
    marginBottom: '30px',
  },
  fileInputLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
    border: '2px dashed rgba(0, 217, 255, 0.4)',
    borderRadius: '12px',
    background: 'rgba(0, 217, 255, 0.03)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#fff',
  },
  fileInput: {
    display: 'none',
  },
  fileInputHint: {
    fontSize: '13px',
    color: '#94A3B8',
    marginTop: '8px',
  },
  textInput: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    background: 'rgba(0, 217, 255, 0.05)',
    color: '#fff',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    background: 'rgba(0, 217, 255, 0.05)',
    color: '#fff',
    fontSize: '15px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  inputHint: {
    fontSize: '13px',
    color: '#94A3B8',
    marginTop: '12px',
  },
  filesList: {
    marginTop: '20px',
  },
  filesListTitle: {
    fontSize: '14px',
    color: '#00D9FF',
    fontWeight: '600',
    marginBottom: '12px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(0, 217, 255, 0.1)',
    borderRadius: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#fff',
  },
  removeFileBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ff6464',
    cursor: 'pointer',
    fontSize: '18px',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: '14px 28px',
    background: 'transparent',
    border: '1px solid #00D9FF',
    borderRadius: '10px',
    color: '#00D9FF',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #00FF88 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  confirmationContainer: {
    background: 'rgba(20, 27, 46, 0.8)',
    border: '2px solid rgba(0, 255, 136, 0.4)',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
  },
  confirmationTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#00FF88',
    margin: '20px 0 16px',
  },
  confirmationText: {
    fontSize: '18px',
    color: '#94A3B8',
    marginBottom: '40px',
  },
  confirmationDetails: {
    background: 'rgba(0, 217, 255, 0.05)',
    border: '1px solid rgba(0, 217, 255, 0.2)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'left',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '15px',
  },
  confirmationInfo: {
    background: 'rgba(0, 255, 136, 0.05)',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'left',
    color: '#fff',
  },
  confirmationList: {
    margin: '12px 0',
    paddingLeft: '20px',
    lineHeight: '2',
  },
  dataPrivacy: {
    background: 'rgba(139, 92, 246, 0.05)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'left',
    color: '#fff',
  },
  privacyText: {
    fontSize: '14px',
    color: '#94A3B8',
    lineHeight: '1.6',
    margin: '8px 0 0 0',
  },
  doneButton: {
    padding: '16px 48px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
  },
}

export default CustomDemoForm