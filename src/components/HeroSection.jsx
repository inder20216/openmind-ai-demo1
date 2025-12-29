import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, Sparkles } from 'lucide-react'
import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'

function HeroSection() {
  const { scrollY } = useScroll()
  
  // Fade out and move up as user scrolls down
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useTransform(scrollY, [0, 400], [0, -50])

  return (
    <motion.section style={{ ...styles.hero, opacity, y }}>
       {/* Video Background - ADD THIS */}
    <div style={styles.videoBackground}>
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        style={styles.videoElement}
      >
        <source src="/videos/bot_bg.mp4" type="video/mp4" />
      </video>
      <div style={styles.videoOverlay}></div>
    </div>
      {/* Animated Background Gradient */}
      <div style={styles.backgroundGradient} className="gradient-animate" />
      
      {/* Animated Circles */}
      <div style={styles.circle1} className="float" />
      <div style={styles.circle2} className="float" />
      
      {/* Content */}
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.content}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={styles.badge}
            className="fade-in delay-200"
          >
            <Sparkles size={16} style={{ color: colors.secondary }} />
            <span>Born from 20 Years of Support Challenges</span>
          </motion.div>

          {/* Main Headline */}
          <h1 style={styles.headline}>
            <span style={styles.gradientText}>We Lived Your Pain. We Built Your Solution.</span>
        
            <TypeAnimation
              sequence={[
                'for Healthcare',
                2000,
                'for E-Commerce',
                2000,
                'for Finance',
                2000,
                'for Hospitality',
                2000,
                'for Your Business',
                2000,
              ]}
              wrapper="span"
              speed={50}
              style={styles.typingText}
              repeat={Infinity}
            />
          </h1>

          {/* Subheadline */}
          <p style={styles.subheadline}>
            We have spent two decades solving customer support challenges across industries. Now we built the AI platform that does it instantly, accurately, and 24/7.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

const styles = {
hero: {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0a0f24 0%, #1a1545 50%, #0a0f24 100%)',
  paddingTop: '120px',
  paddingBottom: '80px',  // ✅ ADD THIS LINE
},
backgroundGradient: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(circle at 30% 50%, rgba(0, 217, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
  backgroundSize: '200% 200%',
  zIndex: 2,  // ← ADD THIS LINE
  },
  circle1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
    filter: 'blur(60px)',
    zIndex: 0,
  },
  circle2: {
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
    filter: 'blur(60px)',
    zIndex: 0,
    animationDelay: '1s',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.lg}`,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xl,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.lg}`,
    background: 'rgba(0, 217, 255, 0.1)',
    border: `1px solid ${colors.secondary}`,
    borderRadius: borderRadius.full,
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
  },
  headline: {
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    fontFamily: typography.heading,
  },
  gradientText: {
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 50%, #7C3AED 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  typingText: {
    display: 'block',
    marginTop: spacing.md,
    fontSize: typography.fontSize['5xl'],
    background: 'linear-gradient(90deg, #00D9FF 0%, #00FF88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: typography.fontWeight.extrabold,
  },
  subheadline: {
    fontSize: typography.fontSize.xl,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed,
    maxWidth: '800px',
    margin: 0,
  },
  ctaContainer: {
    display: 'flex',
    gap: spacing.lg,
    marginTop: spacing.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.lg} ${spacing['2xl']}`,
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    color: colors.textPrimary,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: typography.body,
    boxShadow: '0 0 30px rgba(0, 102, 255, 0.5)',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    padding: `${spacing.lg} ${spacing['2xl']}`,
    background: 'transparent',
    color: colors.secondary,
    border: `2px solid ${colors.secondary}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: typography.body,
    transition: 'all 0.3s ease',
  },
  trustBadges: {
    display: 'flex',
    gap: spacing['3xl'],
    marginTop: spacing['2xl'],
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  trustItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trustNumber: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.extrabold,
    background: 'linear-gradient(135deg, #00D9FF 0%, #00FF88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  trustLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  videoBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
},
videoElement: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
},
videoOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(10, 15, 36, 0.75)',
  zIndex: 1,
},
}

export default HeroSection