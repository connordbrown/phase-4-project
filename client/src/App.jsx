import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home'
import About from './pages/Home'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

      </Routes>
      <h1>Vite + React</h1>
    </BrowserRouter>
  )
}

export default App;
