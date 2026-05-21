import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Zap, TrendingUp } from 'lucide-react'

export default function Home() {
  useEffect(() => {
    document.title = "CricketHK | Latest Cricket News, Squad Announcements & Trade Rumors"
    
    // SEO Meta description update dynamically
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with the latest cricket news, team squads, and trade rumors on CricketHK. Professional, mobile-responsive coverage.')
    }
  }, [])

  // Mock cricket news (no rankings as requested)
  const mockNews = [
    {
      id: 1,
      title: "Hardik Pandya Trade Rumors: Mumbai Indians Future Uncertain After Disappointing Campaign",
      excerpt: "Reports suggest Hardik Pandya might seek a move away from Mumbai Indians post-IPL 2026 as multiple franchises display interest in signing the star all-rounder.",
      author: "Rahul Sharma",
      date: "May 20, 2026",
      category: "IPL Rumors",
      link: "/trade-rumors",
      badge: "HOT"
    },
    {
      id: 2,
      title: "India vs Afghanistan Squad Announcement: Shubman Gill to Captain in Tests and ODIs",
      excerpt: "BCCI announces a revamped India squad for the upcoming bilateral series against Afghanistan. Experienced seniors rested while fresh domestic talents earn calls.",
      author: "Vikram Mehta",
      date: "May 19, 2026",
      category: "Squad Reveal",
      link: "/squad",
      badge: "LATEST"
    },
    {
      id: 3,
      title: "WTC Finals: Pitch Conditions in London Spark Selection Dilemmas for Team India",
      excerpt: "The green top expected at Lord's has forced selectors and team management to reconsider the spin-heavy bowling combination in favor of extra seam options.",
      author: "Arjun Sen",
      date: "May 18, 2026",
      category: "Test Cricket",
      link: "#",
      badge: "WTC"
    },
    {
      id: 4,
      title: "Injured Star Speedster Begins Rehabilitation at NCA; Target Return Set for Asia Cup",
      excerpt: "Good news for cricket fans as India's lead pace spearhead has started light bowling sessions at Bengaluru under medical supervision.",
      author: "Preeti Patil",
      date: "May 17, 2026",
      category: "Injury Update",
      link: "#",
      badge: "UPDATE"
    },
    {
      id: 5,
      title: "Domestic Performance Pays Off: Harsh Dubey and Gurnoor Brar Earn Maiden Team India Callups",
      excerpt: "A stellar Ranji and Vijay Hazare season sees these domestic workhorses secure a spot in the national squads. Experts weigh in on their potential impact.",
      author: "Sanjay Manjrekar",
      date: "May 16, 2026",
      category: "Domestic",
      link: "/squad",
      badge: "FEATURED"
    },
    {
      id: 6,
      title: "New Global T20 League Formats Approved; ICC Cracks Down on Player Participation Limits",
      excerpt: "The ICC Board implements stricter limits on active players appearing in multiple franchise leagues to preserve international bilateral series.",
      author: "George Binoy",
      date: "May 15, 2026",
      category: "ICC News",
      link: "#",
      badge: "GLOBAL"
    }
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert('Subscribed to CricketHK Newsletter!')
    e.target.reset()
  }

  return (
    <div>
      {/* Hero Spotlight Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="badge-breaking">
              <Zap size={14} fill="currentColor" /> Breaking News
            </span>
            <h1 className="hero-title">
              Hardik Pandya Trade Rumors Ignite Post IPL-2026 Disappointment
            </h1>
            <p className="hero-description">
              Speculation grows as Mumbai Indians' campaign officially ends in Raipur. Reports indicate Pandya might part ways after unfollowing official handles. Read the full trade breakdown, campaign analysis, and performance stats.
            </p>
            <Link to="/trade-rumors" className="hero-cta-btn" id="hero-cta">
              Read Full Article <ArrowRight size={18} />
            </Link>
          </div>

          <div className="hero-sidebar">
            <h3 className="sidebar-title">
              <TrendingUp size={20} className="text-brand-green" /> Trending Topics
            </h3>
            
            <div className="sidebar-item">
              <span className="sidebar-tag">Squads</span>
              <Link to="/squad" className="sidebar-link-title">
                India vs Afghanistan Test & ODI squads announced. Shubman Gill named captain!
              </Link>
            </div>

            <div className="sidebar-item">
              <span className="sidebar-tag">IPL 2026</span>
              <Link to="/trade-rumors" className="sidebar-link-title">
                Inside Mumbai Indians' bottom-tier campaign: What went wrong for Hardik Pandya?
              </Link>
            </div>

            <div className="sidebar-item">
              <span className="sidebar-tag">BCCI Updates</span>
              <a href="#" className="sidebar-link-title">
                Domestic stars Harsh Dubey and Gurnoor Brar receive maiden callups.
              </a>
            </div>
            
            <div className="sidebar-item">
              <span className="sidebar-tag">International</span>
              <a href="#" className="sidebar-link-title">
                WTC Final preparations kick off as team management leaves for London early.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Grid Section */}
      <section className="home-section-container">
        <div className="section-header">
          <h2 className="section-title">Latest Cricket Coverage</h2>
        </div>

        <div className="news-grid">
          {mockNews.map((news) => (
            <article key={news.id} className="news-card">
              <div className="news-card-image-wrapper">
                <div className="news-card-placeholder-text">
                  {news.category}
                </div>
                <span className="news-card-badge">{news.badge}</span>
              </div>
              
              <div className="news-card-content">
                <div className="news-card-meta">
                  <span>
                    <User size={13} /> {news.author}
                  </span>
                  <span>
                    <Calendar size={13} /> {news.date}
                  </span>
                </div>
                
                <h3 className="news-card-title">
                  {news.link.startsWith('/') ? (
                    <Link to={news.link}>{news.title}</Link>
                  ) : (
                    <a href={news.link} onClick={(e) => news.link === '#' && e.preventDefault()}>{news.title}</a>
                  )}
                </h3>
                
                <p className="news-card-excerpt">
                  {news.excerpt}
                </p>
                
                <div className="news-card-footer">
                  <span className="news-card-author">{news.category}</span>
                  {news.link.startsWith('/') ? (
                    <Link to={news.link} className="news-card-link">
                      Read More <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <a 
                      href={news.link} 
                      onClick={(e) => news.link === '#' && e.preventDefault()} 
                      className="news-card-link"
                    >
                      Read More <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup Banner */}
        <div className="newsletter-banner">
          <div className="newsletter-text">
            <h3 className="newsletter-title">Get CricketHK in Your Inbox</h3>
            <p className="newsletter-desc">
              Subscribe to get daily hand-picked news, team announcements, match summaries, and insights into cricket analytics.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
              id="newsletter-email"
              required 
            />
            <button type="submit" className="newsletter-btn" id="newsletter-submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
