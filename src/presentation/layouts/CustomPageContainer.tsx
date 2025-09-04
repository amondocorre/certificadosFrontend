import { styled } from "@mui/material";
import { PageContainer } from "@toolpad/core";

export const CustomPageContainer = styled(PageContainer)(({ theme }) => ({
  backgroundColor: '#f5f5f5', //f5f5f5 Color de fondo gris claro
  borderRadius: theme.spacing(1), // Bordes redondeados
  maxWidth: '99.5%', // Reducimos el ancho máximo
  '& .MuiTypography-h4': {display: 'none',},
  '& .MuiBox-root': {marginTop: '5px'},
  '& .MuiStack-root': {marginTop: '0px',
    '& .MuiStack-root':{display: 'none',}
  },
  height: 'calc(100vh - 100px)', 
  overflow: 'auto', 
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', 
}));