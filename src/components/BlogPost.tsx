import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types/blog';
import { getBlogPostById } from '../data/blogPosts';
import { Container, Typography, Box, Chip, Divider, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const BlogPost: React.FC = () => {
  const { id, category } = useParams<{ id: string, category: string }>();
  const navigate = useNavigate();
  
  const post = getBlogPostById(id || '');
  
  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center">
          文章未找到
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
        </Box>
      </Container>
    );
  }
  
  const getCategoryPath = () => {
    if (post.category === 'science') return '/science';
    if (post.category === 'research') return '/research';
    return '/';
  };
  
  const getCategoryName = () => {
    if (post.category === 'science') return '科学思辨、逻辑推演与形而上学';
    if (post.category === 'research') return '重要研究见解';
    return '';
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(getCategoryPath())}
        sx={{ mb: 3 }}
      >
        返回{getCategoryName()}
      </Button>
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {post.author && (
            <Typography variant="subtitle1" color="text.secondary">
              作者: {post.author}
            </Typography>
          )}
          
          {post.publishDate && (
            <Typography variant="subtitle1" color="text.secondary">
              发布于: {format(new Date(post.publishDate), 'yyyy年MM月dd日', { locale: zhCN })}
            </Typography>
          )}
        </Box>
        
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        )}
        
        <Divider sx={{ mb: 3 }} />
        
        <Box className="blog-content" sx={{ 
          '& img': { 
            maxWidth: '100%', 
            height: 'auto',
            display: 'block',
            margin: '20px auto'
          },
          '& iframe': {
            width: '100%',
            height: '400px',
            margin: '20px 0'
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            mt: 3,
            mb: 2
          },
          '& p': {
            mb: 2,
            lineHeight: 1.7
          },
          '& audio': {
            width: '100%',
            margin: '20px 0'
          }
        }}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPost;