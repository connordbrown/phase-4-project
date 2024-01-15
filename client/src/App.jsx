import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
    .then(response => response.json())
    .then(data => setUsers(data))
  }, [])

  function handleAddUser(newUser) {
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers);
  }

  return (
    <main>   
      <BrowserRouter>
        <div className='row'>
          <h1>myApp</h1>
          <NavBar />
        </div>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home users={users} />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<SignUp onAddUser={handleAddUser} />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>

  )
}

export default App;
