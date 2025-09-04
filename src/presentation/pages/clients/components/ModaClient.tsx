import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { CloseButton } from '../../../components/buttons/CloseButton';
import ModalContainer from '../../../components/containers/ModalContainer';
import ScrollableBox from '../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../components/containers/ContainerButtons';
import { Client } from '../../../../domain/models/ClientModel';
import ActionButton from '../../../components/buttons/ActionButton';
import MapComponent from '../../../components/inputs/MapContainer';
import CustomDatePicker from '../../../components/inputs/CustomDatePicker';
import { formatDate } from '../../../utils/dateUtils';
import { Button } from '../../../../domain/models/ButtonModel';
import CustomImageUpload from '../../../components/inputs/CustomImageUpload';
const validationSchema = yup.object().shape({
  nombres: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().nullable(),
  ci:yup.string().required('El ci es obligatorio'),
  es_empresa:yup.string().required(''),
  telefono: yup.string().required('El teléfono es obligatorio'),
  //fechaNacimiento: yup.string().required('La fecha nacimiento es obligatorio'),
  direccion: yup.string().required('La dirección es obligatoria'),
  direccion_gps: yup.string().required('La dirección GPS es obligatoria'),
  foto_ciA: yup.string().required('se requiere una fotografia'),
  foto_ciB: yup.string().required('se requiere una fotografia'),
});
interface UserFormProps {
  open: boolean;
  onClose: () => void;
  createClient: (data: Client) => void;
  updateClient: (data: Client) => void;
  deleteClient: (id: number) => void;
  activateClient: (id: number) => void;
  client?: Client | null;
  buttons:Button[];
  tipo:string;
}
const ModalClient: React.FC<UserFormProps> = ({ open, onClose, createClient,updateClient,deleteClient,activateClient,buttons, client,tipo='1'}) => {
  const defaultLocation = { lat: -17.3936, lng: -66.1571 };
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const initialMapPosition = client?.direccion_gps
    ? {
        lat: parseFloat(client.direccion_gps.split(',')[0]),
        lng: parseFloat(client.direccion_gps.split(',')[1]),
      }
    : defaultLocation;
  const { handleSubmit, control, formState: { errors }, reset, setValue,getValues } = useForm<Client>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      es_empresa:    '0',
      nombres:      '',
      ap_paterno:    '',
      ap_materno:    '',
      ci:           '',
      correo:      '',  
      telefono:     '',
      fecha_nacimiento: null,
      direccion_gps: '',
      direccion:    '',
      foto_ciA:      '',
      foto_ciB:      '',
    },
  }
  });
  useEffect(() => {
    reset();
    if (client) {
      Object.keys(client).forEach((key:any) => {
        //if(key !== 'foto_ciA' && key !== 'foto_ciB'){
          setValue(key, (client[key as keyof Client] ?? null));
        //}
      });
    }
  }, [client, open]);
  useEffect(() => {
    if (client?.direccion_gps) {
      setValue('direccion_gps', client.direccion_gps);
    }
  }, [client, setValue]);

  const handleMapPositionChange = (newPosition: L.LatLngLiteral) => {
    setValue('direccion_gps', `${newPosition.lat},${newPosition.lng}`);
  };

  const handleCreate = useCallback(async () => {
    const foto_ciA = document.getElementById('image-upload-foto_ciA') as HTMLInputElement;
    const foto_ciB = document.getElementById('image-upload-foto_ciB') as HTMLInputElement;
    let fileCIA = foto_ciA.files?.[0];
    let fileCIB = foto_ciB.files?.[0];
    await handleSubmit((data: Client) => {
    data.file_ciA = fileCIA;
    data.file_ciB= fileCIB;
    data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
    createClient(data)})();
  }, []);
  const handleUpdate = useCallback(async () => {
    const foto_ciA = document.getElementById('image-upload-foto_ciA') as HTMLInputElement;
    const foto_ciB = document.getElementById('image-upload-foto_ciB') as HTMLInputElement;
    let fileCIA = foto_ciA.files?.[0];
    let fileCIB = foto_ciB.files?.[0];
    await handleSubmit((data: Client) =>{
      data.file_ciA = fileCIA;
      data.file_ciB= fileCIB;
      data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
      updateClient(data)})();
  }, []);
  const handleDeleted = useCallback(async()=>{
    const id:number = Number(getValues('id_cliente'));
    await deleteClient(id)
  },[])
  const handleActivate= useCallback(async()=>{
    const id:number = Number(getValues('id_cliente'));
    await activateClient(id)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate: handleActivate,
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
            {'Formulario de Cliente'}
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
                    xs: 6,
                    sm: 6
                  }}>
                  <CustomImageUpload
                    defaultValue={client?.foto_ciA?client?.foto_ciA:''}
                    name="foto_ciA"
                    control={control}
                    disabled={!(stateUpdate || !client)}
                    label="Subir foto_ciA"
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 6,
                    sm: 6
                  }}>
                  <CustomImageUpload
                    defaultValue={client?.foto_ciB?client?.foto_ciB:''}
                    name="foto_ciB"
                    control={control}
                    disabled={!(stateUpdate || !client)}
                    label="Subir foto_ciB"
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="nombres"
                    control={control}
                    label="Nombres"
                    placeholder="Ingrese el nombre"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="ap_paterno"
                    control={control}
                    label="Apellido Paterno"
                    placeholder="Ingrese el apellido paterno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="ap_materno"
                    control={control}
                    label="Apellido Materno"
                    placeholder="Ingrese el apellido materno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="ci"
                    control={control}
                    label="Cédula de Identidad"
                    placeholder="Ingrese el CI"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Badge/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="correo"
                    control={control}
                    label="Correo Electrónico"
                    placeholder="Ingrese el correo"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.EmailSharp/>}
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
                    label="Teléfono"
                    type='number'
                    placeholder="Ingrese el número de teléfono"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Phone/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6
                  }}>
                  <CustomTextField
                    name="profesion"
                    control={control}
                    label="Profesión"
                    placeholder="Ingrese la profesión"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6
                  }}>
                  <CustomDatePicker
                    name="fecha_nacimiento" 
                    control={control} 
                    label="Fecha de Nacimiento" 
                    disabled={!(stateUpdate || !client)}
                    // icon={<CalendarMonthIcon />} 
                  />
                </Grid> 
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="direccion"
                    control={control}
                    label="Dirección"
                    placeholder="Ingrese su dirección"
                    disabled={!(stateUpdate || !client)}
                  />
                </Grid>
                <Grid size={12}>
                  <MapComponent
                    control={control}
                    initialPosition={initialMapPosition}
                    onPositionChange={handleMapPositionChange}
                    disabled={!(stateUpdate || !client)}
                    name='direccion_gps'
                    label='Ubicación GPS'
                  />
                </Grid>
              </Grid>
            </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              icon={<MUIcons.CancelTwoTone/>}
              onClick={handleClose}
            />
            {tipo==='1' && 
              buttons.filter((button: Button) => (client?.id_status === '1' && button.nombre !== 'activate') || 
                                                  (client?.id_status === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                  (client?.id_status !== '1' && client?.id_status !== '0'))
                                                  .map((button: any,index:number) => {
                if (client?.id_cliente && button?.tipo === 'table') {
                  const IconComponent = MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label;
                  return (
                    <ActionButton
                      key={`header-button-${button.id || index}`}
                      type={button?.nombre}
                      icon={<IconComponent/>}
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
                } else if (!client?.id_cliente && button?.tipo === 'header' && button?.nombre === 'create') {
                  return (
                    <ActionButton
                      key={`table-button-${button.id || index}`}
                      type={button?.nombre}
                      icon={<MUIcons.SaveAs/>}
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
              })
            }
            {
              tipo==='2' && 
              <ActionButton
                key={`table-button-create`}
                type='create'
                icon={<MUIcons.SaveAs/>}
                onClick={ handleCreate} 
                />
            }
          </ContainerButtons>
        </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalClient;