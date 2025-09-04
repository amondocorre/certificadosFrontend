import React from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';

interface ScrollableBoxProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const StyledScrollableBox = styled(Box)(({ theme}) => ({
  maxHeight: 'calc(85vh - 60px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const ScrollableBox: React.FC<ScrollableBoxProps> = ({children,sx}) => {
  const combinedSx: SxProps<Theme> = { ...sx };
  return (
    <StyledScrollableBox
      sx={combinedSx}
    >
      {children}
    </StyledScrollableBox>
  );
};

export default ScrollableBox;