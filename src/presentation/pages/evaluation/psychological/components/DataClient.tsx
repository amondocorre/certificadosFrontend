import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Grid,Box,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../components/buttons/ActionButton';
import CustomDatePicker from '../../../../components/inputs/CustomDatePicker';
import { formatDate } from '../../../../utils/dateUtils';
import { Button } from '../../../../../domain/models/ButtonModel';
import CustomImageUpload from '../../../../components/inputs/CustomImageUpload';
import CustomSelect from '../../../../components/inputs/CustomSelect';
import { escalasApreciacion} from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { AlertError } from '../../../../components/alerts';
import { Exploration } from '../../../../../domain/models/Evaluation';
import CustomTextArea from '../../../../components/inputs/CustomTextArea';
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
              sx={{background:' #192f4a',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'A) DATOS PERSONALES'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container columnSpacing={1} rowSpacing={2} sx={{px:1,pb:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomImageUpload
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
                    placeholder="Ingrese el Apellido Paterno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ap_materno"
                    control={control}
                    label="Apellido Materno"
                    placeholder="Ingrese el Apellido Materno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="nombre"
                    control={control}
                    label="Nombres"
                    placeholder="Ingrese el/los nombre(s)"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ci"
                    control={control}
                    label="Nro. de C.I."
                    placeholder="Ingrese el Nro. de C.I."
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="lugar_nacimiento"
                    control={control}
                    label="Lugar de Nacimiento"
                    placeholder="Ingrese lugar de nacimiento"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.LocationOn/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomDatePicker
                    name="fecha_nacimiento" 
                    control={control} 
                    label="Fecha Nacimiento" 
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.CalendarMonth />} 
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="ocupacion"
                    control={control}
                    label="Ocupación"
                    placeholder="Ingrese la Ocupación"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Work/>}
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
                    label="Teléfono"
                    disabled={!(stateUpdate || !client)}
                    placeholder='ingrese el N° de teléfono'
                    icon={<MUIcons.Phone/>}
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              key={'histoari-medica'}
              sx={{background:' #003366',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'B) HISTORIA MEDICO:'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomTextArea
                    name="historia_medica"
                    control={control}
                    label="Historia medico :"
                    placeholder="Ingrese la historia medico"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.History/>}
                    rows={0}
                    minRows={2}
                  />
                </Grid> 
              </Grid> 
            </DynamicAccordion>
            <DynamicAccordion
              key={'historia-familiar'}
              sx={{background:' #005691',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'C) HISTORIA FAMILIAR'}
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
              sx={{background:' #0077b6',mb:1}}
              sxBody={{p:0,pl:1,borderLeft:'4px solid #35e09fff'}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'D) EXAMEN O EVALUACION PSICOLOGICA DE MADUREZ.'}
              </StyledHeaderSecondary>
              }
            >
              <DynamicAccordion
                key={'EAE'}
                sx={{background:' #add8e6',my:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'1. ESCALAS DE APRECIACION DEL ESTRES - EAE'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container columnSpacing={1} rowSpacing={2} sx={{paddingY:2,px:1}}>
                  <Grid size={{xs: 6,sm: 12}}>
                    <CustomSelect
                      name="niveles_estres"
                      control={control}
                      label="Detectar niveles de estrés percibido ante diversas situaciones cotidianas y de riesgo."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Timeline/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="estrategias_afrontamiento"
                      control={control}
                      label="Evaluar las estrategias de afrontamiento utilizadas."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Timeline/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="vulnerabilidad_emocional"
                      control={control}
                      label="Identificar vulderabilidades emocionales que podrían comprometer la toma de decisiones al volante."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Timeline/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'BC'}
                sx={{background:' #add8e6',mb:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'2. BATERIA DE CONDUCTORES - BC'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container columnSpacing={1} rowSpacing={2} sx={{paddingY:2,px:1}}>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="atencion_sostenida_selectiva"
                      control={control}
                      label="Atencion sostenda y selectiva."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="capacidad_reaccion"
                      control={control}
                      label="Capacidad de reacción"
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="control_impulso"
                      control={control}
                      label="Control de impulsos"
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="actidud_norma_autoridad"
                      control={control}
                      label="Actitudes hacia la norma y la autoridad"
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="estabilidad_emocional"
                      control={control}
                      label="Estabilidad Emocional"
                      options={escalasApreciacion}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
            </DynamicAccordion>
            <DynamicAccordion
              key={'resultado-recomendacion'}
              sx={{background:' #0077b6',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'E) RESULTADOS Y RECOMENDACIONES:'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomTextArea
                    name="resultado_recomendacion"
                    control={control}
                    label="Historia médica :"
                    placeholder="Ingrese los resultados"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                    rows={0}
                    minRows={2}
                  />
                </Grid> 
              </Grid> 
            </DynamicAccordion>
            <DynamicAccordion
              key={'observacion'}
              sx={{background:' #289dc7'}}
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