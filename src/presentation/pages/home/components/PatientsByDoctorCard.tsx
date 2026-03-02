import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EvaluationsByDoctor } from '../../../../domain/models/DashboardModel';
import dayjs, { Dayjs } from 'dayjs';

interface PatientsByDoctorCardProps {
  data: EvaluationsByDoctor[];
  selectedDate: Dayjs;
  onChangeDate: (date: Dayjs) => void;
}

const numberFormatter = new Intl.NumberFormat('es-BO');

const PatientsByDoctorCard: React.FC<PatientsByDoctorCardProps> = ({ data, selectedDate, onChangeDate }) => {
  const totalPacientes = data.reduce((acc, item) => acc + Number(item.total ?? 0), 0);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">
              Pacientes atendidos por doctor
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Total general: {numberFormatter.format(totalPacientes)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DesktopDatePicker
                label="Selecciona una fecha"
                value={selectedDate}
                format="DD/MM/YYYY"
                maxDate={dayjs()}
                onChange={(date) => {
                  if (date) {
                    onChangeDate(date);
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        {data.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center">
            Aún no se registran atenciones en la fecha seleccionada.
          </Typography>
        ) : (
          <List dense disablePadding sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {data.map((item) => (
              <ListItem
                key={`doctor-${item.id_usuario}-${item.nombre_doctor}`}
                sx={{
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 1
                }}
              >
                <ListItemAvatar>
                  <PersonIcon color="primary" />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 600 }}
                  primary={item.nombre_doctor || 'Sin registro'}
                  secondary={`ID usuario: ${item.id_usuario || 'N/D'}`}
                />
                <Chip
                  color="primary"
                  label={`${numberFormatter.format(item.total || 0)} pacientes`}
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientsByDoctorCard;
