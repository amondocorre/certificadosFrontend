import { Box, Typography,ImageList, ImageListItem, Button } from '@mui/material';
import siteNotFoundImage from '../../imagenes/site-not-found.png';
import { useNavigate } from 'react-router-dom';
const ErrorAccesPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '90vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 0,
      }}
    >
      <ImageList sx={{ width: {xs:200,md:400}, height:{xs:200,md:300} }} variant="woven" cols={1} >
        <ImageListItem>
          <img
            srcSet={`${siteNotFoundImage}`}
            src={`${siteNotFoundImage}`}
            alt={'img'}
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%',objectFit: 'contain',}}
          />
        </ImageListItem>
      </ImageList>
      <Typography variant="h3" color="error" gutterBottom>
        Acceso Denegado
      </Typography>
      <Typography variant="subtitle1" color="textDisabled" sx={{ mb: 3 }}>
        No tienes permiso para acceder a este sitio.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        sx={{
          textTransform: 'none',
          px: 4,
          py: 1.5,
          fontWeight: 'bold',
          borderRadius: 2,
        }}
        onClick={() => navigate(-1)}
      >
        Volver atrás
      </Button>
      <Typography variant="caption" sx={{ mt: 4, color: 'text.disabled' }}>
         © 2025
      </Typography>
    </Box>
  );
};

export default ErrorAccesPage;
