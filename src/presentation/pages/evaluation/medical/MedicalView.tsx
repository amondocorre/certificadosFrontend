import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid, Box,styled, Tooltip,} from '@mui/material';
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
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const MedicalView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const ExplorationViewModel = ExplorationContainer.resolve('explorationViewModel');
  const MedicalViewModel = MedicalContainer.resolve('medicalViewModel');
  const [loading, setLoading] = useState(false)
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [selectClient, setSelectClient] = useState<any>(null)
  const { control,setValue,getValues} = useForm();
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(async(data:EvaluationMedical)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo cliente?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
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
  },[])
  const handleUpdate = useCallback(async(data:EvaluationMedical)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
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
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
  };
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        var btnHeader:any = [];
        var btnTable:any= [];
        setButtons(response!.buttons);
        response!.buttons.forEach((button:any) => {
          const IconComponent = MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label;
          if (!IconComponent) {
            console.warn(`Icono "${button.icono}" no encontrado en MUIcons.`);
          }
          const newButton = {
            title: button.descripcion,
            tooltip: button.tooltip,
            icon: <IconComponent />,
            onClick:  () => {
              if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                actionHandlers[button.onclick](); 
              } else if (typeof button.onclick === 'function') {
                button.onclick();
              }
            }
          }
          if(button!.tipo ==='header'){
            btnHeader.push(newButton);
          }else{
            btnTable.push(newButton);
          }
        });
        setButtonsHeader(btnHeader);
        setButtonsTable(btnTable)
      } else {

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

  const handleMedical = (data:any)=>{
    setSelectClient(data);
  }
  const resetData=()=>{
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
                      backgroundColor: '#f8d226ff',
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
          getExploration={getExploration}
          createExploration={handleCreateExploration}
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