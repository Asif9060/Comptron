import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/CSS/index.css'
import "@radix-ui/themes/styles.css";
import LoadingAnimation from './Components/UI/LoadingAnimation.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LoadingAnimation></LoadingAnimation>
      
  </StrictMode>,
)
