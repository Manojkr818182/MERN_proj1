import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import About from './pages/about/About';
import Services from './pages/service/Services';
import Signup from './pages/signup/Signup';
import User from './pages/user/User';
import Post from './pages/post/Post';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  return (
    <Router>
      <Routes>
        {isLoggedIn &&
          <Route exact path="/" element={<Layout />} >
            <Route exact path="/" element={<Navigate to="/home" replace />} />
            <Route exact path="/login" element={<Navigate to="/home" replace />} />
            <Route exact path="*" element={<Navigate to="/home" replace />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/service" element={<Services />} />
          </Route>
        }
        {!isLoggedIn &&
          <>        <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route exact path="/users" element={<User />} />
            <Route exact path='/post/:user_id' element={<Post />} />
          </>

        }
      </Routes>
    </Router>
  )
}

export default App;
