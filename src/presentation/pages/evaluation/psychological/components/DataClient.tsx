import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Grid,Box,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../components/buttons/ActionButton';
import CustomDatePicker from '../../../../components/inputs/CustomDatePicker';
import { formatDate } from '../../../../utils/dateUtils';
import { Button } from '../../../../../domain/models/ButtonModel';
import CustomImageUpload from '../../../../components/inputs/CustomImageUpload';
import CustomSelect from '../../../../components/inputs/CustomSelect';
import { escalasPsicologica, escalasPsicologicav2} from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { AlertError } from '../../../../components/alerts';
import { Exploration } from '../../../../../domain/models/Evaluation';
import CustomTextArea from '../../../../components/inputs/CustomTextArea';
import CustomImageOrCameraUpload from '../../../../components/inputs/CustomImageOrCameraUpload';
import CustomUploadOrCamera from '../../../../components/inputs/CustomUploadOrCamera';
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
  createClient: (data: any) => void;
  updateClient: (data: any) => void;
  getExploration:(exploration:Exploration)=>Promise<Exploration[]>
  createExploration:(exploration:Exploration)=>void;
  client?: any;
  buttons:Button[];
}
const DataClient: React.FC<UserFormProps> = ({ createClient,updateClient,getExploration,createExploration,buttons,client}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue,getValues } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      es_empresa:    '0',
      nombres:      '',
      ap_paterno:    '',
      ap_materno:    '',
      ci:           '',
      correo:      '',  
      telefono:     '',
      fecha: null,
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
        setValue(key, (client[key as keyof any] ?? null));
      });
    }else{
      setValue('sexo','')
    }
  }, [client]);
  const handleCreate = useCallback(async () => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];
    await handleSubmit((data: any) => {
    data.file = file;
    data.fecha = formatDate(data.fecha);
    createClient(data)})();
  }, []);
  const handleUpdate = useCallback(async () => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];
    await handleSubmit((data: any) =>{
      data.file = file;
      data.fecha = formatDate(data.fecha);
      updateClient(data)})();
  }, []);
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
  };

  return (
    
      <Box sx={{paddingY:0}}>
        <form >
          <ScrollableBox sx={{paddingTop:0}}>
            <DynamicAccordion
              key={'dotos-personales'}
              sx={{background:' #74b3e7ff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'A) DATOS PERSONALES'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container columnSpacing={1} rowSpacing={2} sx={{px:1,pb:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomUploadOrCamera
                    defaultValue={client?.foto?client?.foto:''}
                    name="foto"
                    control={control}
                    disabled={!(stateUpdate || !client)}
                    label="Subir foto"
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ap_paterno"
                    control={control}
                    label="Apellido Paterno"
                    placeholder="Ingrese el apellido paterno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ap_materno"
                    control={control}
                    label="Apellido Materno"
                    placeholder="Ingrese el apellido materno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="nombre"
                    control={control}
                    label="Nombres"
                    placeholder="Ingrese el nombre"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 1.2,sm: 1.2}}>
                  <CustomTextField
                    name="edad"
                    control={control}
                    label="Edad"
                    placeholder="Ingrese la edad"
                    disabled={!(stateUpdate || !client)}
                    //icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 1.8,sm: 1.8}}>
                  <CustomTextField
                    name="ci"
                    control={control}
                    label="CI"
                    placeholder="Ingrese el ci"
                    disabled={!(stateUpdate || !client)}
                    //icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>

                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="lugar_nacimiento"
                    control={control}
                    label="Lugar de Nacimiento"
                    placeholder="Ingrese lugar de nacimieno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.LocationOn/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomDatePicker
                    name="fecha_nacimiento" 
                    control={control} 
                    label="Fecha Nacimiento" 
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.CalendarMonth />} 
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="profeccion"
                    control={control}
                    label="Profecion"
                    placeholder="Ingrese la Ocupacion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Work/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomDatePicker
                    name="fecha_examen" 
                    control={control} 
                    label="Fecha Examen" 
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.CalendarMonth />} 
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="domicilio"
                    control={control}
                    label="Domicilio"
                    placeholder="Ingrese el domicilio"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.LocationCity/>}
                  />
                </Grid>
                <Grid size={{xs: 2,sm: 2}}>
                  <CustomTextField
                    name="numero_domicilio"
                    control={control}
                    label="N°"
                    disabled={!(stateUpdate || !client)}
                    placeholder='ingrese el numero'
                    icon={<MUIcons.Numbers/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="zona"
                    control={control}
                    label="Zona"
                    disabled={!(stateUpdate || !client)}
                    placeholder='ingrese la Zona'
                    icon={<MUIcons.PanoramaHorizontal/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="telefono"
                    control={control}
                    label="Telefono"
                    disabled={!(stateUpdate || !client)}
                    placeholder='ingrese el N° de telefono'
                    icon={<MUIcons.Phone/>}
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              key={'historia-familiar'}
              sx={{background:' #1fcbe9ff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'B) HISTORIA FAMILIAR'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomTextArea
                    name="historia_familiar"
                    control={control}
                    label="Historia Familiar :"
                    placeholder="Ingrese la historia familiar"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.SettingsBackupRestore/>}
                    rows={0}
                    minRows={2}
                  />
                </Grid>
              </Grid> 
            </DynamicAccordion>          
            <DynamicAccordion
              key={'examen-psicologica'}
              sx={{background:' #35e09fff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'C) EXAMEN PSICOLOGICO'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container columnSpacing={1} rowSpacing={2} sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomSelect
                    name="coordinacion_visomotora"
                    control={control}
                    label="Coordinacion Visomotora"
                    options={escalasPsicologica}
                    placeholder="Seleccione una opcion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomSelect
                    name="personalidad"
                    control={control}
                    label="Personalidad"
                    options={escalasPsicologica}
                    placeholder="Seleccione una opsion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomSelect
                    name="atencion_cognitiva"
                    control={control}
                    label="Atencion, concentracion, memoria y atencion"
                    options={escalasPsicologica}
                    placeholder="Seleccione una opsion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomSelect
                    name="reaccion_estres_riego"
                    control={control}
                    label="Prueba de reacción ante situaciones de estrés y riego"
                    options={escalasPsicologicav2}
                    placeholder="Seleccione una opsion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              key={'observacion'}
              sx={{background:' #1fcbe9ff'}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'F) OBSERVACIONES'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomTextArea
                    name="observacion"
                    control={control}
                    label="Observaciónes:"
                    placeholder="Ingrese las Observaciónes"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                    rows={0}
                    minRows={2}
                  />
                </Grid>
              </Grid> 
            </DynamicAccordion>
          </ScrollableBox>
          <ContainerButtons>
            {buttons.filter((button: Button) => (client?.id_status === '1' && button.nombre !== 'activate') || 
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
          </ContainerButtons>
        </form>
      </Box>
  );
};

export default DataClient;