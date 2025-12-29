function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Vision Statement */}
        <div style={styles.visionSection}>
       
          
          <h2 style={styles.visionTitle}>Our Vision</h2>
          <p style={styles.visionText}>
            To revolutionize business automation by making intelligent AI assistants accessible to every industry. 
            We believe in a future where AI handles repetitive tasks, allowing humans to focus on creativity, 
            strategy, and meaningful connections.
          </p>
        </div>

        {/* Future Goals */}
        <div style={styles.goalsSection}>
          <h3 style={styles.sectionTitle}>What We're Building</h3>
          <div style={styles.goalsList}>
            <div className="goal-item" style={styles.goalItem}>
              <span style={styles.goalIcon}>🌍</span>
              <div>
                <h4 style={styles.goalTitle}>Global Reach</h4>
                <p style={styles.goalDesc}>AI assistants in 100+ languages, serving businesses worldwide</p>
              </div>
            </div>
            
            <div className="goal-item" style={styles.goalItem}>
              <span style={styles.goalIcon}>🤖</span>
              <div>
                <h4 style={styles.goalTitle}>Industry-Specific Intelligence</h4>
                <p style={styles.goalDesc}>Specialized AI trained for every business vertical</p>
              </div>
            </div>
            
            <div className="goal-item" style={styles.goalItem}>
              <span style={styles.goalIcon}>🔗</span>
              <div>
                <h4 style={styles.goalTitle}>Universal Integration</h4>
                <p style={styles.goalDesc}>Connect with any platform, tool, or system seamlessly</p>
              </div>
            </div>
            

          </div>
        </div>

        {/* Bottom */}
        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © {currentYear} Open Mind Services Limited • Built with passion in India 🇮🇳
          </p>
          <p style={styles.tagline}>
            Making AI work for humans, not the other way around.
          </p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'linear-gradient(180deg, rgba(10, 10, 30, 0.95) 0%, rgba(5, 5, 20, 0.98) 100%)',
    borderTop: '2px solid rgba(0, 255, 255, 0.2)',
    padding: '80px 0 40px',
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 30px'
  },
  visionSection: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '30px'
  },
  logoIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#0a0a1e',
    animation: 'glow 2s ease-in-out infinite'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#00ffff',
    margin: 0
  },
  visionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#00ffff',
    marginBottom: '20px',
    textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
  },
  visionText: {
    fontSize: '18px',
    color: '#c0c0d8',
    lineHeight: '1.8',
    maxWidth: '900px',
    margin: '0 auto'
  },
  goalsSection: {
    marginBottom: '60px'
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: '40px'
  },
  goalsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px'
  },
  goalItem: {
    display: 'flex',
    gap: '20px',
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '25px',
    transition: 'all 0.3s ease'
  },
  goalIcon: {
    fontSize: '40px',
    flexShrink: 0
  },
  goalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#00ffff',
    marginBottom: '8px'
  },
  goalDesc: {
    fontSize: '14px',
    color: '#a0a0b8',
    lineHeight: '1.5'
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '40px',
    borderTop: '1px solid rgba(0, 255, 255, 0.1)'
  },
  copyright: {
    fontSize: '14px',
    color: '#808090',
    marginBottom: '10px'
  },
  tagline: {
    fontSize: '16px',
    color: '#00ffff',
    fontStyle: 'italic'
  }
}

export default Footer