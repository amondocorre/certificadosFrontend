import React from 'react';
import { Box, styled } from '@mui/material';
import {palette} from '../../utils/palette'
interface ModalHeaderProps {
  children: React.ReactNode; 
}

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: palette.secondary.main, 
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  padding: 3,
  paddingLeft:10,
  paddingRight:0
}));
const ModalHeader: React.FC<ModalHeaderProps> = ({children}) => {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  );
};

export default ModalHeader;