import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { client, urlFor } from '../sanityClient'

export default function CategoryNews() {
  const { categoryName } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Map URL parameter to display name and mock categories
  const categoryMap = {
    'ipl-news': {
      title: 'IPL News',
      sanityValue: 'IPL News',
      mockCategories: ['IPL Rumors', 'IPL 2026', 'IPL News']
    },
    'international-cricket': {
      title: 'International Cricket',
      sanityValue: 'International Cricket',
      mockCategories: ['Test Cricket', 'International', 'ICC News', 'International Cricket']
    },
    'injury-news': {
      title: 'Injury News',
      sanityValue: 'Injury News',
      mockCategories: ['Injury Update', 'Injury News']
    },
    'squad-news': {
      title: 'Squad News',
      sanityValue: 'Squad News',
      mockCategories: ['Squad Reveal', 'Domestic', 'Squad News', 'Squads']
    }
  }

  const currentCategory = categoryMap[categoryName] || {
    title: categoryName ? categoryName.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'News',
    sanityValue: categoryName,
    mockCategories: []
  }

  // Full mock news for fallback
  const allMockNews = [
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

  // Filter mock news based on categories mapped
  const filteredMockNews = allMockNews.filter(item => 
    currentCategory.mockCategories.some(cat => 
      item.category.toLowerCase() === cat.toLowerCase()
    )
  )

  useEffect(() => {
    document.title = `CricketHK | ${currentCategory.title}`
    
    // Set SEO Meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', `Read the latest ${currentCategory.title} updates, analysis and breaking news on CricketHK.`)
    }

    async function fetchCategoryPosts() {
      try {
        setLoading(true)
        // Fetch posts matching the category value from Sanity, ordered by date
        const query = `*[_type == "post" && category == $catVal] | order(publishedAt desc) {
          _id,
          title,
          slug,
          description,
          publishedAt,
          mainImage,
          category
        }`
        const fetchedPosts = await client.fetch(query, { catVal: currentCategory.sanityValue })
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts)
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error('Error fetching category posts from Sanity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryPosts()
  }, [categoryName])

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const hasSanityData = posts.length > 0
  const displayNews = hasSanityData ? posts : filteredMockNews

  return (
    <div className="category-page-container">
      {/* Category Header */}
      <div className="category-page-header">
        <div className="category-header-content">
          <span className="category-accent-tag">Category</span>
          <h1 className="category-page-title">{currentCategory.title}</h1>
          <p className="category-page-desc">
            Stay informed with the latest articles, rumors, and updates under {currentCategory.title}.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <section className="home-section-container" style={{ paddingTop: '40px' }}>
        {loading && hasSanityData && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted-dark)' }}>
            <p>Loading {currentCategory.title} updates...</p>
          </div>
        )}

        {!loading && displayNews.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted-dark)' }}>
            <h3>No articles found</h3>
            <p style={{ marginTop: '10px' }}>Check back later for updates in {currentCategory.title}.</p>
            <Link to="/" className="hero-cta-btn" style={{ marginTop: '20px', display: 'inline-flex' }}>
              Back to Home
            </Link>
          </div>
        )}

        {displayNews.length > 0 && (
          <div className="news-grid">
            {displayNews.map((news) => {
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
        )}
      </section>
    </div>
  )
}
