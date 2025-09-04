import React, { useEffect, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import ModalHeader from '../../../components/containers/ModalHeader';
import {Box,Modal,} from '@mui/material';
import {Close as CloseIcon,} from '@mui/icons-material';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { CloseButton } from '../../../components/buttons/CloseButton';
import ModalContainer from '../../../components/containers/ModalContainer';
import ScrollableBox from '../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../components/containers/ContainerButtons';
import ActionButton from '../../../components/buttons/ActionButton';
import dayjs from 'dayjs';
import { formatDate } from '../../../utils/dateUtils';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  idContrato:number;
  getDetailRent:(id:number)=>Promise<any>;
}
const ModalRentDetail: React.FC<UserFormProps> = ({ open, onClose,idContrato,getDetailRent}) => {
  const fechaActual = String(formatDate(String(dayjs())));
  const [rent, setRent] = useState<any>(null)
  const [productos, setProductos] = useState<any>([])
  const { control,reset, setValue,getValues } = useForm<any>({});
  useEffect(() => {
    setProductos([]);
    if(idContrato>0){
      fetchData();
    }
  }, [idContrato]);
  const fetchData = async () => {
    try {
      const json =await getDetailRent(idContrato);
      setRent(json.data);
      setProductos(json.productos);
    } catch (error) {
      setRent([]);
      setProductos([]);
    }
  };
  const handleClose = () => {
    reset();
    onClose();
    setRent([]);
    setProductos([]);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '95%', md: '90%', lg: '80%', xl: '75%'}}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Detalle de la deuda'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:1}}>
        <ScrollableBox sx={{padding:0,paddingInline:1,margin:0}}>
          <div style={{marginTop:1}}>
          </div>
        </ScrollableBox>
        <ContainerButtons>
          <ActionButton
            type="cancel"
            sx={{fontSize:{xs:'0.6em', sm:'0.7em',md:'1.0em'},height:{xs:'30px', sm:'35px',md:'45px'}}}
            onClick={handleClose}
          />
        </ContainerButtons>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalRentDetail;