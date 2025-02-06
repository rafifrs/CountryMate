import './App.css'
import { useState } from 'react';
import CountryList from './components/CountryCard'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';
import Header from "./components/Header";
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('userProfile') !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div>
                <Header onSearch={setSearchQuery} onFilter={setSelectedContinent}/>
                <CountryList searchQuery={searchQuery} selectedContinent={selectedContinent} />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<p className="text-white">404 Not Found</p>} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetail />} />
        </Routes>
      )}
    </div>
  );
}

export default App;