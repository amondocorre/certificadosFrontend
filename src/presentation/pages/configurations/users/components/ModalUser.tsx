import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import {AccountCircle as AccountCircleIcon,Badge as BadgeIcon,Email as EmailIcon,Phone as PhoneIcon,Smartphone as SmartphoneIcon,CalendarMonth as CalendarMonthIcon,LocationOn as LocationOnIcon,Close as CloseIcon,} from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import { User } from '../../../../../domain/models/User';
import MapComponent from '../../../../components/inputs/MapContainer';
import CustomDatePicker from '../../../../components/inputs/CustomDatePicker';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import CustomSelect from '../../../../components/inputs/CustomSelect';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import { Perfil } from '../../../../../domain/models/PerfilModel';
import CustomImageUpload from '../../../../components/inputs/CustomImageUpload';
import ActionButton from '../../../../components/buttons/ActionButton';
import { formatDate } from '../../../../utils/dateUtils';
import { Button } from '../../../../../domain/models/ButtonModel';
const estadoOptions = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
  { value: 'Pendiente', label: 'Pendiente' },
];
const sexoOptions = [
  { value: "F", label: "Femenino" },
  { value: "M", label: "Masculino" },
  { value: "O", label: "Otro" },
];

const validationSchema = yup.object().shape({
  id_perfil: yup.string().required('El perfil es obligatorio'),
  nombre: yup.string()
  .required('El nombre es obligatorio')
  .min(10, 'El nombre no puede tener menos de 10 caracteres'),

  email: yup.string().email('Ingrese un email válido').required('El email es obligatorio'),
  telefono: yup.string().nullable(),
  celular: yup.string().nullable(),
  estado: yup.string().oneOf(['Activo', 'Inactivo']).default('Activo'),
  fecha_ingreso: yup.string().nullable(),
  fecha_baja: yup.string().nullable(),
  sueldo: yup.number().nullable(),
  usuario: yup.string().required('El usuario es obligatorio')
  .min(6, 'El usuario no puede tener menos de 6 caracteres'),

  foto: yup.string().nullable(),
  ci: yup.string().nullable(),
  ext: yup.string().nullable(),
  complemento: yup.string().nullable(),
  sexo: yup.string().nullable(),
  fecha_nacimiento: yup.string().nullable(),
  direccion: yup.string().nullable(),
  ubicacion_gps: yup.string().nullable(),
});

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  createUser: (data: User) => void;
  updadeUser: (data: User) => void;
  deletedUser: (id: number) => void;
  activateUser: (id: number) => void;
  user?: User | null;
  listPerfil:Perfil[];
  buttons:Button[];
}
const ModalUser: React.FC<UserFormProps> = ({ open, onClose, createUser,updadeUser,deletedUser,activateUser,buttons, user,listPerfil}) => {
  const defaultLocation = { lat: -17.3936, lng: -66.1571 };
  const optionPerfil: any[] = listPerfil.filter((perfil): perfil is Perfil => !!perfil).map((perfil) => ({value: perfil.id,label: perfil.nombre,}));
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const initialMapPosition = user?.ubicacion_gps
    ? {
        lat: parseFloat(user.ubicacion_gps.split(',')[0]),
        lng: parseFloat(user.ubicacion_gps.split(',')[1]),
      }
    : defaultLocation;

  const { handleSubmit, control, formState: { errors }, reset, setValue,getValues } = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      id_perfil: '',
      nombre: '',
      email: '',
      telefono: null,
      celular: null,
      estado: 'Activo',
      fecha_ingreso: '',
      fecha_baja: null,
      sueldo: 0.0,
      usuario: '',
      foto: '',
      ci: '',
      ext: '',
      complemento: '',
      sexo: '',
      fecha_nacimiento: null,
      direccion: '',
      ubicacion_gps: '',
    },
  }
  });
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key:any) => {
        setValue(key, (user[key as keyof User] ?? null));
      });
      let userData =user;
    }
  }, [user, setValue,open]);
  useEffect(() => {
    if (user?.ubicacion_gps) {
      setValue('ubicacion_gps', user.ubicacion_gps);
    }
  }, [user, setValue]);

  const handleMapPositionChange = (newPosition: L.LatLngLiteral) => {
    setValue('ubicacion_gps', `${newPosition.lat},${newPosition.lng}`);
  };

  const handleCreate = useCallback(async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    let file = fileInput.files?.[0];
      await handleSubmit((data: User) => {
        data.file = file;
        data.fecha_ingreso = formatDate(data.fecha_ingreso);
        data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
        createUser(data)
      })();
  }, []);
  const handleUpdate = useCallback(async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file:File|undefined = fileInput.files?.[0]; 
    await handleSubmit((data: User) =>{
      data.file = file;
      updadeUser(data)
    })();
  }, []);
  const handleDeleted = useCallback(async()=>{
    const id_usuario:number = Number(getValues('id_usuario'));
    await deletedUser(id_usuario)
  },[])
  const handleActivate = useCallback(async()=>{
    const id_usuario:number = Number(getValues('id_usuario'));
    await activateUser(id_usuario)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate:handleActivate
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Usuario'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                sm: 12
              }}>
              <CustomImageUpload
                defaultValue={user?.foto?user?.foto:''}
                name="foto"
                control={control}
                disabled={!(stateUpdate || !user)}
                label="Subir foto de perfil"
              />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomSelect 
                  control={control} 
                  name="id_perfil" 
                  label="Perfil" 
                  options={optionPerfil}
                  disabled={!(stateUpdate || !user)}
                  placeholder="Selecciona un perfil" 
                  icon={<BadgeIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nombre" 
                  control={control} 
                  label="Nombre completo" 
                  placeholder="Ingrese su nombre" 
                  disabled={!(stateUpdate || !user)}
                  icon={<AccountCircleIcon />} 
                />
              </Grid>
              <Grid size={12}>
                <CustomTextField 
                  name="email" 
                  control={control} 
                  label="Email" 
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese su correo electrónico" 
                  icon={<EmailIcon />} 
                  type="email" 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="usuario" 
                  control={control} 
                  label="Usuario" 
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese su nombre de usuario" 
                  icon={<AccountCircleIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="telefono" 
                  control={control} 
                  label="Teléfono (Opcional)" 
                  type='number'
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese su número de teléfono" 
                  icon={<PhoneIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="celular" 
                  control={control} 
                  label="Celular (Opcional)" 
                  type='number'
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese su número de celular" 
                  icon={<SmartphoneIcon />} 
                />
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <CustomSelect 
                  control={control} 
                  name="estado" 
                  label="Estado" 
                  options={estadoOptions} 
                  icon={<SmartphoneIcon />} 
                  disabled={!(stateUpdate || !user)}
                />
              </Grid>*/}
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="ci" 
                  control={control} 
                  label="CI"
                  disabled={!(stateUpdate || !user)} 
                  placeholder="Ingrese su carnet de identidad" 
                  icon={<BadgeIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <CustomTextField 
                  name="ext" 
                  control={control} 
                  label="Ext. (Opcional)" 
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese la extensión" 
                  icon={<BadgeIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <CustomTextField 
                  name="complemento" 
                  control={control} 
                  label="Complemento (Opcional)" 
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese el complemento" 
                  icon={<BadgeIcon />} 
                />
              </Grid>  
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomSelect 
                  control={control} 
                  name="sexo" 
                  label="género (Opcional)" 
                  options={sexoOptions}
                  disabled={!(stateUpdate || !user)}
                  placeholder="Selecciona su género" 
                  icon={<BadgeIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomDatePicker 
                  name="fecha_nacimiento" 
                  control={control} 
                  label="Fecha de Nacimiento" 
                  disabled={!(stateUpdate || !user)}
                  icon={<CalendarMonthIcon />} 
                />
              </Grid>            
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomDatePicker 
                  name="fecha_ingreso" 
                  control={control} 
                  label="Fecha Ingreso" 
                  disabled={!(stateUpdate || !user)}
                  icon={<CalendarMonthIcon />} 
                />
              </Grid>
              <Grid size={12}>
                <CustomTextField 
                  name="direccion" 
                  control={control} 
                  label="Dirección (Opcional)" 
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese su dirección" 
                  icon={<LocationOnIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="sueldo" 
                  control={control} 
                  label="Sueldo (Opcional)" 
                  type='number'
                  disabled={!(stateUpdate || !user)}
                  placeholder="Ingrese el sueldo" 
                  icon={<PhoneIcon />} 
                />
              </Grid>
              <Grid size={12}>
                <MapComponent
                  control={control}
                  initialPosition={initialMapPosition}
                  onPositionChange={handleMapPositionChange}
                  disabled={!(stateUpdate || !user)}
                />
              </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (user?.estado === 'Activo' && button.nombre !== 'activate') || 
                                                            (user?.estado === 'Inactivo' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                            (user?.estado !== 'Activo' && user?.estado !== 'Inactivo')).map((button: any,index:number) => {
              if (user?.id_usuario && button?.tipo === 'table') {
                return (
                  <ActionButton
                    key={`header-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={() => {
                      if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                        actionHandlers[button.onclick](); 
                      } else if (typeof button.onclick === 'function') {
                        button.onclick();
                      }
                    }}
                    disabled={false} 
                  />
                );
              } else if (!user?.id_usuario && button?.tipo === 'header' && button?.nombre === 'create') {
                return (
                  <ActionButton
                    key={`table-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={ () => {
                      if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                        actionHandlers[button.onclick](); 
                      } else if (typeof button.onclick === 'function') {
                        button.onclick();
                      }
                    }}
                    disabled={false} 
                  />
                );
              }
              return null; 
            })}
          </ContainerButtons>
        </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalUser;