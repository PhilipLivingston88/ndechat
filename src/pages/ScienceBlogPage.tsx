import React from 'react';
import BlogList from '../components/BlogList';
import { getBlogPostsByCategory } from '../data/blogPosts';

const ScienceBlogPage: React.FC = () => {
  const posts = getBlogPostsByCategory('science');
  
  return (
    <BlogList 
      posts={posts} 
      category="science" 
      title="科学思辨、逻辑推演与形而上学" 
    />
  );
};

export default ScienceBlogPage;