import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
)

/*
Explanation:

- The application imports React modules and necessary dependencies.
- 'StrictMode' helps in highlighting potential issues during development.
- 'createRoot' is the React 18+ method to initialize the root of the app.
- 'index.css' contains global styling.
- 'App' is the root component that holds the overall UI.
- 'BrowserRouter' enables routing between different views/pages.
- 'AppContextProvider' wraps the App to provide global context using React's Context API.

Summary:

This is the main entry file for the React app. 
It renders the <App /> component to the DOM, while enabling routing support and global state management via context. 
All components inside <App /> can use navigation and shared state provided by the context.
*/
