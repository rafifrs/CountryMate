import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' 
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root') as HTMLElement 

createRoot(root).render(
  <GoogleOAuthProvider clientId="611306287850-rjc2ngv0bp0sqb7bp39qth70ifkjsege.apps.googleusercontent.com">
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
  </GoogleOAuthProvider>
)