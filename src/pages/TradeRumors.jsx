import { useEffect } from 'react'
import { Calendar, User, Clock, Share2, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react'

export default function TradeRumors() {
  useEffect(() => {
    document.title = "Hardik Pandya Trade Rumors - Mumbai Indians Exit | CricketHK"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "Explore the latest speculation and analysis surrounding Hardik Pandya's potential exit from Mumbai Indians after the IPL 2026 campaign.")
    }
  }, [])

  const handleShare = (platform) => {
    alert(`Link copied for sharing on ${platform}!`)
  }

  return (
    <div className="article-bg">
      <div className="article-container">
        <article className="article-card">
          {/* Article Banner Hero */}
          <div className="article-banner-hero">
            <div className="article-hero-content">
              <span className="article-category">IPL 2026 &bull; Exclusives</span>
              <h1 className="article-title">
                Hardik Pandya Trade Rumors: Star All-Rounder Set to Part Ways with Mumbai Indians Post-IPL 2026
              </h1>
              
              <div className="article-meta">
                <span className="article-meta-item">
                  <User size={14} /> By Arjun Sen
                </span>
                <span className="article-meta-item">
                  <Calendar size={14} /> Updated May 21, 2026
                </span>
                <span className="article-meta-item">
                  <Clock size={14} /> 4 min read
                </span>
              </div>
            </div>
          </div>

          {/* Share Bar */}
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '16px 40px', 
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: 'var(--text-light)',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted-dark)' }}>Share article:</span>
              {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                <button
                  key={platform}
                  id={`share-${platform.toLowerCase()}`}
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
                    gap: '4px'
                  }}
                >
                  <Share2 size={12} /> {platform}
                </button>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#dc2626',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <AlertTriangle size={14} /> Speculation High
            </div>
          </div>

          {/* Article Body */}
          <div className="article-body">
            <p className="article-summary-lead">
              Reports indicate that Hardik Pandya may part ways with Mumbai Indians after the IPL 2026 season, as several teams are said to be keen on signing him.
            </p>

            <h2 className="article-heading">The Raipur Climax</h2>
            <p className="article-p">
              Mumbai’s campaign in IPL 2026 officially ended on Sunday night in Raipur following a dramatic last-ball loss to Royal Challengers Bengaluru. The elimination has triggered immediate questions regarding the future direction of the franchise, and more specifically, the captaincy and position of their star all-rounder.
            </p>

            <div className="article-callout">
              <p className="article-callout-text">
                "The campaign ended in heartbreak, but the real story was already unfolding on social media within minutes of the final delivery..."
              </p>
            </div>

            <h2 className="article-heading">The Instagram Controversy</h2>
            <p className="article-p">
              Soon after the match, attention shifted away from the result when Pandya reportedly unfollowed the franchise’s official Instagram account. Although the follow count quickly returned to 151 and Mumbai Indians appeared again in his following list, speculation had already begun circulating widely. Social media analysts and sports journalists quickly picked up on the brief anomaly, marking it as the potential catalyst for an impending transfer request.
            </p>

            <h2 className="article-heading">The Return vs Reality</h2>
            <p className="article-p">
              When Mumbai Indians decided to bring Pandya back before the 2024 season, the move appeared logical. At 30 years old, he was considered to be entering the prime phase of his career. He had also guided Gujarat Titans to a championship victory and another final in consecutive seasons as captain. With Mumbai aiming to begin a new era, the franchise viewed Pandya as the ideal leader for the future.
            </p>
            
            <p className="article-p">
              However, the results since then have not matched those expectations. The leadership transition, which involved replacing one of their most successful captains, generated substantial scrutiny. The corresponding performances on the pitch over the past three seasons failed to silence critics or deliver the silverware fans demanded.
            </p>

            {/* Campaign Summary Table Widget */}
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
              <TrendingUp size={16} style={{ verticalAlign: 'middle', marginRight: '6px', color: 'var(--brand-green)' }} /> 
              Mumbai Indians Under Hardik Pandya's Leadership (2024 - 2026)
            </h3>
            
            <div className="campaign-table-container">
              <table className="campaign-table">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Matches Won/Lost</th>
                    <th>Final Position / Result</th>
                    <th>Performance Tier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>IPL 2024</strong></td>
                    <td>4 Wins / 10 Losses</td>
                    <td>Bottom of the standings (10th)</td>
                    <td><span className="campaign-status status-low">Critical</span></td>
                  </tr>
                  <tr>
                    <td><strong>IPL 2025</strong></td>
                    <td>8 Wins / 6 Losses</td>
                    <td>Eliminated in Qualifier 2 (Punjab Kings)</td>
                    <td><span className="campaign-status status-high">Satisfactory</span></td>
                  </tr>
                  <tr>
                    <td><strong>IPL 2026</strong></td>
                    <td>3 Wins / 8 Losses</td>
                    <td>Failed to progress beyond League Stage</td>
                    <td><span className="campaign-status status-low">Underperformed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="article-heading">Individual Form Struggles</h2>
            <p className="article-p">
              Pandya’s personal form this season has also fallen below expectations. Even for a supporting player, those numbers would raise concerns. The all-rounder was expected to provide balance, but he struggled to anchor the middle-order or curb runs in the death overs.
            </p>

            {/* Stats Dashboard */}
            <div className="stats-widget">
              <h3 className="stats-widget-title">
                <BarChart2 size={20} /> Hardik Pandya: IPL 2026 Personal Statistics
              </h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">146</div>
                  <div className="stat-label">Runs Scored</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">40</div>
                  <div className="stat-label">Highest Score</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">136.44</div>
                  <div className="stat-label">Strike Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4 / 11.90</div>
                  <div className="stat-label">Wickets / Econ</div>
                </div>
              </div>
            </div>

            <h2 className="article-heading">What Lies Ahead?</h2>
            <p className="article-p">
              Across eight innings, he has scored 146 runs, with a highest score of 40 and a strike rate of 136.44. With the ball, he has taken only four wickets while conceding runs at an economy rate of 11.90. With the mega auction looming before the next cycle, several teams seeking captaincy options and veteran explosive presence have already initiated informal talks.
            </p>
            
            <p className="article-p">
              Speculation suggests franchises from the northern and southern divisions are ready to restructure their budgets to accommodate his massive salary tag. As Mumbai Indians reconsider their core retentions, the trade market in the coming months could see one of the biggest moves in league history.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
