import React from 'react'
import { BeerApp } from './BeerApp'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <BeerApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
