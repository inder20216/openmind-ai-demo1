import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Clock, DollarSign, Shield, Users, Rocket } from 'lucide-react'

function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Setup',
      description: 'Deploy your AI bot in minutes, not months. No coding required.',
      color: '#00D9FF',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a customer query. Your bot works round the clock.',
      color: '#0066FF',
    },
    {
      icon: DollarSign,
      title: 'Save 60% on Costs',
      description: 'Reduce support costs dramatically while improving service quality.',
      color: '#00FF88',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption. Your data stays private and secure.',
      color: '#7C3AED',
    },
    {
      icon: Users,
      title: 'Multi-Language Support',
      description: 'Serve customers globally in 50+ languages automatically.',
      color: '#FF6B6B',
    },
    {
      icon: Rocket,
      title: 'Scales With You',
      description: 'Handle 10 or 10,000 conversations simultaneously.',
      color: '#FFD93D',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section style={styles.section} ref={ref}>
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <h2 style={styles.title}>Why Build Bots With Us?</h2>
          <p style={styles.subtitle}>
            We have combined 18 years of support expertise with cutting-edge AI to create the most powerful, 
            yet simple chatbot platform for businesses.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={styles.grid}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={styles.card}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 20px 60px ${feature.color}40`,
              }}
            >
              <div style={{...styles.iconContainer, background: `${feature.color}20`}}>
                <feature.icon size={32} color={feature.color} />
              </div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    padding: '100px 0',
    background: 'linear-gradient(180deg, #0a0f24 0%, #1a1545 50%, #0a0f24 100%)',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 30px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#94A3B8',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    background: 'rgba(20, 27, 46, 0.8)',
    border: '1px solid rgba(0, 217, 255, 0.2)',
    borderRadius: '16px',
    padding: '40px 30px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  iconContainer: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: '16px',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
}

export default FeaturesSection