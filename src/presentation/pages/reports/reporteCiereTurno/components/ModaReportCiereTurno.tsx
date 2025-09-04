import React, { useCallback, useEffect} from 'react';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Box,Modal, Paper,} from '@mui/material';
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
import DetalleCierreTurno from './DetalleCierreTurno';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  imprimimirCierreTurno: (idClient:number) => void;
  report?: Report | null;
  buttons:Button[];
}
const ModalReportCierreTurno: React.FC<UserFormProps> = ({ open, onClose, imprimimirCierreTurno,buttons, report}) => {
  
  useEffect(() => {
  
  }, []);  
  const handleClose = () => {
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
            {'Detalle de Reporte'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <ScrollableBox sx={{padding:0,paddingInline:1,margin:0}}>
          <DetalleCierreTurno
          report={report}
          imprimimirCierreTurno={imprimimirCierreTurno}
          />
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

export default ModalReportCierreTurno;