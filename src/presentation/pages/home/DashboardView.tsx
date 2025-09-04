import React, { useEffect, useState } from 'react';
import TotalClientesCard from './components/TotalClientesCard';
import TotalIngresosDiarios from './components/IngresosDiarios';
import Grid from '@mui/material/Grid';
import { dashboardContainer } from '../../../di/dashboardContainer';
import { IngresosDiarios } from '../../../domain/models/DashboardModel';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../hooks/useAuth';
import TableRent from './components/TableRent';
import ModalRentDetail from './components/ModalDetaleContrato';

interface ClientesSexoData {
  total: number;
  masculino: number; 
  femenino: number;
}
const DashboardView: React.FC = () => {
  const { authResponse } = useAuth();
  const [clientesSexoData, setClientesSexoData] = useState<ClientesSexoData>({total: 0,masculino: 0,femenino: 0});
  const [ingresosDiarios, setIngresosDiarios] = useState<IngresosDiarios[]>([]);
  const [sucursal, setSucursal] = useState('-1')
  const DashboardViewModel = dashboardContainer.resolve('dashboardViewModel');
  const [loading, setLoading] = useState(false);
  const [idContrato, setIdContrato] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal =(id:number)=>{
    setIdContrato(id);
    setOpenModal(true);
  }
  const handleCloseModal =()=>{
    setIdContrato(0);
    setOpenModal(false);
  }
  useEffect(() => {
    if(authResponse){
      setSucursal(String(authResponse?.id_sucursal))  
      getIngresosDiarios(Number(authResponse?.id_sucursal));
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
  const listRent = async (limit:number,page:number) => {
    //setLoading(true)
    try {
      const response = await DashboardViewModel.listRent(Number(sucursal),limit,page);
      ///setLoading(false)
      return response;
    } catch (error) {
      //setLoading(false)
      return {'data':[],pagination:{'total':0}}
    }
  }; 
  const listRentEntrega = async (limit:number,page:number) => {
    try {
      const response = await DashboardViewModel.listRentEntrega(Number(sucursal),limit,page);
      return response;
    } catch (error) {
      return {'data':[],pagination:{'total':0}}
    }
  }; 
  const getDetailRent = async (idContrato:number) => {
    setLoading(true)
    try {
      const response = await DashboardViewModel.getDetailRent(idContrato);
      setLoading(false)
      return response;
    } catch (error) {
      setLoading(false)
      return {'data':[],'productos':[]}
    }
  }; 
  return (
    <div>
      <Grid container rowSpacing={.5} columnSpacing={1} sx={{pt:0.5}}>
        <Grid
          sx={{ }}
          size={{xs: 12,md: 3}}>
          <TotalClientesCard  
            total={clientesSexoData.total}
            masculino={clientesSexoData.masculino}
            femenino={clientesSexoData.femenino} 
          />
        </Grid>
        <Grid
          sx={{ }}
          size={{xs: 12,md: 9}}>
            {ingresosDiarios && <TotalIngresosDiarios data={ingresosDiarios} />}
        </Grid>
        <Grid sx={{ }}size={{xs: 12,md: 6}}>
            <TableRent handleOpenModal={handleOpenModal} listRent={listRentEntrega} id_sucursal={sucursal} tipo='1'/>
        </Grid>
        <Grid sx={{ }}size={{xs: 12,md: 6}}>
            <TableRent handleOpenModal={handleOpenModal} listRent={listRent} id_sucursal={sucursal} tipo='2'/>
            
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