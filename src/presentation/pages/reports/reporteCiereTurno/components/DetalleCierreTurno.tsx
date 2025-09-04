import {Box,Paper,} from '@mui/material';
import { Container } from '@mui/system';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import * as MUIcons from '@mui/icons-material';
import { formatDateDMY, formatTime12H } from '../../../../utils/dateUtils';
const DetalleCierreTurno =(Props:any) =>{
  const {report,imprimimirCierreTurno}=Props;
return(
  <Container  maxWidth="xs" sx={{padding:0,margin:0}}>
    <Paper
      elevation={1}
      sx={{padding:0,margin:0,paddingBottom: 1,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',border: '1px solid #1976d2', borderRadius: '8px'}}>
      <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',paddingInline:1,width: "100%"}}>
        <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center',}}>
          <StyledHeaderSecondary sx={{ mb: 0 }}>
            Datos del reporte
          </StyledHeaderSecondary>
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'start',}}>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Sucursal:</strong> {(report?.sucursal)}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>usuario:</strong> {report?.usuario}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Fecha/Hora Ingreso: </strong> {report.fecha_apertura?String(formatDateDMY(report.fecha_apertura))+'  '+String(formatTime12H(report.fecha_apertura)):''}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Fecha/Hora Salida: </strong> {report.fecha_cierre?String(formatDateDMY(report.fecha_cierre))+'  '+String(formatTime12H(report.fecha_cierre)):''}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Total Ingresos: </strong> {report?.ingresos}{' Bs.'}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Total Egreso: </strong> {report?.egresos}{' Bs.'}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Total Transferencia: </strong> {report?.transferencia}{' Bs.'}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Saldo Teorico: </strong> {report?.saldoTeorico}{' Bs.'}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Total Entregado: </strong> {report?.saldoReal}{' Bs.'}
          </StyledHeaderSecondary>
          <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
            <strong>Descuadre: </strong> {report?.descuadre}{' Bs.'}
          </StyledHeaderSecondary>
          <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center',}}>
            <StyledHeaderSecondary variant="h2" sx={{ mb: 1 }}>
              <strong>Accion: </strong>
            </StyledHeaderSecondary>
             <MUIcons.PrintSharp sx={{ml:2, mt:0,fontSize:30,cursor:'pointer'}} onClick={()=>{imprimimirCierreTurno(Number(report.id))}}/>
          </Box>
        </Box>
      </Box>
    </Paper>
</Container>
)
}
export default DetalleCierreTurno;