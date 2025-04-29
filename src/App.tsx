// ... existing code ...
import ScienceBlogPage from './pages/ScienceBlogPage';
import ResearchBlogPage from './pages/ResearchBlogPage';
import BlogPost from './components/BlogPost';

function App() {
  // ... existing code ...
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 添加博客相关路由 */}
          <Route path="/science" element={<ScienceBlogPage />} />
          <Route path="/research" element={<ResearchBlogPage />} />
          <Route path="/blog/:category/:id" element={<BlogPost />} />
          {/* 其他现有路由 */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ... 其他路由 ... */}
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;