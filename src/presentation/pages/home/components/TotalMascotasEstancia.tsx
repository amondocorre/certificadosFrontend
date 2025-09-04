import React from 'react';
import { Card, CardContent, Typography,Box ,Avatar} from '@mui/material';

//import PeopleIcon from '@mui/icons-material/People'; // Ícono representativo de clientes
import PetIcon from '@mui/icons-material/Pets';
import InputIcon from '@mui/icons-material/Input';


interface TotalMascotasEstanciaProps {
  total: number;
  
}

const TotalMascotasEstancia: React.FC<TotalMascotasEstanciaProps> = ({total}) => {
  return (
     <Card sx={{ p: 2 }}>
        <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" color="textSecondary" gutterBottom align='center'>
                MASCOTAS
              </Typography>
              
              <Typography variant="h2" align='center'>
                {total}
              </Typography>
               <Typography variant="h7" color="textSecondary" align='center'>
                  <InputIcon color="primary" /> En estancia  
                  
              </Typography>
              
            
            </Box>
            
            {/* Ícono a la derecha */}
            <Avatar
                sx={{
                  bgcolor: 'red',
                  width: 48,
                  height: 48,
                }}
              >
              <PetIcon fontSize="medium" />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
  );
};

export default TotalMascotasEstancia;
