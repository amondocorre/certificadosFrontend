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
import CustomSelect from '../../../../components/inputs/CustomSelect';
import { escalasPsicologica, escalasPsicologicav2} from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import CustomTextArea from '../../../../components/inputs/CustomTextArea';
import CustomUploadOrCamera from '../../../../components/inputs/CustomUploadOrCamera';
import { defaultValuesPsychological } from '../../formConfig/defaultValues';
import { validationPsychological, validationPsychologicalBasic } from '../../formConfig/validationSchema';
import { accordionFieldPsychological } from '../../accordionFieldMap';
interface DataClientFormProps {
  createClient: (data: any) => void;
  updateClient: (data: any) => void;
  printEvaluation:(id:number) => void;
  client?: any;
  buttons:Button[];
}
const DataClient: React.FC<DataClientFormProps> = ({ createClient,updateClient,printEvaluation,buttons,client}) => {
  const stateUpdate = useMemo(()=>{
    return!(buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table')?.length===0) && client?.id_estado_evaluacion==1
  },[buttons,client])
  const btnCreate = buttons.filter((button: Button) => button.nombre === 'create' && button.tipo === 'header');
  const stateCreate =  !(btnCreate?.length===0)
  const { control, formState: { errors },setError,clearErrors, reset, setValue, getValues } = useForm<any>({
    resolver: yupResolver(validationPsychological),
    defaultValues:defaultValuesPsychological,mode: 'onChange',
  });
  const validateWithSchema = async (schema: any, caso: string, tipo: string) => {
    if (schema === validationPsychologicalBasic) {
      const basicFields = Object.keys(validationPsychologicalBasic.fields);
      Object.keys(errors).forEach((key) => {
        if (!basicFields.includes(key)) {
          clearErrors(key);
        }
      });
    }
    try {
      const values = getValues();
      const validated = await schema.validate(values, { abortEarly: false });
      tipo === 'create' ? handleCreate(validated, caso) : handleUpdate(validated, caso);
    } catch (err: any) {
      if (err.inner) {
        err.inner.forEach((validationError: any) => {
          setError(validationError.path, {
            type: 'manual',
            message: validationError.message,
          });
        });
        const firstErrorField = err.inner[0].path;
        const accordionKey = accordionFieldPsychological[firstErrorField]??'';
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
    data.fecha_evaluacion = formatDate(data.fecha_evaluacion);
    data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
    data.id_estado_evaluacion = caso==='1'?1:2;
    createClient(data)
  }, []);
  const handleUpdate = useCallback(async (data:any,caso:string) => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];
    data.file = file;
    data.fecha_evaluacion = formatDate(data.fecha_evaluacion);
    data.fecha_nacimiento = formatDate(data.fecha_nacimiento);
    data.id_estado_evaluacion = caso==='1'?1:2;
    updateClient(data)
  }, []);
  const handleOnchangeField=(value:any,name:string)=>{
    const text = 'SE PRESENTA A CONSULTA SUJETO DE '+Number(value).toFixed(0)+'  AÑOS DE EDAD SIN ANTECEDENTES   PSICOLOGICOS PERSONALES O FAMILIARES DESTACABLES';
    setValue('historia_familiar',text);
  }

  return (
    
      <Box sx={{paddingY:0}}>
        <ScrollableBox sx={{paddingTop:0,px:0.5,maxHeight: 'calc(80vh - 60px)'}}>
          <DynamicAccordion
            id='dotos-personales'
            key={'dotos-personales'}
            sx={{background:' #192f4a',mb:1}}
            defaultExpanded={false}
            childrenTitle={
              <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
              {'A) DATOS PERSONALES'} {client? String(client?.nombre_completo):''}
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
                  uppercase={true}
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
                  uppercase={true}
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
                  uppercase={true}
                  label="Nombres"
                  placeholder="Ingrese el/los nombre(s)"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
              <Grid size={{xs: 1.2,sm: 1.2}}>
                <CustomTextField
                  name="edad"
                  control={control}
                  uppercase={true}
                  label="Edad"
                  placeholder="Ingrese la edad"
                  disabled={!(stateUpdate || !client)}
                  type='number'
                  onChange={handleOnchangeField}
                  //icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
              <Grid size={{xs: 1.8,sm: 1.8}}>
                <CustomTextField
                  name="ci"
                  control={control}
                  uppercase={true}
                  label="Nro. de C.I."
                  placeholder="Ingrese el Nro. de C.I."
                  disabled={!(stateUpdate || !client)}
                  //icon={<MUIcons.AccountCircle/>}
                />
              </Grid>

              <Grid size={{xs: 3,sm: 3}}>
                <CustomTextField
                  name="lugar_nacimiento"
                  control={control}
                  uppercase={true}
                  label="Lugar de Nacimiento"
                  placeholder="Ingrese lugar de nacimiento"
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
                  name="profecion"
                  control={control}
                  uppercase={true}
                  label="Profecion"
                  placeholder="Ingrese la Ocupación"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.Work/>}
                />
              </Grid>
              <Grid size={{xs: 3,sm: 3}}>
                <CustomDatePicker
                  name="fecha_evaluacion" 
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
                  label="Teléfono"
                  type='number'
                  disabled={!(stateUpdate || !client)}
                  placeholder='ingrese el N° de teléfono'
                  icon={<MUIcons.Phone/>}
                />
              </Grid>
            </Grid>
          </DynamicAccordion>
          <DynamicAccordion
            key={'historia-familiar'}
            id='historia-familiar'
            sx={{background:' #005691',mb:1}}
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
                  disabled={true}
                  icon={<MUIcons.SettingsBackupRestore/>}
                  rows={0}
                  minRows={1}
                />
              </Grid>
            </Grid> 
          </DynamicAccordion> 
          <DynamicAccordion
            key={'examen-psicologico'}
            id='examen-psicologico'
            sx={{background:' #0077b6',mb:1}}
            defaultExpanded={false}
            childrenTitle={
              <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
              {'C) EXAMEN PSICOLOGICO'}
            </StyledHeaderSecondary>
            }
          >
            <Grid container spacing={1}  sx={{paddingY:2,px:1}}>
              <Grid size={{xs: 6,sm: 6}}>
                <CustomSelect
                  name="coordinacion_visomotora"
                  control={control}
                  label="Cordinación Visomotora"
                  options={escalasPsicologicav2}
                  placeholder="Seleccione una opción"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <CustomSelect
                  name="personalidad"
                  control={control}
                  label="Personalidad"
                  options={escalasPsicologicav2}
                  placeholder="Seleccione una opción"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <CustomSelect
                  name="atencion_cognitiva"
                  control={control}
                  label="Atencion, concentración, memoria y orientación"
                  options={escalasPsicologicav2}
                  placeholder="Seleccione una opción"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <CustomSelect
                  name="reaccion_estres_riego"
                  control={control}
                  label="Prueba de reación ante situaciones de estrés y riesgo"
                  options={escalasPsicologica}
                  placeholder="Seleccione una opción"
                  disabled={!(stateUpdate || !client)}
                  icon={<MUIcons.AccountCircle/>}
                />
              </Grid>
            </Grid>
          </DynamicAccordion>
          <DynamicAccordion
            key={'observacion'}
            id='observacion'
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
                  minRows={1}
                  uppercase={true}
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
              label='Guardar 1.'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationPsychologicalBasic, '1','update')}
              disabled={false} 
            />
            <ActionButton
              key={`button-update-2`}
              type={'update'}
              label='Guardar 2.'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationPsychological, '2','update')}
              disabled={false} 
            />
          </>
          }
          {stateCreate && !client &&
          <>
            <ActionButton
              key={`button-create-1`}
              type={'create'}
              label='Guardar 1'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationPsychologicalBasic, '1','create')}
              disabled={false} 
            />
            <ActionButton
              key={`button-create-2`}
              type={'create'}
              label='Guardar 2'
              icon={<MUIcons.Save/>}
              onClick={() => validateWithSchema(validationPsychological, '1','create')}
              disabled={false} 
            />
          </>
          }
          {
            client && client?.id_estado_evaluacion==2 && 
            <ActionButton
              key={`button-cancel`}
              type={'cancel'}
              label='descargar PDG.'
              icon={<MUIcons.PictureAsPdf/>}
              onClick={() => {printEvaluation(Number(client?.id_evaluacion_psicologica))}}
              disabled={false} 
            />
          }
        </ContainerButtons>
      </Box>
  );
};

export default DataClient;