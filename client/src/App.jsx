import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <main>   
      <BrowserRouter>
        <div className='row'>
          <h1>myApp</h1>
          <NavBar />
        </div>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>

  )
}

export default App;
