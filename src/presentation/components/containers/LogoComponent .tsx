import React from 'react';
import { Box, Paper } from '@mui/material';

const LogoComponent = (logoUrl:string ) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Paper
        elevation={20}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          p: 2,
          border: '2px solid blue',
          borderRadius: '4px',
        }}
      >
        <img src={logoUrl} alt="Logo" />
      </Paper>
    </Box>
  );
};

export default LogoComponent;
