import React, { useCallback, useEffect, useMemo} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { grupoSanguineos, habitos, presionActerial, presionCardiaca, presionRespiratoria, resultados, sexos, temperaturas, tipoLentes, medicionOcular,colorimetria,campimetria,weber,rinne,trofismo,tono_muscular,fuerza_muscular } from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import CustomSwitchPerson from '../../../../components/inputs/CustomSwitchPeson';
import CustomAutocompletePerson from '../../../../components/inputs/CustomAutocompletePerson';
import { AlertError } from '../../../../components/alerts';
import { Exploration } from '../../../../../domain/models/Evaluation';
import { EvaluationMedical } from '../../../../../domain/models/EvaluationMedical';
import { validationMedical, validationMedicalBasic } from '../../formConfig/validationSchema';
import { defaultValuesMedical } from '../../formConfig/defaultValues';
import { accordionFieldMedical } from '../../accordionFieldMap';
interface UserFormProps {
  createMedical: (data:EvaluationMedical) => void;
  updateMedical: (data:EvaluationMedical) => void;
  getExploration:(exploration:Exploration)=>Promise<Exploration[]>
  createExploration:(exploration:Exploration)=>void;
  printEvaluation:(id:number)=> void;
  client?: any;
  buttons:Button[];
}
const DataClient: React.FC<UserFormProps> = ({ createMedical,updateMedical,getExploration,createExploration,printEvaluation,buttons,client}) => {
  const stateUpdate = useMemo(()=>{
    return!(buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table')?.length===0) && client?.id_estado_evaluacion==1
  },[buttons,client])

  const btnCreate = buttons.filter((button: Button) => button.nombre === 'create' && button.tipo === 'header');
  const stateCreate =  !(btnCreate?.length===0)
  const { control, formState: { errors },setError,clearErrors, reset, setValue, getValues } = useForm<any>({
    resolver: yupResolver(validationMedical),
    defaultValues:defaultValuesMedical,mode: 'onChange',
  });
  const validateWithSchema = async (schema: any, caso: string, tipo: string) => {
    if (schema === validationMedicalBasic) {
      const basicFields = Object.keys(validationMedicalBasic.fields);
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
        const accordionKey = accordionFieldMedical[firstErrorField]??'';
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
      setValue('sexo','')
    }
  }, [client]);
  const getOptions = useCallback(async (value:string,tipo: string) => {
    if (tipo ==="cara" || tipo==="cuello" || tipo==="cabeza" || tipo==='torax' || tipo==='cardiopolmunar' || tipo==='abdomen' || tipo==='oido_externo') {
      const data:Exploration ={descripcion:value,tipo:tipo}
      return await  getExploration(data);
    }
    return [];
  }, []);
  const handleCreateExploration = useCallback(async (tipo: string) => {
    if(!getValues(tipo)) {
      AlertError({ title: '', message: 'ingrese el texto que desea guardar.' })
      return ;
    }
    if (tipo ==="cara" || tipo==="cuello" || tipo==="cabeza" || tipo==='torax' || tipo==='cardiopolmunar' || tipo==='abdomen' ||tipo==='oido_externo') {
      const value:string = String(getValues(tipo));
      const data:Exploration ={descripcion:value,tipo:tipo}
      await  createExploration(data);
    }
  }, []);
  const handleCreate = useCallback(async (data:any,tipo:string) => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];  
    data.file = file;
    data.fecha_evaluacion = String(formatDate(data.fecha_evaluacion));
    data.id_estado_evaluacion = tipo==='1'?1:2;
    createMedical(data)
  }, []);
  const handleUpdate = useCallback(async (data:any,tipo:string) => {
    const foto = document.getElementById('image-upload-foto') as HTMLInputElement;
    let file = foto.files?.[0];
    data.file = file;
    data.fecha_evaluacion = String(formatDate(data.fecha_evaluacion));  
    data.id_estado_evaluacion = tipo==='1'?1:2;    
    updateMedical(data);
  }, []);
  const handleChangeSwitchPerson = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
      if (event.target.checked) {
          if(buttonId=='usa_lentes')setValue('tipo_lentes','')
      }else{
        if(buttonId=='usa_lentes')setValue('tipo_lentes','SIN LENTES')
      }
  }
  return (
      <Box sx={{padding:0}}>
        <form >
          <ScrollableBox sx={{paddingTop:0,px:0.5,maxHeight: 'calc(80vh - 60px)'}}>
            <DynamicAccordion
              key={'dotos-personales'}
              id={'dotos-personales'}
              sx={{background:' #74b3e7ff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'Datos Personales: '} {client? String(client?.nombre_completo):''}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={3}>
                <Grid
                  size={{xs: 12,sm: 12}}>
                  <CustomImageUpload
                    defaultValue={client?.foto?client?.foto:''}
                    name="foto"
                    control={control}
                    disabled={!(stateUpdate || !client)}
                    label="Subir foto"
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
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
                <Grid size={{xs: 4,sm: 4}}>
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
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="nombre"
                    control={control}
                    uppercase={true}
                    label="Nombres"
                    placeholder="Ingrese el/los nombres"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomTextField
                    name="ci"
                    control={control}
                    uppercase={true}
                    label="Nro. C.I."
                    placeholder="Ingrese el Nro. de C.I."
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.Badge/>}
                  />
                </Grid>
                <Grid size={{xs: 2,sm: 2}}>
                  <CustomTextField
                    name="edad"
                    control={control}
                    uppercase={true}
                    label="Edad"
                    type='number'
                    placeholder="Ingrese la edad"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}>
                  <CustomSelect
                    name="sexo"
                    control={control}
                    label="Sexo"
                    options={sexos}
                    disabled={!(stateUpdate || !client)}
                    placeholder='Seleccione el sexo'
                    icon={<MUIcons.Wc/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomDatePicker
                    name="fecha_evaluacion" 
                    control={control} 
                    label="Fecha Examen" 
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.CalendarMonth />} 
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              key={'amtecedentes'}
              id={'amtecedentes'}
              sx={{background:' #1b629b',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'I. ANTECEDENTES'}
              </StyledHeaderSecondary>
              }
            >
             <Grid container spacing={1}  sx={{paddingY:2}}>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomTextField
                    name="antecendentes_rc"
                    control={control}
                    uppercase={true}
                    label="Antecedentes relacionados con la conducción:"
                    placeholder="Antecedentes relacionados con la conducción"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.InsertDriveFile/>}
                  />
                </Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomTextField
                    name="antecendentes_pp"
                    control={control}
                    uppercase={true}
                    label="Antecedentes personales patológicos:"
                    placeholder="Antecendentes personales patológicos"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.InsertDriveFile/>}
                  />
                </Grid> 
                <Grid size={{xs: 6,sm: 6}} >
                   <Grid size={{xs: 8,sm: 12}} sx={{pb:1,border:'4px solid #bee4eeff'}}>
                      <StyledTitle sx={{ color: 'black'}}>HÁBITOS:</StyledTitle>
                      <Box display="flex" flexDirection="row" gap={2} mt={0} px={1}>
                        <Box sx={{width:'50%'}}>
                          <CustomSelect
                            name="bebe"
                            control={control}
                            label="Bebe"
                            options={habitos}
                            disabled={!(stateUpdate || !client)}
                            placeholder='Seleccione una opción'
                            icon={<MUIcons.Liquor/>}
                          />
                        </Box>
                        <Box sx={{width:'50%'}}>
                          <CustomSelect
                            name="fuma"
                            control={control}
                            label="Fuma"
                            options={habitos}
                            disabled={!(stateUpdate || !client)}
                            placeholder='Seleccione una opción'
                            icon={<MUIcons.SmokingRooms/>}
                          />
                        </Box>
                      </Box>
                    </Grid>      
                </Grid> 
                <Grid size={{xs: 6,sm: 6}} >
                  <Grid size={{xs: 8,sm: 12}} sx={{pb:1,border:'4px solid #bee4eeff'}}>
                      <StyledTitle sx={{ color: 'black'}}>VACUNAS:</StyledTitle>
                      <Box display="flex" flexDirection="row" gap={2} mt={0}>
                        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center'}}>
                          <div >
                            <CustomSwitchPerson
                              name="f_amarilla"
                              control={control}
                              label="F. Amarilla"
                              disabled={!(stateUpdate || !client)}
                              icon={<MUIcons.Vaccines />}
                              flexDirection='row'
                            />
                          </div>
                        </Box>
                        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center'}}>
                          <div >
                            <CustomSwitchPerson
                              name="antitetanica"
                              control={control}
                              label="Antitetánica"
                              disabled={!(stateUpdate || !client)}
                              icon={<MUIcons.Vaccines/>}
                              flexDirection='row'
                            />
                          </div>
                        </Box>
                      </Box>
                    </Grid>
                </Grid> 
              </Grid> 
            </DynamicAccordion>
            <DynamicAccordion
              key={'examen-clinico'}
              id={'examen-clinico'}
              sx={{background:' #217ac1',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'II. EXAMEN CLINICO'}
              </StyledHeaderSecondary>
              }
            >
              <Grid container spacing={1}  sx={{paddingY:2}}>
                <Grid size={{xs: 3,sm: 3}}></Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomSelect
                    name="grupo_sanguineo"
                    control={control}
                    label="Grupo/Factor Sanguineo"
                    options={grupoSanguineos}
                    disabled={!(stateUpdate || !client)}
                    placeholder='Seleccione una opción'
                    icon={<MUIcons.Liquor/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}></Grid>
                <Grid size={{xs: 6,sm: 6}} sx={{pb:1,border:'4px solid #bee4eeff'}}>
                  <StyledTitle sx={{ color: 'black'}}>SIGNOS VITALES:</StyledTitle>
                  <Box display="flex" flexDirection="row" gap={2} mt={0} px={1}>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="temperatura"
                        control={control}
                        label="Temperatura"
                        options={temperaturas}
                        placeholder="Seleccione un valor"
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="presion_arterial"
                        control={control}
                        label="Presión Arterial"
                        options={presionActerial}
                        placeholder="Seleccione un valor"
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" gap={2} mt={0} px={1}>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="frecuencia_cardiaca"
                        control={control}
                        label="Frecuencia Cardiaca"
                        placeholder="Seleccione un valor"
                        options={presionCardiaca}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="frecuencia_respiratoria"
                        control={control}
                        label="Frecuencia Respiratoria"
                        placeholder="Seleccione un valor"
                        options={presionRespiratoria}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                  </Box>
                </Grid> 
                <Grid size={{xs: 6,sm: 6}} sx={{pb:1,border:'4px solid #bee4eeff'}}>
                  <StyledTitle sx={{ color: 'black'}}>SOMATOMETRIA:</StyledTitle>
                  <Box display="flex" flexDirection="column" gap={0.9} mt={0} px={1}>
                    <Box sx={{width:'100%'}}>
                      <CustomTextField
                        name="talla"
                        control={control}
                        uppercase={true}
                        label="Talla"
                        placeholder="Ingrese la talla en mts."
                        type='number'
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                        
                      />
                    </Box>
                    <Box sx={{width:'100%'}}>
                      <CustomTextField
                        name="peso"
                        control={control}
                        uppercase={true}
                        label="Peso"
                        placeholder="Ingrese el peso en Kg."
                        type='number'
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid> 
            </DynamicAccordion>
            <DynamicAccordion
              key={'examen-fisico'}
              id={'examen-fisico'}
              sx={{background:' #2ba1ff'}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'III. EXAMEN FISICO'}
              </StyledHeaderSecondary>
              }
            >
              <DynamicAccordion
                key={'examen-fisico-1'}
                id={'examen-fisico-1'}
                sx={{background:' #2aa0ff',my:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'1. EXPLORACION DE CABEZA, CARA Y CUELLO'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="cabeza"
                        control={control}
                        uppercase={true}
                        label="Cabeza"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('cabeza')}}/>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="cara"
                        control={control}
                        uppercase={true}
                        label="Cara"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('cara')}}/>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="cuello"
                        control={control}
                        uppercase={true}
                        label="Cuello"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle />}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('cuello')}}/>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>EVALUACIÓN OFTALMOLÓGICA </StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="ex_general_ojos"
                      control={control}
                      uppercase={true}
                      label="Examen general de ojos"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}

                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="movimiento_oculares"
                      control={control}
                      uppercase={true}
                      label="Movimientos Oculares"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}

                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="reflejo_luminoso_corneal"
                      control={control}
                      uppercase={true}
                      label="Reflejo Luminoso corneal"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}

                    />
                  </Grid>

                  <Grid size={{xs: 2,sm: 2}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSwitchPerson
                      name="estrabismo"
                      control={control}
                      label="Estrabitismo"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
                  <Grid size={{xs: 2,sm: 2}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSwitchPerson
                      name="usa_lentes"
                      control={control}
                      label="Usa lentes"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                      onChange={handleChangeSwitchPerson}
                    />
                  </Grid>
                  {/*<Grid size={{xs: 4,sm: 1}}></Grid>*/}
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="tipo_lentes"
                      control={control}
                      label="Tipo lentes"
                      options={tipoLentes}
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                    />
                  </Grid>
                  <Grid size={{xs: 2,sm: 2}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSwitchPerson
                      name="cirugia"
                      control={control}
                      label="Cirugia"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>AGUDEZA VISUAL </StyledTitle>
                  </Grid>
                                    
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="campimetria"
                      control={control}
                      label="Campimetría"
                      options={campimetria}
                      placeholder="Ingrese una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSelect
                      name="colorimetria"
                      control={control}
                      label="Colorimetria"
                      options={colorimetria}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 12,sm:12}}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '10% 1fr 1fr 1fr',
                        width: '100%',
                        gap:0,
                        margin: 'auto',
                        //border: '1px solid #3b3a3aff',
                        '& > *': {
                          borderRight: '1px solid #3b3a3aff',
                          borderBottom: '1px solid #3b3a3aff',
                          p:0.5,
                          paddingTop: 1,
                          textAlign: 'center',
                        },
                        '& > :nth-of-type(-n+4)': {
                          padding: 0, 
                          borderTop: '1px solid #3b3a3aff',
                        },
                        '& > :nth-of-type(4n+1)': {
                          borderLeft: '1px solid #3b3a3aff',
                        },
                      }}
                    >
                      <Box>
                      </Box>
                      <Box >
                        <StyledTitle sx={{color:'black'}}>CON LENTES</StyledTitle>
                      </Box>
                      <Box >
                        <StyledTitle sx={{color:'black'}}>SIN LENTES</StyledTitle>
                      </Box>
                      <Box >
                        <StyledTitle sx={{color:'black'}}>CORRECCIÓN</StyledTitle>
                      </Box>
                      <div >
                        <StyledTitle sx={{color:'black',mt:1}}>O.D.</StyledTitle>
                      </div>
                      <div>
                        <CustomSelect
                          name="od_con_lentes"
                          control={control}
                          label=""
                          options={medicionOcular}
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                      <div>
                        <CustomSelect
                          name="od_sin_lentes"
                          control={control}
                          label=""
                          options={medicionOcular}
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          name="od_correccion"
                          control={control}
                          uppercase={true}
                          label=""
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                      <div>
                        <StyledTitle sx={{color:'black'}}>OI</StyledTitle>
                      </div>
                      <div>
                        <CustomSelect
                          name="oi_con_lentes"
                          control={control}
                          label=""
                          options={medicionOcular}
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                      <div>
                        <CustomSelect
                          name="oi_sin_lentes"
                          control={control}
                          label=""
                          options={medicionOcular}
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                      <div >
                        <CustomTextField
                          name="oi_correccion"
                          control={control}
                          uppercase={true}
                          label=""
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </div>
                    </Box>
                  </Grid>
                                        
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="vision_profunda"
                      control={control}
                      uppercase={true}
                      label="Visión Profunda"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="dx_lampara_hendidura"
                      control={control}
                      uppercase={true}
                      label="Dx Lampara Hendiduras"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>

                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>APARATO AUDITIVO </StyledTitle>
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="oido_externo"
                        control={control}
                        uppercase={true}
                        label="Examen de oído externo"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('oido_externo')}}/>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="oroscopia"
                      control={control}
                      uppercase={true}
                      label="Otoscopia"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="t_weber"
                      control={control}
                      label="T. Weber"
                      options={weber}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="t_rinne"
                      control={control}
                      label="T. Rinne"
                      options={rinne}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-2'}
                id={'examen-fisico-2'}
                sx={{background:' #2aa0ff',mb:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'2. EXPLORACION DEL APARATO CARDIO CIRCULATORIO Y RESPIRATORIO'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="torax"
                        control={control}
                        uppercase={true}
                        label="Exoloración de tórax"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('torax')}}/>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="cardiopolmunar"
                        control={control}
                        uppercase={true}
                        label="Exploración del área cardiopulmonar"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('cardiopolmunar')}}/>
                    </Box>
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-3'}
                id={'examen-fisico-3'}
                sx={{background:' #2aa0ff',mb:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'3. EXPLORACION DEL APARATO DIGESTIVO'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
                      <CustomAutocompletePerson
                        labelOption='descripcion'
                        getOptions = {getOptions}
                        valueOption='descripcion'
                        name="abdomen"
                        control={control}
                        uppercase={true}
                        label="Exploración de abdomen"
                        placeholder="Ingrese un detalle"
                        handleChange={()=>{}}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                      <MUIcons.Save sx={{ml:1}} onClick={()=>{handleCreateExploration('abdomen')}}/>
                    </Box>
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-4'}
                id={'examen-fisico-4'}
                sx={{background:' #2aa0ff',mb:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'4. EXPLORACION DEL APARATO LOCOMOTOR'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>MIEMBROS SUPERIORES</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="s_trofismo"
                      control={control}
                      label="Trofismo"
                      options={trofismo}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="s_tono_muscular"
                      control={control}
                      label="Tono Muscular"
                      options={tono_muscular}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="s_fuerza_muscular"
                      control={control}
                      label="Fuerza Muscular"
                      options={fuerza_muscular}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>MIEMBROS INFERIORIES </StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="i_trofismo"
                      control={control}
                      label="Trofismo"
                      options={trofismo}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="i_tono_muscular"
                      control={control}
                      label="Tono muscular"
                      options={tono_muscular}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSelect
                      name="i_fuerza_muscular"
                      control={control}
                      label="Fuerza Muscular"
                      options={fuerza_muscular}
                      placeholder="Seleccione una opción"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-5'}
                id={'examen-fisico-5'}
                sx={{background:' #2aa0ff'}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'5. SISTEMA NEUROLOGICO'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="cordinacion_marcha"
                      control={control}
                      uppercase={true}
                      label="Cordinación y Marcha"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="reflejos_osteotendinosos"
                      control={control}
                      uppercase={true}
                      label="Reflejos Osteotendinosos"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>PRUEBAS DE CORDINACION</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="talon_rodilla"
                      control={control}
                      uppercase={true}
                      label="Prueba Talón-Rodilla"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="dedo_nariz"
                      control={control}
                      uppercase={true}
                      label="Prueba Dedo-Nariz"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>PRUEBAS DE EQUILIBRIO</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="romberg"
                      control={control}
                      uppercase={true}
                      label="Prueba Romberg"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="motoras_sensetivas_diagnosticadas"
                      control={control}
                      uppercase={true}
                      label="Fallas motoras sensitivas diagnosticadas"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>RESULTADOS DE EVALUACIÓN</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 3,sm: 3}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSwitchPerson
                      name="requiere_evaluacion_especialidad"
                      control={control}
                      label="Requiere evaluación de especialidad"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 3,sm: 3}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="motivo_referencia_especialidad"
                      control={control}
                      uppercase={true}
                      label="Motivo de referencia a especialidad"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 1,sm: 12}}></Grid>
                  <Grid size={{xs: 6,sm: 8}}>
                    <CustomTextField
                      name="evaluacion_especialidad"
                      control={control}
                      uppercase={true}
                      label="Resultado de la evaluación de especialidad"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 3,sm: 3}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomSwitchPerson
                      name="requiere_evaluacion_psicosensometria"
                      control={control}
                      label="Requiere evaluación psicosensométrica"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 3,sm: 3}}></Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display={'flex'} sx={{flexDirection:'column',alignItems:'start'}}>
                      <Box display={'flex'} sx={{width:'100%',flexDirection:'column',alignItems:'center'}}>
                        <StyledTitle sx={{color:'black'}}>RESULTADO FINAL DE CETIFICACION MEDICA:</StyledTitle>
                      </Box>
                      <StyledTitle sx={{color:'black',mt:0}}><strong>OBSERVACIONES:</strong>EN ESTE ACAPITE SE DEBE INCORPORAR SI EL POSTULANTE ES:</StyledTitle>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- APTO PARA CONDUCIR VEHICULOS.</StyledHeaderSecondary>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- NO ES APTO PARA CONDUCIR VEHICULOS INDICAR LOS MOTIVOS.</StyledHeaderSecondary>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- APTO CON LIMITACIONES Y ADAPTACIONES TECNICO VEHICULARES.</StyledHeaderSecondary>
                      <Box display={'flex'} flexDirection={'column'}  gap={1} sx={{width:'100%',alignItems:'start'}}>
                        <StyledHeaderSecondary sx={{color:'black',mt:0}}>Indicar en base a la conclución de la evaluación si es apto, no apto, apto con restricciones y adaptaciones tecnicas.</StyledHeaderSecondary>
                        <CustomSelect
                          name="resultado_evaluacion"
                          control={control}
                          label="resultado_evaluacion"
                          placeholder="Seleccione un resultado"
                          options={resultados}
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                        <CustomTextField
                          name="motivo_resultado"
                          control={control}
                          uppercase={true}
                          label="Motivos"
                          placeholder="Ingrese el detalle"
                          disabled={!(stateUpdate || !client)}
                          icon={<MUIcons.AccountCircle/>}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DynamicAccordion>
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
                onClick={() => validateWithSchema(validationMedicalBasic, '1','update')}
                disabled={false} 
              />
              <ActionButton
                key={`button-update-2`}
                type={'update'}
                label='Registrar.'
                icon={<MUIcons.Save/>}
                onClick={() => validateWithSchema(validationMedical, '2','update')}
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
                onClick={() => validateWithSchema(validationMedicalBasic, '1','create')}
                disabled={false} 
              />
              <ActionButton
                key={`button-create-2`}
                type={'create'}
                label='Registrar'
                icon={<MUIcons.Save/>}
                onClick={() => validateWithSchema(validationMedical, '1','create')}
                //onClick={() => {handleCreate('2')}}
                disabled={false} 
              />
            </>
            }
          {client && client?.id_estado_evaluacion==2 && 
            <ActionButton
              key={`button-cancel`}
              type={'cancel'}
              label='descargar PDF.'
              icon={<MUIcons.PictureAsPdf/>}
              onClick={() => {printEvaluation(Number(client?.id_evaluacion_medica))}}
              disabled={false} 
            />
          }
          </ContainerButtons>
        </form>
      </Box>
  );
};

export default DataClient;