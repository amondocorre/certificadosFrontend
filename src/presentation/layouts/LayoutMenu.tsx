import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import { userContainer } from '../../di/userContainer';
import HeaderPage from '../components/containers/HeaderPage';
import { Grid, Typography } from '@mui/material';
import { Loading } from '../components/Loading';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const LayoutMenu: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(currentMenuItem){
    }
  },[currentMenuItem])
  
  return (
    <div>
      <HeaderPage>
      <Grid
        size={{
          xs: 6.5,
          sm: 7,
          md: 8
        }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
      </HeaderPage>
      <div>
      </div>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default LayoutMenu;