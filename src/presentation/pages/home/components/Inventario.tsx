import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { TotalInventario } from '../../../../domain/models/DashboardModel';
import DonutHalfChart from './DonutHalfChart';
interface IneventarioProps {
  data: TotalInventario[];
}
const Inventrio: React.FC<IneventarioProps> = ({ data }) => {
  return (
    <Card key={'inv_Card'} sx={{ p: 1, width: '100%', display: 'flex', flexDirection: 'row',background:'#ece9eaff'}}>
      <Grid container spacing={1} sx={{pt:0}} >
        {data.map((producto:any,index:number)=>{
          const tam = producto.es_combo=='1'?4:2;
          return (
            <Grid
              sx={{ display: 'flex', flexDirection: 'row' }}
              size={{
                xs: tam*2,
                md: tam
              }}>
              <Card key={index+'_card'}
                sx={{
                  pt: 2,
                  width: '100%',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '0px solid #B0B0B0',
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      fontSize: { xs: '0.6em', sm: '0.7em', md: '1.1em' },
                      lineHeight: 1.2,
                      fontWeight: 500,
                      textTransform: 'lowercase',
                      '::first-letter': {
                        textTransform: 'uppercase',
                      },
                    }}
                  >
                    {producto.nombre}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <DonutHalfChart key={index}
                  enUso={Number(producto.en_uso)}
                  stock={Number(producto.stock)}
                  total={Number(producto.total)}
                  />
                </Box>
              </Card>
            </Grid>
          );})}
      </Grid>
    </Card>
  );
};

export default Inventrio;