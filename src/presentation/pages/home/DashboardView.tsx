import React, { useEffect, useState } from 'react';
import TotalClientesCard from './components/TotalClientesCard';
import TotalIngresosDiarios from './components/IngresosDiarios';
import Grid from '@mui/material/Grid';
import { dashboardContainer } from '../../../di/dashboardContainer';
import { EvaluationData, IngresosDiarios} from '../../../domain/models/DashboardModel';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../hooks/useAuth';
import ModalRentDetail from './components/ModalDetaleContrato';
import TableMedical from './components/TableMedical';
import TablePsychological from './components/TablePsychological';
import { useNavigate } from 'react-router-dom';


const DashboardView: React.FC = () => {
  const { authResponse } = useAuth();
  const [medical, setMedical] = useState<EvaluationData>({total: 0,masculino: 0,femenino: 0});
  const [psychological, setPsychological] = useState<EvaluationData>({total: 0,masculino: 0,femenino: 0});
  const [ingresosDiarios, setIngresosDiarios] = useState<IngresosDiarios[]>([]);
  const [sucursal, setSucursal] = useState('-1')
  const DashboardViewModel = dashboardContainer.resolve('dashboardViewModel');
  const [loading, setLoading] = useState(false);
  const [idContrato, setIdContrato] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenPsychological =(id:number)=>{
    setIdContrato(id);
    navigate('/evaluation-psychological?id='+id);
  }
  const handleOpenMedical =(id:number)=>{
    setIdContrato(id);
    navigate('/evaluation-medical?id='+id);
  }
  const handleCloseModal =()=>{
    setIdContrato(0);
    setOpenModal(false);
  }
  useEffect(() => {
    if(authResponse){
      setSucursal(String(authResponse?.id_sucursal))  
      getIngresosDiarios(Number(authResponse?.id_sucursal));
      getTotalEvaluations(Number(authResponse?.id_sucursal));
    }
  }, [authResponse]);
  const getIngresosDiarios = async (id_sucursal:number) => {
    setLoading(true)
    try {
      const response = await DashboardViewModel.getIngresosDiarios(id_sucursal);
      setIngresosDiarios(response);
    } catch (error) {setIngresosDiarios([])}
    setLoading(false)
  };
  
  const listEvaMedical = async (limit:number,page:number) => {
    try {
      const response = await DashboardViewModel.listEvaMedical(Number(sucursal),limit,page);
      return response;
    } catch (error) {
      return {'data':[],pagination:{'total':0}}
    }
  }; 
  const listEvaPsychological = async (limit:number,page:number) => {
    try {
      const response = await DashboardViewModel.listEvaPsychological(Number(sucursal),limit,page);
      return response;
    } catch (error) {
      return {'data':[],pagination:{'total':0}}
    }
  }; 
  const getTotalEvaluations = async (id_sucursal:Number) => {
    setLoading(true)
    try {
      const response = await DashboardViewModel.getTotalEvaluations(Number(id_sucursal));
      if(response?.psychological) setPsychological(response.psychological)
      if(response?.medical) setMedical(response.medical)
      setLoading(false)
      return response;
    } catch (error) {
      setLoading(false)
      return {'data':[],pagination:{'total':0}}
    }
  };
  const getDetailRent = async (idContrato:number) => {
   
    return {'data':[],'productos':[]}
  }; 
  return (
    <div>
      <Grid container rowSpacing={.5} columnSpacing={1} sx={{pt:0.5}}>
        <Grid size={{xs: 6,md: 3}}>
          <TotalClientesCard  
            total={medical.total}
            masculino={medical.masculino}
            femenino={medical.femenino} 
            tipo='1'
          /> 
        </Grid>
        <Grid size={{xs: 6,md: 3}}>
          <TotalClientesCard  
            total={psychological.total}
            masculino={psychological.masculino}
            femenino={psychological.femenino} 
            tipo='2'
          /> 
        </Grid>
        <Grid
          sx={{ }}
          size={{xs: 12,md: 6}}>
            {ingresosDiarios && <TotalIngresosDiarios data={ingresosDiarios} />}
        </Grid>
        <Grid sx={{ }}size={{xs: 12,md: 6}}>
            <TableMedical handleOpen={handleOpenMedical} listEvaMedical={listEvaMedical} id_sucursal={sucursal}/>
        </Grid>
        <Grid sx={{ }}size={{xs: 12,md: 6}}>
            <TablePsychological handleOpen={handleOpenPsychological} listEvaPsychological={listEvaPsychological} id_sucursal={sucursal}/>
        </Grid>
      </Grid>
      <ModalRentDetail
        key={'modal-detail-rent'}
        open={openModal}
        onClose={handleCloseModal}
        idContrato={idContrato}
        getDetailRent={getDetailRent}
      />
      {loading &&<Loading></Loading>}
    </div>
  );
};

export default DashboardView;