import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SquadInfo from './pages/SquadInfo'
import TradeRumors from './pages/TradeRumors'
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
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}

export default App
