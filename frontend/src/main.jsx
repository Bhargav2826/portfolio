import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Disable browser scroll restoration so page always starts at top on load/refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// Clear URL hash so react-scroll doesn't auto-scroll to a section on page load/refresh
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
