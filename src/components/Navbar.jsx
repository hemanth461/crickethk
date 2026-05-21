import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Newspaper, Menu, X, ChevronRight } from 'lucide-react'
import { client } from '../sanityClient'

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [latestPosts, setLatestPosts] = useState([])

  useEffect(() => {
    async function fetchLatest() {
      try {
        // Fetch the top 3 posts to determine:
        // posts[0] is current breaking news (hero)
        // posts[1] and posts[2] are previous breaking news (navbar)
        const query = `*[_type == "post"] | order(publishedAt desc)[0..2] {
          _id,
          title,
          slug
        }`
        const fetched = await client.fetch(query)
        if (fetched) {
          setLatestPosts(fetched)
        }
      } catch (e) {
        console.error("Error fetching latest posts for navbar:", e)
      }
    }
    fetchLatest()
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  const truncateTitle = (title, maxLen = 22) => {
    if (!title) return ''
    if (title.length <= maxLen) return title
    return title.slice(0, maxLen).trim() + '...'
  }

  // Determine top links
  // If Sanity has posts, use posts[1] and posts[2]
  // If Sanity is empty/loading, use mock items
  const hasPosts = latestPosts.length > 0
  let link1 = null
  let link2 = null

  if (hasPosts) {
    if (latestPosts.length === 1) {
      // Only 1 post in Sanity, show it as first link
      link1 = {
        title: truncateTitle(latestPosts[0].title),
        to: `/news/${latestPosts[0].slug.current}`,
        id: "nav-dynamic-1"
      }
      // Fallback for second link
      link2 = {
        title: "India vs Afg Squad",
        to: "/squad",
        id: "nav-squad"
      }
    } else {
      // At least 2 posts. Link 1 is posts[1] (previously appeared breaking news)
      link1 = {
        title: truncateTitle(latestPosts[1].title),
        to: `/news/${latestPosts[1].slug.current}`,
        id: "nav-dynamic-1"
      }
      if (latestPosts.length >= 3) {
        // Link 2 is posts[2] (breaking news prior to that)
        link2 = {
          title: truncateTitle(latestPosts[2].title),
          to: `/news/${latestPosts[2].slug.current}`,
          id: "nav-dynamic-2"
        }
      } else {
        // Fallback for link 2
        link2 = {
          title: "India vs Afg Squad",
          to: "/squad",
          id: "nav-squad"
        }
      }
    }
  } else {
    // Fallbacks if no posts in Sanity yet
    link1 = {
      title: "India vs Afg Squad",
      to: "/squad",
      id: "nav-squad"
    }
    link2 = {
      title: "Pandya Trade Rumors",
      to: "/trade-rumors",
      id: "nav-trade"
    }
  }

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="navbar-left">
            {/* Three-line bar button (Hamburger menu) */}
            <button 
              id="sidebar-toggle-btn"
              className="sidebar-toggle-btn" 
              onClick={toggleSidebar}
              aria-label="Toggle navigation drawer"
            >
              <Menu size={24} />
            </button>
            
            <NavLink id="nav-logo" to="/" className="logo-container" onClick={closeSidebar}>
              <div className="logo-icon">
                <Newspaper size={24} />
              </div>
              <span className="logo-text">Cricket<span>HK</span></span>
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="nav-links">
            <NavLink 
              id="nav-home"
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink 
              id={link1.id}
              to={link1.to} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link1.title}
            </NavLink>
            <NavLink 
              id={link2.id}
              to={link2.to} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link2.title}
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Sliding Sidebar Drawer */}
      <div className={`sidebar-drawer ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-drawer-header">
          <div className="logo-container">
            <div className="logo-icon">
              <Newspaper size={20} />
            </div>
            <span className="logo-text">Cricket<span>HK</span></span>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-drawer-content">
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Navigation</h4>
            <div className="sidebar-nav-links">
              <NavLink to="/" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> Home
              </NavLink>
              <NavLink to="/squad" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> India vs Afg Squad
              </NavLink>
              <NavLink to="/trade-rumors" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> Pandya Trade Rumors
              </NavLink>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Categories</h4>
            <div className="sidebar-nav-links">
              <NavLink to="/category/ipl-news" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> IPL News
              </NavLink>
              <NavLink to="/category/international-cricket" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> International Cricket
              </NavLink>
              <NavLink to="/category/injury-news" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> Injury News
              </NavLink>
              <NavLink to="/category/squad-news" onClick={closeSidebar} className="sidebar-nav-link-item">
                <ChevronRight size={16} /> Squad News
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  )
}
