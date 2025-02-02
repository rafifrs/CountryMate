import './App.css'
import CountryList from './components/CountryCard'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';
// import Squares from './components/Squares.jsx'

function App() {
  return (
    <Router>
        <MainRoutes />
        {/* <Squares
          direction="right" // Arah pergerakan grid
          speed={2} // Kecepatan grid
          borderColor="#444" // Warna border grid
          hoverFillColor="#666" // Warna saat hover
          squareSize={50} // Ukuran kotak grid
        /> */}
    </Router>
  )
}

function MainRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="min-h-screen bg-black relative">
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<CountryList />} />
        <Route path="*" element={<p className="text-white">404 Not Found</p>} />
      </Routes>

      {/* Render modal route on top */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetail />} />
        </Routes>
      )}
    </div>
  );
}

export default App;