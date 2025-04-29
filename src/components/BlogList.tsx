import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import { Box, Container, Typography, Card, CardContent, CardMedia, Grid, Chip, Stack } from '@mui/material';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface BlogListProps {
  posts: BlogPost[];
  category: 'science' | 'research';
  title: string;
}

const BlogList: React.FC<BlogListProps> = ({ posts, category, title }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {title}
      </Typography>
      
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                }
              }}
            >
              {post.coverImage && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.coverImage}
                  alt={post.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  <Link 
                    to={`/blog/${category}/${post.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {post.title}
                  </Link>
                </Typography>
                
                {post.summary && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.summary}
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  {post.author && (
                    <Typography variant="body2" color="text.secondary">
                      作者: {post.author}
                    </Typography>
                  )}
                  
                  {post.publishDate && (
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(post.publishDate), 'yyyy年MM月dd日', { locale: zhCN })}
                    </Typography>
                  )}
                </Box>
                
                {post.tags && post.tags.length > 0 && (
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    {post.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList;