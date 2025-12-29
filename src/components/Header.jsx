import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Header({ currentPage, setCurrentPage, user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate();


  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Animated Logo */}
        <div style={styles.logoContainer} onClick={() => {
          setCurrentPage('home');
          navigate('/');
        }}>
          {/* Animated Background Circle */}
          <div style={styles.logoGlow} className="logo-pulse" />
          
          {/* Logo Image - Larger and clearer */}
          <img 
            src="/logo.png"  
            style={styles.logoImage}
          />
          
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <a 
            onClick={() => {
              setCurrentPage('home');
              navigate('/');
            }}
            style={{
              ...styles.navLink,
              ...(currentPage === 'home' ? styles.navLinkActive : {})
            }}
          >
            Ai Home
          </a>
          <a 
            onClick={() => {
              setCurrentPage('about');
              navigate('/about');
            }}
            style={{
              ...styles.navLink,
              ...(currentPage === 'about' ? styles.navLinkActive : {})
            }}
          >
            About
          </a>
          <a 
            onClick={() => {
              setCurrentPage('tutorial');
              navigate('/tutorial');
            }}
            style={{
              ...styles.navLink,
              ...(currentPage === 'tutorial' ? styles.navLinkActive : {})
            }}
          >
            Tutorial
          </a>
          <a 
            onClick={() => {
              setCurrentPage('contact');
              navigate('/contact');
            }}
            style={{
              ...styles.navLink,
              ...(currentPage === 'contact' ? styles.navLinkActive : {})
            }}
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons */}
        <div style={styles.authButtons}>
          {user ? (
            <>
              <span style={styles.userName}>Hi, {user.name}</span>
              <button onClick={onLogout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button style={styles.loginButton}>Login</button>
              <button style={styles.signupButton}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(10, 15, 28, 0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 217, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
    height: '80px',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.3s ease',
    height: '60px',
  },
  logoGlow: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 217, 255, 0.6) 0%, rgba(124, 58, 237, 0.4) 50%, transparent 70%)',
    filter: 'blur(25px)',
    zIndex: 0,
    left: '25%',
    top: '25%',
    transform: 'translate(-50%, -50%)',
  },
  logoImage: {
    width: '170px',
    height: '100px',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    filter: 'brightness(1.4) contrast(1.4) drop-shadow(0 0 25px rgba(0, 217, 255, 1))',
    transition: 'transform 0.3s ease',
  },
  nav: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  navLink: {
    color: '#94A3B8',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  navLinkActive: {
    color: '#00D9FF',
    background: 'rgba(0, 217, 255, 0.1)',
  },
  authButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  userName: {
    color: '#00D9FF',
    fontSize: '14px',
    fontWeight: '500',
  },
  loginButton: {
    padding: '10px 24px',
    background: 'transparent',
    border: '2px solid #00D9FF',
    borderRadius: '8px',
    color: '#00D9FF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  signupButton: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(0, 102, 255, 0.4)',
    transition: 'all 0.3s ease',
  },
  logoutButton: {
    padding: '10px 24px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '2px solid #EF4444',
    borderRadius: '8px',
    color: '#EF4444',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

export default Header