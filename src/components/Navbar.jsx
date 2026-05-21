import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Newspaper, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <nav className="navbar">
        <NavLink id="nav-logo" to="/" className="logo-container" onClick={closeMobileMenu}>
          <div className="logo-icon">
            <Newspaper size={24} />
          </div>
          <span className="logo-text">Cricket<span>HK</span></span>
        </NavLink>

        {/* Desktop Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink 
            id="nav-home"
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            id="nav-squad"
            to="/squad" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            India vs Afg Squad
          </NavLink>
          <NavLink 
            id="nav-trade"
            to="/trade-rumors" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Pandya Trade Rumors
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          id="mobile-nav-toggle"
          className="mobile-menu-btn" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </header>
  )
}
