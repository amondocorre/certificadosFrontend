import React, {useState} from 'react';
import {Box,Modal, Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, Container,} from '@mui/material';
import ModalContainer from '../containers/ModalContainer';
import ModalHeader from '../containers/ModalHeader';
import { StyledTitle } from '../text/StyledTitle';
import ScrollableBox from '../containers/ScrollableBox';
import ActionButton from '../buttons/ActionButton';
import { Loading } from '../Loading';

const cellStyled ={
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  borderLeft: "1px solid white",
  fontSize:{xs:'0.8em', sm:'1.0em',md:'1.5em',lg:'1.8em' },
  padding: '0px', margin: '0px',
  wordBreak: 'normal',
  paddingLeft: '0px',
  paddingRight: '0px',
  height:{xs:'30px', sm:'35px',md:'40px'},
  lineHeight: 1.0,
  '::first-letter': {textTransform: 'uppercase',},
  textTransform: 'lowercase',
}
const cellHeaderStyle ={
  background:'#757575',
  borderLeft: "1px solid white",
  wordBreak: 'normal',
  padding: "0px",
  width: '30%',
  height:'25px'
  //minWidth: '100px', 
}
const textStyle={
  fontSize:{xs:'0.8em', sm:'0.9em',md:'1.3em' },
  marginLeft: '6px', 
  color: 'white',  
  fontFamily:'Times New Roman' 
}
interface FormProps {
  open: boolean;
  onClose: () => void;
  selectSucursal: (id_sucursal:number) => void;
  dataResponse:any;
}
const ModalSelectSucursal: React.FC<FormProps> = ({ open, onClose, selectSucursal,dataResponse}) => {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    onClose();
  };
  const handleSelectSucursal = async(id_sucursal:number)=>{
    setLoading(true);
    selectSucursal(id_sucursal);
    setLoading(false);
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '60%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Acceso a las Sucursales'}
          </StyledTitle>
          {/*<CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>*/}
        </ModalHeader>
        <Box sx={{paddingY:1}}>
          <ScrollableBox sx={{padding:0,paddingInline:1,margin:0}}>
            <Container maxWidth="xl" sx={{padding:0,margin:0,}}>
              <Paper
                elevation={24}
                sx={{padding:0,margin:0,paddingBottom: 1,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',border: '0px solid #FAD461', borderRadius: '8px'}}>
                  <TableContainer
                    onClick={() => {}}
                    component={Paper}
                    sx={{margin: '0px', padding: '0px', marginTop: '0px',width: '100%'}}>
                    <Table sx={{ tableLayout: "auto",width: '100%',maxHeight:'100%'}}>
                      <TableHead> 
                        <TableRow sx={{ '& th': { fontSize: '12px', position: 'sticky', top: 0, zIndex: 1 } }}>
                          <TableCell sx={{...cellHeaderStyle,width:{xs:'20%', sm:'20%',md:'20%' },}}align="center">
                            <Typography  sx={{ ...textStyle}} >
                              {'Opciones'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,width:{xs:'40%', sm:'40%',md:'40%' }}} align="center">
                            <Typography  sx={{ ...textStyle}} >
                              {'Sucursal'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{...cellHeaderStyle,width:{xs:'20%', sm:'20%',md:'20%' }}} align="center">
                            <Typography  sx={{ ...textStyle}} >
                              {'Teléfono'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {dataResponse?.user?.sucursales?.map((row: any, index: number) => {
                            return (
                              <TableRow key={index}>
                                <TableCell key={index} sx={{...cellStyled,paddingLeft: "5px", position: "sticky",}}align="center">
                                  <ActionButton
                                    type="cancel"
                                    label='Acceder'
                                    sx={{height:{xs:'30px', sm:'35px',md:'45px'}}}
                                    onClick={()=>{handleSelectSucursal(Number(row?.id_sucursal))}}
                                  />
                                </TableCell>
                                <TableCell sx={{...cellStyled}}align="center">
                                  {row.nombre}
                                </TableCell>
                                <TableCell sx={{...cellStyled}}align="center">
                                  {row.telefono}
                                </TableCell>
                              </TableRow>  
                            )})}
                            {dataResponse?.user?.perfil?.toUpperCase() ==='ADMIN' &&
                              <TableRow key={'01'}>
                                <TableCell sx={{...cellStyled,paddingLeft: "5px", position: "sticky",}}align="center">
                                  <ActionButton
                                    type="cancel"
                                    label='Acceder'
                                    sx={{height:{xs:'30px', sm:'35px',md:'45px'}}}
                                    onClick={()=>{handleSelectSucursal(Number(0))}}
                                  />
                                </TableCell>
                                <TableCell sx={{...cellStyled,borderRight:'0'}}align="center" >
                                  {'Acceso Administrador'}
                                </TableCell>
                                
                                <TableCell sx={{...cellStyled}}align="center" >
                                  {''}
                                </TableCell>
                              </TableRow> 
                            }
                      </TableBody>
                    </Table>
                  </TableContainer>
              </Paper>
            </Container>
          </ScrollableBox>
        </Box>
        {loading &&<Loading></Loading>}
      </ModalContainer>
    </Modal>
  );
};

export default ModalSelectSucursal;