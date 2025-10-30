import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Box,Modal, Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody,} from '@mui/material';
import {Close as CloseIcon,} from '@mui/icons-material';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';

import * as MUIcons from '@mui/icons-material';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import { Report } from '../../../../../domain/models/ReportModel';
import { Container } from '@mui/system';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { formatDateDMY, formatTime12H } from '../../../../utils/dateUtils';

const cellStyled ={
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  borderLeft: "1px solid white",
  padding: '0px', margin: '0px',
  wordBreak: 'normal',
  paddingLeft: '0px',
  paddingRight: '0px',
  height:'31px'
}
const cellHeaderStyle ={
  background:'#757575',
  borderLeft: "1px solid white",
  wordBreak: 'normal',
  padding: "0px",
  width: '20%',
  minWidth: '100px', 
}
const textStyle={
  marginLeft: '6px', 
  color: 'white', 
  fontSize:'18px', 
  fontFamily:'Times New Roman' 
}

const validationSchema = yup.object().shape({
    a_cuenta: yup.number().typeError('Ingrese un número válido').required('Ingrese un valor').min(1,'Ingrese un valor mayor a 0'),
    id_forma_pago: yup.string().required('Selecione una forma de pago')
  });

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  pagarDeuda: (idClient:number,aCuenta:number,idFormaPago:number) => void;
  report?: Report | null;
  buttons:Button[];
}
const ModalReport: React.FC<UserFormProps> = ({ open, onClose, pagarDeuda,buttons, report}) => {
  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      id_forma_pago: '',
      a_cuenta: '',
    },
  }
  });
  useEffect(() => {
  
  }, []);

  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Report) =>{
      const id_forma_pago = Number(data?.id_forma_pago);
      const idClient = Number(report?.id_cliente);
      const a_cuenta = Number(data.a_cuenta)>0?(Number(data.a_cuenta)-Number(data.cambio)).toFixed(2):data.a_cuenta;
      pagarDeuda(idClient,a_cuenta,id_forma_pago)
    })();
  }, [report]);
  const actionHandlers:any = {
    handleUpdate: handleUpdate,
  }
  const handleOnChangeInput=(value:any,name:any)=>{
    const a_cuenta = Number(value);
    const total_pagar = Number(report?.saldo_pagar);
    if(a_cuenta>total_pagar){
      setValue('cambio',a_cuenta-total_pagar);
    }else setValue('cambio','0.00');
  }
  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '90%', md: '80%', lg: '70%', xl: '60%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Detalle de la venta'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <ScrollableBox sx={{padding:0,paddingInline:1,margin:0}}>
          <Container component="view" maxWidth="xs" sx={{padding:0,margin:0}}>
            <Paper
              elevation={1}
              sx={{padding:0,margin:0,paddingBottom: 1,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',border: '1px solid #1976d2', borderRadius: '8px'}}>
                <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',paddingInline:1,width: "100%"}}>
                  <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center',}}>
                    
                    <StyledHeaderSecondary sx={{ mb: 0 }}>
                      Datos de la venta
                    </StyledHeaderSecondary>
                  </Box>
                  <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'start',}}>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Cliente:</strong> {report?.nombre_completo}
                    </StyledHeaderSecondary>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Fecha Compra: </strong> {report?.fecha_compra?formatDateDMY(report?.fecha_compra) +' '+formatTime12H(report?.fecha_compra):''}
                    </StyledHeaderSecondary>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Precio Total: </strong> {report?.precio_servicio}{' Bs.'}
                    </StyledHeaderSecondary>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Decuento Total: </strong> {report?.descuento}{' Bs.'}
                    </StyledHeaderSecondary>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Total Pagado: </strong> {report?.monto_pagado}{' Bs.'}
                    </StyledHeaderSecondary>
                    <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                      <strong>Deuda Total: </strong> {report?.saldo_pagar}{' Bs.'}
                    </StyledHeaderSecondary>
                  </Box>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',paddingInline:1,paddingTop:2,width: "100%"}}>
                  <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center',}}>
                    <MUIcons.Details/>
                    <StyledHeaderSecondary sx={{ mb: 0 }}>
                      Detalle de la venta
                    </StyledHeaderSecondary>
                  </Box>
                  <TableContainer
                    onClick={() => {}}
                    component={Paper}
                    sx={{margin: '0px', padding: '0px', marginTop: '5px'}}>
                    <Table sx={{ tableLayout: "auto" }}>
                      <TableHead> 
                        <TableRow sx={{"& th": {fontSize: "16px",}}}>
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'Mascota:'}
                              </Typography>  
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'Servicio:'}
                              </Typography>  
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'precio Contrato:'}
                              </Typography>  
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'Descuento:'}
                              </Typography>  
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'Monto pagado:'}
                              </Typography>  
                          </TableCell>
                          
                          <TableCell sx={{...cellHeaderStyle,position:"sticky",}}align="left">
                            <Typography  sx={{ ...textStyle}} >
                                {'Deuda:'}
                              </Typography>  
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,width:'40%',position:"sticky",}} align="center">
                              <Typography  sx={{ ...textStyle}} >
                                {'Fecha Compra'}
                              </Typography>
                            </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {report?.detalle?.map((row: any, index: number) => {
                            return (
                              <TableRow key={index}>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.mascota}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.servicio}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.precio_servicio}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.descuento}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.monto_pagado}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row.saldo_pagar}
                                </TableCell>
                                <TableCell sx={{...cellStyled , minWidth: '50px',  position: "sticky",}}align="center">
                                  {row?.fecha_compra?formatDateDMY(row?.fecha_compra) +' '+formatTime12H(row?.fecha_compra):''}
                                </TableCell>
                              </TableRow>  
                            )})}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
          </Container>
        </ScrollableBox>
        <ContainerButtons>
          <ActionButton
            type="cancel"
            onClick={handleClose}
          />
        </ContainerButtons>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalReport;