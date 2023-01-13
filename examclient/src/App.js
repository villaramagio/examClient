import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Switch, Route, BrowserRouter} from 'react-router-dom';


import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';

function App() { 
  const Login = details => {
    console.log(details)
  }

  const Logout = details =>{
    console.log("Logout")
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path ="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
