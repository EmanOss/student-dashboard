// import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie'



function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
