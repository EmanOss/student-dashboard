import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import { CookiesProvider, withCookies } from 'react-cookie'
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Fab } from '@mui/material';
import { Box } from '@mui/system';
import { Translate } from '@mui/icons-material';


function App() {
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }

  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', '& > :not(style)': { m: 1 } }}>
              <Fab color="primary" aria-label="translate" onClick={handleChangeLanguage}>
                <Translate />
              </Fab>
            </Box>
          </div>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
