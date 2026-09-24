import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { AppdataProvider } from './Context/AppdataContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppdataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppdataProvider>
  </StrictMode>
)
