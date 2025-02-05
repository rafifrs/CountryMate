import './App.css'
import { useState } from 'react';
import CountryList from './components/CountryCard'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';
// import Squares from './components/Squares.jsx'
import Header from "./components/Header";
function App() {
  return (
    <Router>
        <MainRoutes />
    </Router>
  )
}

function MainRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");

  return (
    <div className="min-h-screen bg-black relative">
      <Header onSearch={setSearchQuery} onFilter={setSelectedContinent}/>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<CountryList searchQuery={searchQuery} selectedContinent={selectedContinent} />} />
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