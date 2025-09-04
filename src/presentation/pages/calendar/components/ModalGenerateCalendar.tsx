import React, { useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import ModalHeader from '../../../components/containers/ModalHeader';
import {Grid,Box,Modal, Typography,} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import * as MUIcons from '@mui/icons-material';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { CloseButton } from '../../../components/buttons/CloseButton';
import ModalContainer from '../../../components/containers/ModalContainer';
import ScrollableBox from '../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../components/containers/ContainerButtons';
import ActionButton from '../../../components/buttons/ActionButton';
import { Button } from '../../../../domain/models/ButtonModel';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  handlePoblarPorAnio: (anio:number) => Promise<boolean>;
  buttons:Button[];
}
const validationSchema = yup.object().shape({
  anio: yup.string().required('Seleccione un año'),
});
const ModalGenerateCalendar: React.FC<UserFormProps> = ({ open, onClose, handlePoblarPorAnio,buttons}) => {
  const [listAnios, setListAnios] = useState<any>([])
  const { handleSubmit, control, formState: {errors}, reset, setValue,getValues } = useForm<any>({
      resolver: yupResolver(validationSchema),
        defaultValues: {...{
          anio:'0',
        },
      }
    });
  useEffect(() => {
    reset();
    let anio:number = Number(dayjs().get('year'))
    let anios:any =[];
    for (let i = 0; i < 4; i++) {
      anios.push({value:String(anio+i),label:String(anio+i)});
    }
    setListAnios(anios);
  }, [open]);
  const handleCreate = useCallback(async () => {
    await handleSubmit(async(data: any) =>{
      const response =  await handlePoblarPorAnio(Number(data.anio));
      if(response) handleClose();
      })();
  }, []);
  const actionHandlers:any = {
    handleCreate: handleCreate,
  };

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
      <ModalContainer sx={{width: { xs: '99%', sm: '60%', md: '40%'}}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario Generar Calendario'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
        <Box sx={{paddingY:2}}>
          <form >
            <ScrollableBox sx={{padding:1}}>
              <Grid container columnSpacing={0.5} rowSpacing={2}>
                <Grid
                  flexDirection={'column'}
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomAutocomplete
                    control={control}
                    name='anio'
                    label='seleccione un año'
                    labelOption='label'
                    valueOption='value'
                    options={listAnios}
                  />
                </Grid>
              </Grid>
            </ScrollableBox>
            <ContainerButtons>
              <ActionButton
                type="cancel"
                icon={<MUIcons.CancelTwoTone/>}
                onClick={handleClose}
              />
              {buttons.filter((button: Button) => (button.nombre === 'create')).map((button: any,index:number) => {
                return (
                    <ActionButton
                      key={`table-button-${button.id || index}`}
                      label='Generar Calendario'
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
                  )})}
            </ContainerButtons>
          </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalGenerateCalendar;