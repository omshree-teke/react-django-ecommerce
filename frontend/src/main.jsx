import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx"  // ← No curly braces
import { CartProvider } from './context/CartContext.jsx'
createRoot(document.getElementById('app')).render(
  <StrictMode>
    <CartProvider>
       <App />
    </CartProvider>
  </StrictMode>,
)