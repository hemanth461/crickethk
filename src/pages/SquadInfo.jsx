import { useState, useMemo, useEffect } from 'react'
import { Search, UserCheck, Calendar, MapPin, Award, Users } from 'lucide-react'
import { client, urlFor } from '../sanityClient'

// Squad data structured with names, roles, and designation tags
const testSquad = [
  { name: "Shubman Gill", role: "Batsman", tag: "captain" },
  { name: "Yashasvi Jaiswal", role: "Batsman", tag: "player" },
  { name: "KL Rahul", role: "Wicketkeeper / Batsman", tag: "vice-captain" },
  { name: "Sai Sudharsan", role: "Batsman", tag: "player" },
  { name: "Rishabh Pant", role: "Wicketkeeper", tag: "wk" },
  { name: "Devdutt Padikkal", role: "Batsman", tag: "player" },
  { name: "Nitish Kumar Reddy", role: "All-rounder", tag: "player" },
  { name: "Washington Sundar", role: "All-rounder", tag: "player" },
  { name: "Kuldeep Yadav", role: "Bowler", tag: "player" },
  { name: "Mohammed Siraj", role: "Bowler", tag: "player" },
  { name: "Prasidh Krishna", role: "Bowler", tag: "player" },
  { name: "Manav Suthar", role: "Bowler", tag: "player" },
  { name: "Gurnoor Brar", role: "Bowler", tag: "player" },
  { name: "Harsh Dubey", role: "Bowler", tag: "player" },
  { name: "Dhruv Jurel", role: "Wicketkeeper", tag: "wk" }
]

const odiSquad = [
  { name: "Shubman Gill", role: "Batsman", tag: "captain" },
  { name: "Shreyas Iyer", role: "Batsman", tag: "vice-captain" },
  { name: "Rohit Sharma", role: "Batsman", tag: "player" },
  { name: "Virat Kohli", role: "Batsman", tag: "player" },
  { name: "KL Rahul", role: "Wicketkeeper", tag: "wk" },
  { name: "Ishan Kishan", role: "Wicketkeeper", tag: "wk" },
  { name: "Hardik Pandya", role: "All-rounder", tag: "player" },
  { name: "Nitish Kumar Reddy", role: "All-rounder", tag: "player" },
  { name: "Washington Sundar", role: "All-rounder", tag: "player" },
  { name: "Harsh Dubey", role: "Bowler", tag: "player" },
  { name: "Kuldeep Yadav", role: "Bowler", tag: "player" },
  { name: "Arshdeep Singh", role: "Bowler", tag: "player" },
  { name: "Prasidh Krishna", role: "Bowler", tag: "player" },
  { name: "Prince Yadav", role: "Bowler", tag: "player" },
  { name: "Gurnoor Brar", role: "Bowler", tag: "player" }
]

