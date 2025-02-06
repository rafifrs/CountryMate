import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  User, 
  Shield 
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setIsLoading(true);
      const decoded = jwtDecode<UserProfile>(credentialResponse.credential);
      
      // Simulating a delay to show loading state
      setTimeout(() => {
        localStorage.setItem('userProfile', JSON.stringify(decoded));
        navigate('/profile');
      }, 1500);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className={`${darkMode ? 'dark bg-black' : 'bg-white'} flex items-center justify-center min-h-screen transition-colors duration-300`}>


      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Secure login with Google OAuth
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-9 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-700 dark:text-white">Authenticating...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-2">
              <User className="text-gray-500 dark:text-gray-400 mr-2" />
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme={darkMode ? 'filled_blue' : 'outline'}
                size="large"
                text="signin_with"
                type="standard"
                shape="rectangular"
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;