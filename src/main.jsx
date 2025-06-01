import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import {Modal} from '../Modal/Modal' 
import { GlobalProvider } from '../context/Context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
      <Modal />
    </GlobalProvider>
  </StrictMode>,
)
