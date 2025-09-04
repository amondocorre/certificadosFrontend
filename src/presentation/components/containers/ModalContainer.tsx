import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface containersProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Prop opcional para estilos adicionales
}

const ModalContainer: React.FC<containersProps> = ({ children, sx }) => {
  const defaultSx: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
  };

  const combinedSx: SxProps<Theme> = { ...defaultSx, ...sx };

  return (
    <Box sx={combinedSx}>
      {children}
    </Box>
  );
};

export default ModalContainer;