import React from 'react';
import { Card, CardContent, Typography,Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { MedicalInformation } from '@mui/icons-material';
import { Psychology } from '@mui/icons-material';

interface TotalClientesCardProps {
  total: number;
  masculino: number;
  femenino: number;
  tipo:string;
}

const TotalClientesCard: React.FC<TotalClientesCardProps> = ({ total,masculino,femenino,tipo }) => {
  return (
     <Card sx={{ p: 0,width:'100%',height:'100%' }}>
        <CardContent>
        <Box display="flex" justifyContent="center" flexDirection={'column'} alignItems="center">
            <Box display="flex" justifyContent="center" flexDirection={'row'} alignItems="center">
              {tipo==='1' && <MedicalInformation fontSize="large" color='info'/>}
              {tipo==='2' && <Psychology fontSize="large" color='secondary'/>}
              <Typography variant="h6" color="textSecondary" gutterBottom align='center'>
              {tipo==='1'?'Evaluacion Medica':'Evaluacion Psicologica'}
            </Typography>
            </Box>
            <Typography variant="h2" align='center'>
              {total}
            </Typography>
            {tipo==='1' && 
            <Typography variant="h5" color="textSecondary" align='center'>
                <MaleIcon color="primary" /> {masculino}  
                <FemaleIcon color="secondary" />{femenino}
            </Typography>}
          </Box>
        </CardContent>
      </Card>
  );
};

export default TotalClientesCard;
