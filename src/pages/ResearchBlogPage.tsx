import React from 'react';
import BlogList from '../components/BlogList';
import { getBlogPostsByCategory } from '../data/blogPosts';

const ResearchBlogPage: React.FC = () => {
  const posts = getBlogPostsByCategory('research');
  
  return (
    <BlogList 
      posts={posts} 
      category="research" 
      title="重要研究见解" 
    />
  );
};

export default ResearchBlogPage;