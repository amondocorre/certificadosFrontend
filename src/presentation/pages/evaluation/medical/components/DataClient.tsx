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
import { grupoSanguineos, habitos, presionActerial, presionCardiaca, presionRespiratoria, resultados, sexos, temperaturas, tipoLentes } from '../../constants';
import DynamicAccordion from '../../../../components/containers/DynamicAccordion';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import CustomSwitch from '../../../../components/inputs/CustomSwitch';
import CustomSwitchPerson from '../../../../components/inputs/CustomSwitchPeson';
import CustomAutocompletePerson from '../../../../components/inputs/CustomAutocompletePerson';
import { AlertError } from '../../../../components/alerts';
import { Exploration } from '../../../../../domain/models/Evaluation';
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
  const handleChangeSwitchPerson = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
      if (event.target.checked) {
          if(buttonId=='usa_lentes')setValue('tipo_lentes','')
      }else{
        if(buttonId=='usa_lentes')setValue('tipo_lentes','SIN LENTES')
      }
  }
  return (
    
      <Box sx={{paddingY:0}}>
        <form >
          <ScrollableBox sx={{paddingTop:0}}>
            <DynamicAccordion
              key={'dotos-cliente'}
              sx={{background:' #74b3e7ff',mb:1}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'Datos del Cliente'}
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
                    label="Apellido Paterno"
                    placeholder="Ingrese el apellido paterno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="ap_materno"
                    control={control}
                    label="Apellido Materno"
                    placeholder="Ingrese el apellido materno"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomTextField
                    name="nombre"
                    control={control}
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
                    label="CI"
                    placeholder="Ingrese el ci"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 2,sm: 2}}>
                  <CustomTextField
                    name="edad"
                    control={control}
                    label="Edad"
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
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 4,sm: 4}}>
                  <CustomDatePicker
                    name="fecha" 
                    control={control} 
                    label="Fecha Examen" 
                    disabled={!(stateUpdate || !client)}
                    // icon={<CalendarMonthIcon />} 
                  />
                </Grid>
              </Grid>
            </DynamicAccordion>
            <DynamicAccordion
              key={'amtecedentes'}
              sx={{background:' #247bc2ff',mb:1}}
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
                    label="Antecendentes relacionadas con la condución:"
                    placeholder="Antecendentes relacionadas con la condución"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid>
                <Grid size={{xs: 6,sm: 6}}>
                  <CustomTextField
                    name="antecendentes_pp"
                    control={control}
                    label="Antecendentes personales patológicos:"
                    placeholder="Antecendentes personales patológicos"
                    disabled={!(stateUpdate || !client)}
                    icon={<MUIcons.AccountCircle/>}
                  />
                </Grid> 
                <Grid size={{xs: 6,sm: 6}} >
                  <StyledTitle sx={{ color: 'black'}}>Habítos:</StyledTitle>
                  <Box display="flex" flexDirection="row" gap={2} mt={0} px={1}>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="bebe"
                        control={control}
                        label="Bebe"
                        options={habitos}
                        disabled={!(stateUpdate || !client)}
                        placeholder='Seleccione una opsión'
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
                        placeholder='Seleccione una opsión'
                        icon={<MUIcons.SmokingRooms/>}
                      />
                    </Box>
                  </Box>
                </Grid> 
                <Grid size={{xs: 6,sm: 6}} >
                  <StyledTitle sx={{ color: 'black'}}>Vacunas:</StyledTitle>
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
            </DynamicAccordion>
            <DynamicAccordion
              key={'examen-clinico'}
              sx={{background:' #1fcbe9ff',mb:1}}
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
                    placeholder='Seleccione una opsión'
                    icon={<MUIcons.Liquor/>}
                  />
                </Grid>
                <Grid size={{xs: 3,sm: 3}}></Grid>
                <Grid size={{xs: 8,sm: 8}} sx={{pb:1,border:'1px solid #bee4eeff'}}>
                  <StyledTitle sx={{ color: 'black'}}>SIGNOS VITALES:</StyledTitle>
                  <Box display="flex" flexDirection="row" gap={2} mt={0} px={1}>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="temperatura"
                        control={control}
                        label="Temperatura"
                        options={temperaturas}
                        placeholder="Ingrese un valor"
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                    <Box sx={{width:'50%'}}>
                      <CustomSelect
                        name="presion_arterial"
                        control={control}
                        label="Presion Arterial"
                        options={presionActerial}
                        placeholder="Ingrese un valor"
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
                        placeholder="Ingrese un valor"
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
                        placeholder="Ingrese un valor"
                        options={presionRespiratoria}
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                  </Box>
                </Grid> 
                <Grid size={{xs: 4,sm: 4}} sx={{pb:1,border:'1px solid #bee4eeff'}}>
                  <StyledTitle sx={{ color: 'black'}}>SOMATOMETRIA:</StyledTitle>
                  <Box display="flex" flexDirection="column" gap={0.9} mt={0} px={1}>
                    <Box sx={{width:'100%'}}>
                      <CustomTextField
                        name="talla"
                        control={control}
                        label="Talla"
                        placeholder="Ingrese la talla"
                        type='number'
                        disabled={!(stateUpdate || !client)}
                        icon={<MUIcons.AccountCircle/>}
                      />
                    </Box>
                    <Box sx={{width:'100%'}}>
                      <CustomTextField
                        name="peso"
                        control={control}
                        label="Peso"
                        placeholder="Ingrese el peso"
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
              sx={{background:' #35e09fff'}}
              defaultExpanded={false}
              childrenTitle={
                <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                {'III. EXAMEN FISICO'}
              </StyledHeaderSecondary>
              }
            >
              <DynamicAccordion
                key={'examen-fisico-1'}
                sx={{background:' #7ae0b9ff',my:1}}
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
                    <StyledTitle sx={{color:'black'}}>EVALUACION OCTAMOOGICA </StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="ex_general_ojos"
                      control={control}
                      label="Examen general de hojos"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="movimiento_oculares"
                      control={control}
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
                      label="Reflejo luminoso corneal"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSwitchPerson
                      name="estrabismo"
                      control={control}
                      label="Estabismo"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
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
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSwitchPerson
                      name="cirugia"
                      control={control}
                      label="Cirugia"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
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
                  <Grid size={{xs: 4,sm: 4}}></Grid>
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
                        label="Oido externo"
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
                      label="Oroscopia"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="t_weber"
                      control={control}
                      label="T. Weber"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="t_rinne"
                      control={control}
                      label="T. Rimme"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-2'}
                sx={{background:' #7ae0b9ff',mb:1}}
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
                        label="Exoloración de torax"
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
                        label="Exploración cardiopolmunar"
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
                sx={{background:' #7ae0b9ff',mb:1}}
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
                        label="Exploracion de abdomen"
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
                sx={{background:' #7ae0b9ff',mb:1}}
                defaultExpanded={false}
                childrenTitle={
                  <StyledHeaderSecondary sx={{ mb: 0,fontSize:{xs:'1.0em', sm:'1.1em',md:'1.3em',color:'white'}}}>
                  {'4. EXPLORACION DEL APARATO LOCONMOTOR'}
                </StyledHeaderSecondary>
                }
              >
                <Grid container spacing={1}  sx={{paddingY:2}}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>Miembros Superiores</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="s_trofismo"
                      control={control}
                      label="Trofismo"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="s_tono_moscular"
                      control={control}
                      label="Tono Moscular"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="s_fuerza_moscular"
                      control={control}
                      label="Fuerza Moscular"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>Miembros Inferiores </StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="i_trofismo"
                      control={control}
                      label="Trofismo"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="i_tono_moscular"
                      control={control}
                      label="Tono moscular"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomTextField
                      name="i_fuerza_moscular"
                      control={control}
                      label="Fuerza Moscular"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                </Grid>
              </DynamicAccordion>
              <DynamicAccordion
                key={'examen-fisico-5'}
                sx={{background:' #7ae0b9ff'}}
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
                      label="Cordinacion y Marcha"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="reflejos_osteotendinosos"
                      control={control}
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
                      label="Talon-Rodilla"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="dedo_nariz"
                      control={control}
                      label="Dedo-Nariz"
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
                      label="Romberg"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="motoras_sensetivas_diagnosticadas"
                      control={control}
                      label="Motoras sensetivas diagnosticadas"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  
                  <Grid size={{xs: 12,sm: 12}}>
                    <StyledTitle sx={{color:'black'}}>RESULTADO DE EVALUACIÓN</StyledTitle>
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSwitchPerson
                      name="requiere_evaluacion_especialidad"
                      control={control}
                      label="Requiere evaluación de especialidad"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="motivo_referencia_especialidad"
                      control={control}
                      label="Motivo de la referencia de la especialidad"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 6,sm: 6}}>
                    <CustomTextField
                      name="evaluacion_especialidad"
                      control={control}
                      label="Resultado de la evaluación de la especialidad"
                      placeholder="Ingrese el detalle"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.AccountCircle/>}
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
                  <Grid size={{xs: 4,sm: 4}}>
                    <CustomSwitchPerson
                      name="requiere_evaluacion_psicosensometria"
                      control={control}
                      label="Requiere evaluación psicosensometria"
                      disabled={!(stateUpdate || !client)}
                      icon={<MUIcons.Vaccines />}
                      flexDirection='row'
                    />
                  </Grid>
                  <Grid size={{xs: 4,sm: 4}}></Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <Box display={'flex'} sx={{flexDirection:'column',alignItems:'start'}}>
                      <Box display={'flex'} sx={{width:'100%',flexDirection:'column',alignItems:'center'}}>
                        <StyledTitle sx={{color:'black'}}>RESULTADO FINAL DE CETIFICACION MEDICA:</StyledTitle>
                      </Box>
                      <StyledTitle sx={{color:'black',mt:0}}><strong>OBSERVACIONES:</strong>EN ESTE ACAPITE SE DEBE INCORPORAR SI EL POSTULANTE ES:</StyledTitle>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- APTO PARA CONDUCIR VEHICULOS.</StyledHeaderSecondary>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- NO ES APRO PARA CONSUCIR VEHICULOS INDICAR LOS MOTIVOS.</StyledHeaderSecondary>
                      <StyledHeaderSecondary sx={{color:'black',mt:0}}>- APTO CON LIMITACIONES Y ADAPTACIONES TECNICO VEHICULAR.</StyledHeaderSecondary>
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