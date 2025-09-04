import React, { memo} from 'react';
import {Box,Grid} from '@mui/material';
import {palette} from '../../utils/palette'
interface HeaderPageProps {
  children: React.ReactNode; 
}
const HeaderPage: React.FC<HeaderPageProps> = memo(({ children }) => {
  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Box sx={{ bgcolor: palette.secondary.main, color: 'white', borderRadius: '5px', paddingInline: '5px' }}>
        <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {children} 
        </Grid>
      </Box>
    </Box>
  );
}
)
export default memo(HeaderPage);