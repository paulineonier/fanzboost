import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Web3UserProvider } from './context/Web3UserContext';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3UserProvider>
      <App />
    </Web3UserProvider>
  </StrictMode>
);