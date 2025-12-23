import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid, Box, Tooltip,} from '@mui/material';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import DataClient from './components/DataClient';
import { ExplorationContainer } from '../../../../di/evaluation/ExplorationContainer';
import { Exploration } from '../../../../domain/models/Evaluation';
import { MedicalContainer } from '../../../../di/evaluation/MedicalContainer';
import { EvaluationMedical } from '../../../../domain/models/EvaluationMedical';
import ContainerFilter from '../../../components/containers/ContainerFilter';
import CustomAutocompletePerson from '../../../components/inputs/CustomAutocompletePerson'; 

import { useForm } from 'react-hook-form';
import { printContainer } from '../../../../di/prints/printContainer';
import { useAuth } from '../../../hooks/useAuth';
import { string } from 'yup';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const MedicalView: React.FC = memo(() => {
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const location = useLocation();
   const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get('id'));
  const UserViewModel = userContainer.resolve('UserViewModel');
  const ExplorationViewModel = ExplorationContainer.resolve('explorationViewModel');
  const MedicalViewModel = MedicalContainer.resolve('medicalViewModel');
  const PrintViewModel = printContainer.resolve('printViewModel');
  const [loading, setLoading] = useState(false)
  const [buttons , setButtons] = useState<Button[]>([])
  const [selectClient, setSelectClient] = useState<any>(null)
  const { control,setValue,getValues} = useForm();
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
    useEffect(()=>{
    if(id) findIdentity(id)
  },[id])
  const handleCreate = useCallback(async(data:EvaluationMedical)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo cliente?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const sucursalAutenticada = authResponse?.id_sucursal && authResponse.id_sucursal !== 0
        ? authResponse.id_sucursal
        : 1;
      data.id_sucursal = String(sucursalAutenticada);

      const response:any = await MedicalViewModel.create(data);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        setSelectClient(response.data);
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[authResponse])
  const handleUpdate = useCallback(async(data:EvaluationMedical)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      data.id_sucursal = String(data.id_sucursal?data.id_sucursal:authResponse?.id_sucursal!=0?authResponse?.id_sucursal:'0');
      const response:any = await MedicalViewModel.update(data);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        setSelectClient(response.data);
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[authResponse])
  const handleActivate = useCallback(async(id:number)=>{
    const result = await AlertConfirm({title:'Estas seguro de habilitar la opción de Editar?.'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response:any = await MedicalViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        setSelectClient(response.data);
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        setButtons(response!.buttons);
      } else {
        setButtons([]);
      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getExploration = useCallback(async (exploration:Exploration):Promise<Exploration[]> => {
    try {
      const response = await ExplorationViewModel.search(exploration);
      if ('status' in response && response.status === 'success') {
        return response.data;
      } else 
        return [];
    } catch (error) {}
    return []
  },[]);
  const searchEvaluation = useCallback(async (value:string,name:string):Promise<EvaluationMedical[]> => {
    try {
      const response = await MedicalViewModel.search(value);
      if ('status' in response && response.status === 'success') {
        return response.data;
      } else 
        return [];
    } catch (error) {}
    return []
  },[]);
  const handleCreateExploration = useCallback(async(exploration:Exploration)=>{
    const result = await AlertConfirm({title:'Estas seguro de giuardar la ingormacion?',confirmButtonText:'Guardar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response =  await ExplorationViewModel.create(exploration);
      if ('status' in response && response.status==='success') {
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const findIdentity = useCallback(async (id:number) => {
    setLoading(true)
      try {
        const response = await MedicalViewModel.findIdentity(id);
        setLoading(false)
        if ('status' in response && response.status === 'success') {
          setSelectClient(response.data);
        } else 
          setSelectClient(null)
      } catch (error) {setSelectClient(null)}
      setLoading(false)
  },[]);
  const printEvaluation = async (id:number) => {
    setLoading(true)
    try {
      await PrintViewModel.printEvaMedical(id);
    } catch (error) {}
    setLoading(false)
  };
  const handleMedical = (data:any)=>{
    setSelectClient(data);
  }
  const resetData=()=>{
    if(id){
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete('id');
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
    setValue('id_evaluacion_medica','');
    setSelectClient(null);
  }
  return (
    <div>
      <HeaderPage>
        <Grid size={{xs: 6.5,sm: 7,md: 8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid size={{xs: 5.5,sm: 5,md: 4}} container justifyContent="end"alignItems="end"alignSelf={'center'}>
        </Grid>
      </HeaderPage>
      <ContainerFilter>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }} rowSpacing={{ xs: 2, sm: 1, md: 1 }}>
          <Grid size={{xs: 12,sm: 12,md: 12}}>
            <Box display="flex" sx={{flexDirection:'row',pr:1,alignItems:'center'}}>
              <Tooltip title={selectClient?"Para seleccionar de nuevo primero debe limpiar el fomulario":''} 
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize:'16px',
                      color:'#f03434ff',
                      backgroundColor: '#f1f1f1',
                    },
                  },
                }}>
                <span style={{ display: 'inline-block', width: '100%' }}>
                <CustomAutocompletePerson
                  labelOption='text'
                  getOptions = {searchEvaluation}
                  valueOption='text'
                  name="id_evaluacion_medica"
                  control={control}
                  label="Buscar un registro"
                  placeholder="Ingrese un numero ci  o nombre"
                  handleChange={handleMedical}
                  disabled={!!(selectClient)}
                  icon={<MUIcons.AccountCircle/>}
                />
                </span>
              </Tooltip>
              <Tooltip title="Lipiar formulario" sx={{cursor:'pointer'}} componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize:'16px',
                      backgroundColor: '#f03434ff',
                    },
                  },
                }}>
              <MUIcons.Delete sx={{cursor:'pointer',color:'red',ml:1}} onClick={resetData}/>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </ContainerFilter>
      <div>
        <DataClient
          createMedical={handleCreate}
          updateMedical={handleUpdate}
          activateMedical={handleActivate}
          getExploration={getExploration}
          createExploration={handleCreateExploration}
          printEvaluation={printEvaluation}
          client={selectClient}
          buttons={buttons}
          />
      </div>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default MedicalView;