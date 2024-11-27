import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchImages = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      // Using Lorem Picsum API for random images
      const imageCount = 12; // Number of images to display
      const imageList = Array.from({ length: imageCount }, (_, index) => ({
        id: index,
        link: `https://picsum.photos/400/300?random=${index + Date.now()}`,
        title: `Random Image ${index + 1}`
      }));
      
      setImages(imageList);
    } catch (err) {
      setError('Error fetching images. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Random Image Search
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter any text to get random images..."
            sx={{ maxWidth: 600 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchImages();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={searchImages}
            disabled={loading}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={image.link}
                  alt={image.title}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ImageSearch;