export default function SquadInfo() {
  const [activeTab, setActiveTab] = useState('test') // 'test' or 'odi'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('All') // 'All', 'Batsman', 'All-rounder', 'Bowler', 'Wicketkeeper'
  const [sanityPlayers, setSanityPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "India vs Afghanistan Squad Announcements | CricketHK"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "Check India's Test and ODI squads for the upcoming bilateral series against Afghanistan. Get complete player lists and team combinations.")
    }

    async function fetchPlayers() {
      try {
        setLoading(true)
        const query = `*[_type == "player"] {
          name,
          role,
          squad,
          country,
          image,
          tag,
          stats
        }`
        const fetched = await client.fetch(query)
        if (fetched && fetched.length > 0) {
          setSanityPlayers(fetched)
        }
      } catch (err) {
        console.error('Error fetching players from Sanity:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  // Map active tab squad list
  const currentSquadList = useMemo(() => {
    if (sanityPlayers.length > 0) {
      return sanityPlayers.filter(player => {
        const squadLower = (player.squad || '').toLowerCase()
        if (activeTab === 'test') {
          return squadLower === 'test' || squadLower === 'both'
        } else {
          return squadLower === 'odi' || squadLower === 'both'
        }
      })
    }
    return activeTab === 'test' ? testSquad : odiSquad
  }, [sanityPlayers, activeTab])

  // Dynamic metrics of currently selected squad
  const metrics = useMemo(() => {
    const total = currentSquadList.length
    const batsmen = currentSquadList.filter(p => {
      const roleLower = (p.role || '').toLowerCase()
      return (roleLower.includes('batsman') || roleLower.includes('batter')) && !roleLower.includes('wicketkeeper')
    }).length
    const allRounders = currentSquadList.filter(p => {
      const roleLower = (p.role || '').toLowerCase()
      return roleLower.includes('all-rounder') || roleLower.includes('all-round')
    }).length
    const bowlers = currentSquadList.filter(p => {
      const roleLower = (p.role || '').toLowerCase()
      return roleLower.includes('bowler')
    }).length
    const wks = currentSquadList.filter(p => {
      const roleLower = (p.role || '').toLowerCase()
      const tagLower = (p.tag || '').toLowerCase()
      return roleLower.includes('wicketkeeper') || tagLower === 'wk'
    }).length
    
    return { total, batsmen, allRounders, bowlers, wks }
  }, [currentSquadList])

  // Filtered player list based on search and role filters
  const filteredPlayers = useMemo(() => {
    return currentSquadList.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      let matchesRole = true
      if (selectedRole !== 'All') {
        const roleLower = (player.role || '').toLowerCase()
        const tagLower = (player.tag || '').toLowerCase()

        if (selectedRole === 'Wicketkeeper') {
          matchesRole = roleLower.includes('wicketkeeper') || tagLower === 'wk'
        } else if (selectedRole === 'Batsman') {
          matchesRole = (roleLower.includes('batsman') || roleLower.includes('batter')) && !roleLower.includes('wicketkeeper')
        } else if (selectedRole === 'All-rounder') {
          matchesRole = roleLower.includes('all-rounder') || roleLower.includes('all-round')
        } else if (selectedRole === 'Bowler') {
          matchesRole = roleLower.includes('bowler')
        }
      }
      
      return matchesSearch && matchesRole
    })
  }, [currentSquadList, searchQuery, selectedRole])

  // Get Initials for player profile circular graphics
  const getInitials = (name) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  // Helper to format designation tag display names
  const getTagClass = (tag) => {
    const tagVal = (tag || '').toLowerCase()
    switch (tagVal) {
      case 'captain': return 'player-role-badge role-captain';
      case 'vice-captain': return 'player-role-badge role-vc';
      case 'wk': return 'player-role-badge role-wk';
      default: return 'player-role-badge role-player';
    }
  }

  const getTagLabel = (tag, role) => {
    const tagVal = (tag || '').toLowerCase()
    if (tagVal === 'captain') return 'Captain';
    if (tagVal === 'vice-captain') return 'Vice-Captain';
    if (tagVal === 'wk') return 'WK-Batsman';
    return role;
  }

  return (
    <div>
      {/* Squad Page Header Banner */}
      <section className="squad-header-bg">
        <div className="squad-title-container">
          <span className="squad-page-subtitle">Tour Announcement</span>
          <h1 className="squad-page-title">India vs Afghanistan Series</h1>
          <div className="squad-meta-tags">
            <span><Users size={16} /> {currentSquadList.length}-Member Squad</span>
            <span><Award size={16} /> Tour 2026</span>
            <span><MapPin size={16} /> Indian Subcontinent</span>
          </div>
        </div>
      </section>

      {/* Control Panel (Tabs, Search, and Roles) */}
      <div className="squad-control-panel">
        <div className="squad-tabs">
          <button 
            id="tab-squad-test"
            className={`squad-tab-btn ${activeTab === 'test' ? 'active' : ''}`}
            onClick={() => { setActiveTab('test'); setSelectedRole('All'); setSearchQuery(''); }}
          >
            India's Test Squad
          </button>
          <button 
            id="tab-squad-odi"
            className={`squad-tab-btn ${activeTab === 'odi' ? 'active' : ''}`}
            onClick={() => { setActiveTab('odi'); setSelectedRole('All'); setSearchQuery(''); }}
          >
            India's ODI Squad
          </button>
        </div>

        <div className="squad-search-box">
          <Search size={18} className="squad-search-icon" />
          <input 
            id="search-player-input"
            type="text" 
            placeholder="Search players..." 
            className="squad-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="home-section-container" style={{ paddingTop: '0px' }}>
        {/* Dynamic Squad Metrics Dashboard */}
        <div className="stats-widget" style={{ marginTop: '0px', marginBottom: '40px' }}>
          <h3 className="stats-widget-title">
            <Users size={20} /> Squad Composition Overview
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{metrics.total}</div>
              <div className="stat-label">Total Squad</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{metrics.batsmen + metrics.wks}</div>
              <div className="stat-label">Batsmen & WKs</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{metrics.allRounders}</div>
              <div className="stat-label">All Rounders</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{metrics.bowlers}</div>
              <div className="stat-label">Specialist Bowlers</div>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {['All', 'Batsman', 'All-rounder', 'Bowler', 'Wicketkeeper'].map((role) => (
            <button
              key={role}
              id={`role-filter-${role.toLowerCase()}`}
              onClick={() => setSelectedRole(role)}
              style={{
                background: selectedRole === role ? 'var(--brand-green)' : 'var(--text-light)',
                color: selectedRole === role ? 'var(--text-light)' : 'var(--text-muted-dark)',
                border: '1px solid var(--border-light)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: selectedRole === role ? 'var(--shadow-md)' : 'none'
              }}
            >
              {role === 'All' ? 'All Roles' : `${role}s`}
            </button>
          ))}
        </div>

        {/* Grid Title */}
        <h3 className="squad-deck-title">
          {activeTab === 'test' ? "Test Team Lineup" : "ODI Team Lineup"}
          <span>Showing {filteredPlayers.length} of {currentSquadList.length}</span>
        </h3>

        {/* Player Grid */}
        <div className="squad-grid">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, idx) => (
              <div key={idx} className="player-card">
                {player.image ? (
                  <img 
                    src={urlFor(player.image).url()} 
                    alt={player.name} 
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div className="player-avatar-placeholder">
                    {getInitials(player.name)}
                  </div>
                )}
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                  <span className={getTagClass(player.tag)}>
                    {getTagLabel(player.tag, player.role)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-players-found">
              <h4>No matching players found</h4>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Try adjusting your search filters or input keyword</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

