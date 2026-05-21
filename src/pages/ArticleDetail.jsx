import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../sanityClient'
import { PortableText } from '@portabletext/react'
import { Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react'

// Custom serializer for rendering Portable Text with existing stylesheet classes
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="article-p">{children}</p>,
    h1: ({ children }) => <h1 className="article-heading">{children}</h1>,
    h2: ({ children }) => <h2 className="article-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="article-heading">{children}</h3>,
    blockquote: ({ children }) => (
      <div className="article-callout">
        <p className="article-callout-text">{children}</p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ marginLeft: '24px', marginBottom: '24px', listStyleType: 'disc' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ marginLeft: '24px', marginBottom: '24px', listStyleType: 'decimal' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
  },
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true)
        // Query the post document by slug
        const query = `*[_type == "post" && slug.current == $slug][0]`
        const data = await client.fetch(query, { slug })
        setPost(data)
      } catch (error) {
        console.error('Error fetching post from Sanity:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  // Dynamic SEO update when the post loads
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | CricketHK`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description || post.title)
      }
    }
  }, [post])

  const handleShare = (platform) => {
    navigator.clipboard.writeText(window.location.href)
    alert(`Link copied to clipboard for sharing on ${platform}!`)
  }

  if (loading) {
    return (
      <div className="article-bg" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--bg-primary)' }}>
          <div className="logo-icon" style={{ display: 'inline-flex', marginBottom: '15px' }}>
            <Clock size={24} />
          </div>
          <h3>Loading Article...</h3>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="article-bg" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ marginBottom: '15px', color: 'var(--bg-primary)' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted-dark)', marginBottom: '20px' }}>
            The news article you are looking for does not exist or may have been removed.
          </p>
          <Link to="/" className="hero-cta-btn" style={{ padding: '10px 20px', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>
      </div>
    )
  }

  // Calculate read time roughly
  const wordCount = post.body ? JSON.stringify(post.body).split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const heroStyle = post.mainImage
    ? {
        backgroundImage: `linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0.35) 100%), url(${urlFor(post.mainImage).url()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  return (
    <div className="article-bg">
      <div className="article-container">
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brand-green-hover)', fontWeight: '600', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Back to News
          </Link>
        </div>

        <article className="article-card">
          {/* Article Banner Hero */}
          <div className="article-banner-hero" style={heroStyle}>
            <div className="article-hero-content">
              <span className="article-category">{post.category || 'General News'}</span>
              <h1 className="article-title">{post.title}</h1>

              <div className="article-meta">
                <span className="article-meta-item">
                  <User size={14} /> CricketHK Editor
                </span>
                <span className="article-meta-item">
                  <Calendar size={14} />{' '}
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="article-meta-item">
                  <Clock size={14} /> {readTime} min read
                </span>
              </div>
            </div>
          </div>

          {/* Share Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 40px',
              borderBottom: '1px solid var(--border-light)',
              backgroundColor: 'var(--text-light)',
              flexWrap: 'wrap',
              gap: '15px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted-dark)' }}>Share article:</span>
              {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-green-hover)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Share2 size={12} /> {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="article-body">
            {post.description && (
              <p className="article-summary-lead">
                {post.description}
              </p>
            )}

            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </article>
      </div>
    </div>
  )
}
