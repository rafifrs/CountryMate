import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Bookmark, 
  Eye, 
  Map, 
  Search, 
  Star 
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing user profile:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const StatCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string | number }) => (
    <div className="bg-[#2C2C2C] rounded-lg p-4 flex items-center space-x-4 border border-gray-700 hover:border-blue-600 transition-all duration-300">
      <Icon className="text-blue-500" size={24} />
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  const handleStartCountryMate = () => {
    navigate('/');
  };

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#1E1E1E] rounded-2xl border border-gray-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <img 
            src={userProfile.picture} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600"
          />
          <h2 className="text-2xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-400">{userProfile.email}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Globe} title="Countries Viewed" value="-" />
          <StatCard icon={Map} title="Favorite Continent" value="-" />
          <StatCard icon={Eye} title="App Access" value="-" />
          <StatCard icon={Bookmark} title="Bookmarked" value="-" />
          <StatCard icon={Star} title="Want to Visit" value="-" />
          <StatCard icon={Search} title="Searches" value="-" />
        </div>

        <div className="flex justify-between">
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
          <button 
            onClick={handleStartCountryMate}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold 
            hover:bg-blue-700 transform hover:scale-105 transition-all 
            shadow-xl shadow-blue-600/50 hover:shadow-blue-700/50 
            animate-pulse hover:animate-none"
          >
            Start CountryMate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;