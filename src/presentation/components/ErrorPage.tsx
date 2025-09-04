import { Box, Typography, Link, ImageList, ImageListItem } from '@mui/material';
import siteNotFoundImage from '../../imagenes/site-not-found.png';
const ErrorPage = () => {
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
      <Typography variant="h4" gutterBottom>
        Sitio No Encontrado
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        No pudimos cargar esta página.{/*'Bueno... esto es incómodo. El sitio que estás buscando no está disponible.'*/}
      </Typography>
      {/*<Typography variant="body2" color="textSecondary">
        ¿Es tu sitio?{' '}
        <Link href="#" underline="hover">
          Obtén más información
        </Link>{' '}
        o{' '}
        <Link href="#" underline="hover">
          contacta al soporte
        </Link>.
      </Typography>*/}
      <Typography variant="caption" sx={{ mt: 4, color: 'text.disabled' }}>
         © 2025
      </Typography>
    </Box>
  );
};

export default ErrorPage;
