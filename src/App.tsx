import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScienceBlogPage from './pages/ScienceBlogPage';
import ResearchBlogPage from './pages/ResearchBlogPage';
import BlogPost from './components/BlogPost';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/science" element={<ScienceBlogPage />} />
          <Route path="/research" element={<ResearchBlogPage />} />
          <Route path="/blog/:category/:id" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;