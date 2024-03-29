import React, { useState, useEffect } from 'react';
// styling
import './App.css';
// routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages and navbar for routing
import NavBar from './components/NavBar';
import Home from './pages/home'; // interpreter has issue with casing
import PostInfo from './pages/PostInfo';
import About from './pages/About';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';

// main React application
function App() {
  // states for main app data
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // loading states
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);

  // get user data
  useEffect(() => {
    fetch("/api/users")
    .then(response => {
        if (response.ok) {
          response.json().then(data => {
            setUsers(data);
            setUsersLoaded(true);
          });
        } else {
          response.json().then(err => console.log(err.error));
        }
    })
  }, [])

  // get post data
  useEffect(() => {
    fetch("/api/posts")
    .then(response => {
      if (response.ok) {
          response.json().then(data => {
            setPosts(data);
            setPostsLoaded(true);
          });
      } else {
          response.json().then(err => console.log(err.error));
      }
  })
}, [])

  // check if logged in upon page refresh
  useEffect(() => {
    fetch("/api/check_session")
    .then(response => {
        if (response.ok) {
            response.json().then(user => handleLogin(user));
        } else {
            response.json().then(err => console.log(err.error));
        }
    })
  }, [])
  
  // add new user
  function handleAddUser(newUser) {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  }

  // add new post
  function handleAddPost(newPost) {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
  }

  // log in
  function handleLogin(user) {
      setCurrentUser(user);
      setLoggedIn(true);
  }

  // log out
  function handleLogout() {
      setCurrentUser(null);
      setLoggedIn(false);   
  }

  // Show a loading state while users data are being fetched
  if (!usersLoaded) {
      return <div>Loading users...</div>;
  }

  // Show a loading state while posts data are being fetched
  if (!postsLoaded) {
      return <div>Loading posts...</div>
  }

  return (
    <main>   
      <BrowserRouter>
        <div className='row'>
          <h1>PostMaker</h1>
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
            <Route path='/posts/:id' element={<PostInfo loggedIn={loggedIn} currentUser={currentUser} />} />
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
