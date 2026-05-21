import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SquadInfo from './pages/SquadInfo'
import TradeRumors from './pages/TradeRumors'
import ArticleDetail from './pages/ArticleDetail'
import CategoryNews from './pages/CategoryNews'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Shared Navigation Bar */}
      <Navbar />

      {/* Main Pages Router */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/squad" element={<SquadInfo />} />
          <Route path="/trade-rumors" element={<TradeRumors />} />
          <Route path="/news/:slug" element={<ArticleDetail />} />
          <Route path="/category/:categoryName" element={<CategoryNews />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>


      {/* Shared Footer */}
      <Footer />
      
      {/* Vercel Analytics tracking tag */}
      <Analytics mode="production" />
    </div>
  )
}

export default App
