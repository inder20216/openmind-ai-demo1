import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/animations.css'
import App from './App.jsx'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

// Override browser alert globally - converts ALL alerts to toast notifications
window.alert = function (message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(135deg, #00ffff, #8000ff)",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      padding: "16px 24px",
      boxShadow: "0 8px 24px rgba(0, 255, 255, 0.3)"
    }
  }).showToast();
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)