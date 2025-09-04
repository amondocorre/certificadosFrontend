import React, { useState } from 'react';
import {Box,Typography,Grid,Paper,useTheme} from '@mui/material';
import { Calendar, DiaCalendario, EstructuraCalendario } from '../../../../domain/models/CalendarModel';
import ModalDate from './ModalDate';
import { Button } from '../../../../domain/models/ButtonModel';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { formatDate } from '../../../utils/dateUtils';
const diasSemana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface CalendarioMensualProps {
  estructura: EstructuraCalendario;
  handleUpdateDate(diaCalendario:DiaCalendario):Promise<boolean>
  buttons:Button[];
}
const CalendarioMensual: React.FC<CalendarioMensualProps> = ({ estructura,handleUpdateDate,buttons}) => {
  const { mes, año, semanas } = estructura;
  const theme = useTheme();
  const [selectDate, setSelectDate] = useState<DiaCalendario|null>(null)
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal=(diaCalendario:DiaCalendario)=>{
    setSelectDate(diaCalendario);
    setOpenModal(true);
  }
  const handleCloseModal=()=>{
    setOpenModal(false);
  }
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 1,p:0.5,border: '1px solid #1976d2',borderRadius: '8px'}}>
      <Grid container spacing={{xs:0.1,sm: 1, md: 1}}>
        <Grid sx={{background:'#f5685eff'}} size={12}>
          <Typography variant="subtitle2" align="center" >
          {mes}{'  '}{año}
        </Typography>
        </Grid>
        {diasSemana.map((dia, idx) => (
          <Grid key={idx} size={12 / 7}>
            <Paper elevation={2} sx={{textAlign: 'center',alignContent:'center', backgroundColor: theme.palette.grey[400] }}>
              <Typography variant="subtitle2">{dia}</Typography>
            </Paper>
          </Grid>
        ))}
        {semanas.map((semana, i) =>
          semana.map((dia: DiaCalendario, j) =>{
            const fechaActual = formatDate(String(dayjs()))
            let bgColor ='#fff'
            if(dia.es_fin_de_semana === '1') bgColor= theme.palette.grey[100]
            if(dia.es_feriado === '1') bgColor='#fcc6ceff'
            if(fechaActual===dia.fecha) bgColor='#1f6f9cff'
            return (
              <Grid key={`${i}-${j}`} size={12 / 7}>
                <Paper
                  elevation={1}
                  onClick={()=>{
                    if(dia?.fecha){
                      handleOpenModal(dia)
                    }
                  }}
                  sx={{
                    p: 0,
                    minHeight: {xs:20,sm:30, md:30},
                    height: {xs:20,sm:30, md:30},
                    cursor:'pointer',
                    textAlign:'center',
                    alignContent:'center',
                     backgroundColor:bgColor,
                    '&:hover': {backgroundColor: '#52baf7ff',},
                    color: dia.es_laboral === '0' || dia.dia_mes=='0'? theme.palette.text.disabled : theme.palette.text.primary
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {dia.fecha?parseInt((dia?.fecha?.split('-')[2]), 10)//new Date(dia.fecha).getDate()
                    :' '}
                  </Typography>
                </Paper>
              </Grid>
            );})
        )}
      </Grid>
      {
        <ModalDate 
          onClose={handleCloseModal}
          open={openModal}
          diaCalendario={selectDate}
          buttons={buttons}
          updateDate={handleUpdateDate}
        />
      }
    </Box>
  );
};

export default CalendarioMensual;
