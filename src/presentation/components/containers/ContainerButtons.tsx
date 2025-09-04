import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface FlexEndBoxProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>; 
  spacing?: number | string; 
}

const ContainerButtons: React.FC<FlexEndBoxProps> = ({ children, sx, spacing = 2 }) => {
  const defaultSx: SxProps<Theme> = {
    mt:2,
    pr:2,
    pl:2,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing, 
  };
  const combinedSx: SxProps<Theme> = { ...defaultSx, ...sx };
  return (
    <Box sx={combinedSx}>
      {children}
    </Box>
  );
};

export default ContainerButtons;