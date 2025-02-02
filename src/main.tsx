import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' 
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; 

const root = document.getElementById('root') as HTMLElement 

createRoot(root).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
)