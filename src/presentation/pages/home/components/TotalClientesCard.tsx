import React from 'react';
import { Card, CardContent, Typography,Box ,Avatar} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import GroupIcon from '@mui/icons-material/Group';

interface TotalClientesCardProps {
  total: number;
  masculino: number;
  femenino: number;
}

const TotalClientesCard: React.FC<TotalClientesCardProps> = ({ total,masculino,femenino }) => {
  return (
     <Card sx={{ p: 2,width:'100%',height:'100%' }}>
        <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" color="textSecondary" gutterBottom align='center'>
                CLIENTES
              </Typography>
              <Typography variant="h2" align='center'>
                {total}
              </Typography>
              <Typography variant="h5" color="textSecondary" align='center'>
                  <MaleIcon color="primary" /> {masculino}  
                  <FemaleIcon color="secondary" />{femenino}
              </Typography>
            
            </Box>
            
            {/* Ícono a la derecha */}
            <Avatar
                sx={{
                  bgcolor: 'orange',
                  width: 48,
                  height: 48,
                }}
              >
              <GroupIcon fontSize="medium" />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
  );
};

export default TotalClientesCard;
