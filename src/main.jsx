import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"   // ★ Added for routing
import './styles/animations.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>        {/* ★ Wrap App in Router */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
