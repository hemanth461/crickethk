import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Zap, TrendingUp } from 'lucide-react'
import { client, urlFor } from '../sanityClient'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock cricket news fallback
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

  useEffect(() => {
    document.title = "CricketHK | Latest Cricket News, Squad Announcements & Trade Rumors"
    
    // SEO Meta description update dynamically
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with the latest cricket news, team squads, and trade rumors on CricketHK. Professional, mobile-responsive coverage.')
    }

    async function fetchPosts() {
      try {
        setLoading(true)
        // Fetch posts from Sanity sorted by date
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          description,
          publishedAt,
          mainImage,
          category
        }`
        const fetchedPosts = await client.fetch(query)
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts)
        }
      } catch (error) {
        console.error('Error fetching posts from Sanity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert('Subscribed to CricketHK Newsletter!')
    e.target.reset()
  }

  // Determine Hero post and Grid posts
  const hasSanityData = posts.length > 0
  const heroPost = hasSanityData ? posts[0] : null
  const gridNews = hasSanityData ? posts.slice(1) : mockNews

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Define dynamic Hero styling if an image exists
  const heroSectionStyle = (heroPost && heroPost.mainImage) ? {
    backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%), url(${urlFor(heroPost.mainImage).url()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {}

  return (
    <div>
      {/* Hero Spotlight Section */}
      <section className="hero-section" style={heroSectionStyle}>
        <div className="hero-grid">
          <div className="hero-content">
            <span className="badge-breaking">
              <Zap size={14} fill="currentColor" /> Breaking News
            </span>
            <h1 className="hero-title">
              {heroPost ? heroPost.title : "Hardik Pandya Trade Rumors Ignite Post IPL-2026 Disappointment"}
            </h1>
            <p className="hero-description">
              {heroPost ? heroPost.description : "Speculation grows as Mumbai Indians' campaign officially ends in Raipur. Reports indicate Pandya might part ways after unfollowing official handles. Read the full trade breakdown, campaign analysis, and performance stats."}
            </p>
            {heroPost ? (
              <Link to={`/news/${heroPost.slug.current}`} className="hero-cta-btn" id="hero-cta">
                Read Full Article <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/trade-rumors" className="hero-cta-btn" id="hero-cta">
                Read Full Article <ArrowRight size={18} />
              </Link>
            )}
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
              <a href="#" className="sidebar-link-title" onClick={(e) => e.preventDefault()}>
                Domestic stars Harsh Dubey and Gurnoor Brar receive maiden callups.
              </a>
            </div>
            
            <div className="sidebar-item">
              <span className="sidebar-tag">International</span>
              <a href="#" className="sidebar-link-title" onClick={(e) => e.preventDefault()}>
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

        {loading && hasSanityData && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted-dark)' }}>
            <p>Loading news updates...</p>
          </div>
        )}

        <div className="news-grid">
          {gridNews.map((news, idx) => {
            const isSanityItem = hasSanityData
            const cardKey = isSanityItem ? news._id : news.id
            const cardTitle = news.title
            const cardCategory = news.category
            const cardExcerpt = isSanityItem ? news.description : news.excerpt
            const cardDate = isSanityItem ? formatDate(news.publishedAt) : news.date
            const cardAuthor = isSanityItem ? "CricketHK Editor" : news.author
            const cardBadge = isSanityItem ? "NEW" : news.badge
            const isExternalLink = !isSanityItem && !news.link.startsWith('/')

            return (
              <article key={cardKey} className="news-card">
                <div className="news-card-image-wrapper">
                  {isSanityItem && news.mainImage ? (
                    <img 
                      src={urlFor(news.mainImage).url()} 
                      alt={cardTitle} 
                      className="news-card-img" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div className="news-card-placeholder-text">
                      {cardCategory}
                    </div>
                  )}
                  <span className="news-card-badge">{cardBadge}</span>
                </div>
                
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <span>
                      <User size={13} /> {cardAuthor}
                    </span>
                    <span>
                      <Calendar size={13} /> {cardDate}
                    </span>
                  </div>
                  
                  <h3 className="news-card-title">
                    {isSanityItem ? (
                      <Link to={`/news/${news.slug.current}`}>{cardTitle}</Link>
                    ) : isExternalLink ? (
                      <a href={news.link} onClick={(e) => news.link === '#' && e.preventDefault()}>{cardTitle}</a>
                    ) : (
                      <Link to={news.link}>{cardTitle}</Link>
                    )}
                  </h3>
                  
                  <p className="news-card-excerpt">
                    {cardExcerpt}
                  </p>
                  
                  <div className="news-card-footer">
                    <span className="news-card-author">{cardCategory}</span>
                    {isSanityItem ? (
                      <Link to={`/news/${news.slug.current}`} className="news-card-link">
                        Read More <ArrowRight size={14} />
                      </Link>
                    ) : isExternalLink ? (
                      <a 
                        href={news.link} 
                        onClick={(e) => news.link === '#' && e.preventDefault()} 
                        className="news-card-link"
                      >
                        Read More <ArrowRight size={14} />
                      </a>
                    ) : (
                      <Link to={news.link} className="news-card-link">
                        Read More <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
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

