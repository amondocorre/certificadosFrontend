import React, { useCallback, useEffect, useMemo} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { escalasApreciacion} from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import CustomTextArea from '../../../../components/inputs/CustomTextArea';
import { validationInfPsychological, validationInfPsychologicalBasic } from '../../formConfig/validationSchema';
import { defaultValuesInfPsychological } from '../../formConfig/defaultValues';
import { accordionFieldInfPsychological } from '../../accordionFieldMap';
interface FormProps {
  createClient: (data: any) => void;
  updateClient: (data: any) => void;
  printEvaluation:(id:number) => void;
  activateClient:(id:number)=>void;
  client?: any;
  buttons:Button[];
}
const DataInfoPsycological: React.FC<FormProps> = ({ createClient,updateClient,printEvaluation,activateClient,buttons,client}) => {
  const stateUpdate = useMemo(()=>{
      return!(buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table')?.length===0) && client?.id_estado_evaluacion==1
    },[buttons,client])
    const btnCreate = buttons.filter((button: Button) => button.nombre === 'create' && button.tipo === 'header');
    const stateCreate =  !(btnCreate?.length===0) 
    const btnActivate = (buttons.filter((button: Button) => button.nombre === 'activate' && button.tipo === 'table').length>0);
  const { control, formState: { errors },setError,clearErrors, reset, setValue, getValues } = useForm<any>({
    resolver: yupResolver(validationInfPsychological),
    defaultValues:defaultValuesInfPsychological,mode: 'onChange',
  });
  const validateWithSchema = async (schema: any, caso: string, tipo: string) => {
    if (schema === validationInfPsychologicalBasic) {
      const basicFields = Object.keys(validationInfPsychologicalBasic.fields);
      Object.keys(errors).forEach((key) => {
        if (!basicFields.includes(key)) {
          clearErrors(key);
        }
      });
    }
    try {
      const values = getValues();
      console.log('values',values)
      const validated = await schema.validate(values, { abortEarly: false });
      tipo === 'create' ? handleCreate(validated, caso) : handleUpdate(validated, caso);
    } catch (err: any) {
      if (err.inner) {
        console.log('err',err)
        err.inner.forEach((validationError: any) => {
          setError(validationError.path, {
            type: 'manual',
            message: validationError.message,
          });
        });
        const firstErrorField = err.inner[0].path;
        const accordionKey = accordionFieldInfPsychological[firstErrorField]??'';
        const accordionElement = document.querySelector(`#${accordionKey}`);
        const isExpanded = accordionElement?.classList.contains('Mui-expanded');
        if(!isExpanded){
          const header:any = accordionElement?.querySelector('.MuiAccordionSummary-root'); // Ajusta según tu clase real
          header?.click();
        }
        setTimeout(() => {
        const errorElement:any = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }, 300);
      }
    }
  };

  useEffect(() => {
    reset();
    if (client) {
      Object.keys(client).forEach((key:any) => {
        setValue(key, (client[key as keyof any] ?? null));
      });
    }else{
      
    }
  }, [client]);
  const handleCreate = useCallback(async (data:any,caso:string) => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];
    data.file = file;
    data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
    data.id_estado_evaluacion = caso==='1'?1:2;
    createClient(data)
  }, []);
  const handleUpdate = useCallback(async (data:any,caso:string) => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto?.files?.[0] ?? null;
    data.file = file;
    data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
    data.id_estado_evaluacion = caso==='1'?1:2;
    updateClient(data)
  }, []);

  return (
      <Box sx={{paddingY:0}}>
        <form >
          <ScrollableBox sx={{paddingTop:0,px:0.5,maxHeight: 'calc(80vh - 60px)'}}> 
            <DynamicAccordion
              id={'dotos-personales'}
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
                    uppercase={true}
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
                    uppercase={true}
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
                    uppercase={true}
                    label="Nombres"
                    placeholder="Ingrese el nombre"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ci"
                    control={control}
                    uppercase={true}
                    label="CI"
                    placeholder="Ingrese el ci"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="lugar_nacimiento"
                    control={control}
                    uppercase={true}
                    label="Lugar de Nacimiento"
                    placeholder="Ingrese lugar de nacimieno"
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
                    name="profecion"
                    control={control}
                    uppercase={true}
                    label="profecion"
                    placeholder="Ingrese la profecion"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Work/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="domicilio"
                    control={control}
                    uppercase={true}
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
                    uppercase={true}
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
                    uppercase={true}
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
                    uppercase={true}
                    label="Telefono"
                    type='number'
                    disabled={!(stateUpdate || !client)}
                    placeholder='ingrese el N° de telefono'
                    icon={<MUIcons.Phone/>}
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              id={'histoari-medica'}
              key={'histoari-medica'}
              sx={{background:' #247bc2ff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'B) HISTORIA MEDICA:'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
                <Grid size={{xs: 12,sm: 12}}>
                  <CustomTextArea
                    name="historia_medica"
                    control={control}
                    uppercase={true}
                    label="Historia médica :"
                    placeholder="Ingrese la historia médica"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.History/>}
                    rows={0}
                    minRows={2}
                  />
                </Grid> 
              </Grid> 
            </DynamicAccordion>
            <DynamicAccordion
              id={'historia-familiar'}
              key={'historia-familiar'}
              sx={{background:' #1fcbe9ff',mb:1}}
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
                    uppercase={true}
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
              id={'examen-psicologica'}
              key={'examen-psicologica'}
              sx={{background:' #35e09fff',mb:1}}
              sxBody={{p:0,pl:1,borderLeft:'4px solid #35e09fff'}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'D) EXAMEN O EVALUACION PSICOLOGICA DE MADUREZ.'}
              </StyledHeaderSecondary>
              }
            >
              <DynamicAccordion
                id={'examen-psicologica-EAE'}
                key={'examen-psicologica-EAE'}
                sx={{background:' #7ae0b9ff',my:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'1. ESCALAS DE APRECIACION DEL ESTRES - EAE'}
                  </StyledHeaderSecondary>
                }
              >
                <Grid container columnSpacing={1} rowSpacing={2} sx={{paddingY:2,px:1}}>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="niveles_estres"
                      control={control}
                      label="Detectar niveles de estrés percibido ante diversas situalciones cotidianas y de riesgo."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opcion"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Timeline/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="estrategias_afrontamiento"
                      control={control}
                      label="Evaluar las estrategias de afrontamientoutilizadas."
                      options={escalasApreciacion}
                      placeholder="Seleccione una opcion"
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
                      placeholder="Seleccione una opcion"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Timeline/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                id={'examen-psicologica-BC'}
                key={'examen-psicologica-BC'}
                sx={{background:' #7ae0b9ff',mb:1}}
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
                      placeholder="Seleccione una opcion"
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
                      placeholder="Seleccione una opsion"
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
                      placeholder="Seleccione una opsion"
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
                      placeholder="Seleccione una opsion"
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
                      placeholder="Seleccione una opsion"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
            </DynamicAccordion>
            <DynamicAccordion
              id={'resultado-recomendacion'}
              key={'resultado-recomendacion'}
              sx={{background:' #247bc2ff',mb:1}}
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
                    uppercase={true}
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
              id={'observacion'}
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
                    uppercase={true}
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
          <ContainerButtons sx={{justifyContent:'center'}}>
          {stateUpdate && client && client?.id_estado_evaluacion==1 &&
          <>
            <ActionButton
              key={`button-update-1`}
              type={'update'}
              label='Guardar.'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationInfPsychologicalBasic, '1','update')}
              disabled={false} 
            />
            <ActionButton
              key={`button-update-2`}
              type={'update'}
              label='Registrar.'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationInfPsychological, '2','update')}
              disabled={false} 
            />
          </>
          }
          {stateCreate && !client &&
          <>
            <ActionButton
              key={`button-create-1`}
              type={'create'}
              label='Guardar'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationInfPsychologicalBasic, '1','create')}
              disabled={false} 
            />
            <ActionButton
              key={`button-create-2`}
              type={'create'}
              label='Registrar'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationInfPsychological, '1','create')}
              disabled={false} 
            />
          </>
          }
          {
            btnActivate && client && client?.id_estado_evaluacion==2 && 
            <ActionButton
              key={`button-activate`}
              type='activate'
              label='Habilitar Editar'
              icon={<MUIcons.Edit/>}
              onClick={() => {activateClient(Number(client?.id_inf_evaluacion_psicologica))}}
              disabled={false} 
            />
          }
          {
            client && client?.id_estado_evaluacion==2 && 
            <ActionButton
              key={`button-cancel`}
              type={'cancel'}
              label='descargar PDF.'
              icon={<MUIcons.PictureAsPdf/>}
              onClick={() => {printEvaluation(Number(client?.id_inf_evaluacion_psicologica))}}
              disabled={false} 
            />
          }
        </ContainerButtons>
        </form>
      </Box>
  );
};

export default DataInfoPsycological;