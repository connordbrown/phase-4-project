import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/home'; // interpreter has issue with casing
import PostInfo from './pages/PostInfo';
import About from './pages/About';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/api/users")
    .then(response => response.json())
    .then(data => setUsers(data))
  }, [])

  useEffect(() => {
    fetch("/api/posts")
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [])

  // make else more useful!
  useEffect(() => {
    fetch("/api/check_session")
    .then(response => {
        if (response.ok) {
            response.json().then(user => handleLogin(user))
        } else {
            response.json().then(err => console.log(err.error))
        }
    })
  }, [])
  
  function handleAddUser(newUser) {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  }

  function handleAddPost(newPost) {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
  }

  function handleLogin(user) {
      setCurrentUser(user);
      setLoggedIn(true);
  }

  function handleLogout() {
      setCurrentUser(null);
      setLoggedIn(false);   
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
            <Route path='/' element={<Home 
                                      users={users}
                                      posts={posts}
                                      currentUser={currentUser}
                                      loggedIn={loggedIn} 
                                      onLogin={handleLogin} 
                                      onLogout={handleLogout}
                                      onPost={handleAddPost} />} 
            />
            <Route path='/posts/:id' element={<PostInfo posts={posts} />} />
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
