import { Link } from 'react-router-dom'
import { Globe, Share2, MessageSquare, Mail, Newspaper } from 'lucide-react'

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for subscribing to CricketHK!')
    e.target.reset()
  }

  return (
    <footer className="footer-bg">
      <div className="footer-container">
        {/* Brand column */}
        <div className="footer-brand">
          <Link to="/" className="logo-container">
            <div className="logo-icon">
              <Newspaper size={20} />
            </div>
            <span className="footer-logo-text">Cricket<span>HK</span></span>
          </Link>
          <p className="footer-desc">
            Your premium destination for the latest cricket news, team squad updates, trade rumors, match analysis, and exclusive insights from the cricketing world.
          </p>
        </div>

        {/* Quick Links column */}
        <div className="footer-nav">
          <h4 className="footer-nav-title">Quick Links</h4>
          <Link to="/" className="footer-nav-link">Home</Link>
          <Link to="/squad" className="footer-nav-link">India vs Afghanistan Squad</Link>
          <Link to="/trade-rumors" className="footer-nav-link">Hardik Pandya Trade Rumors</Link>
        </div>

        {/* Social and newsletter column */}
        <div className="footer-social">
          <h4 className="footer-social-title">Stay Connected</h4>
          <p className="footer-desc" style={{ marginBottom: '10px' }}>
            Subscribe to get breaking news updates and exclusive articles delivered straight to your inbox.
          </p>
          
          <div className="footer-social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter">
              <Share2 size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
              <MessageSquare size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
              <Globe size={18} />
            </a>
            <a href="mailto:info@crickethk.com" className="footer-social-icon" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CricketHK News. All rights reserved.</p>
        <p>Built with React & Vite. Powered by Vercel.</p>
      </div>
    </footer>
  )
}
