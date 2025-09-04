import React, { useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import ModalHeader from '../../../components/containers/ModalHeader';
import {Grid,Box,Modal, Typography,} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { CloseButton } from '../../../components/buttons/CloseButton';
import ModalContainer from '../../../components/containers/ModalContainer';
import ScrollableBox from '../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../components/containers/ContainerButtons';
import ActionButton from '../../../components/buttons/ActionButton';
import { Button } from '../../../../domain/models/ButtonModel';
import { DiaCalendario } from '../../../../domain/models/CalendarModel';
import SwitchSimple from '../../../components/inputs/SwitchSimple';
interface UserFormProps {
  open: boolean;
  onClose: () => void;
  updateDate: (diaCalendario:DiaCalendario) => Promise<boolean>;
  diaCalendario: DiaCalendario | null;
  buttons:Button[];
}
const ModalDate: React.FC<UserFormProps> = ({ open, onClose, updateDate,buttons, diaCalendario}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const [esFeriado, setEsFeriado] = useState(false)
  const { handleSubmit, control, formState: {errors}, reset, setValue,getValues } = useForm<DiaCalendario>({});
  useEffect(() => {
    reset();
    if (diaCalendario) {
        setValue('dia_mes',diaCalendario.dia_mes);
        setValue('es_feriado',diaCalendario.es_feriado);
        setValue('es_fin_de_semana',diaCalendario.es_fin_de_semana);
        setValue('es_laboral',diaCalendario.es_laboral);
        setValue('fecha',diaCalendario.fecha);
        setValue('nombre_feriado',diaCalendario.nombre_feriado);
        if(diaCalendario.es_feriado==='1') {
          setEsFeriado(true);}
    }
  }, [diaCalendario]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit(async(data: DiaCalendario) =>{
      const response =  await updateDate(data);
      if(response) handleClose();
      })();
  }, []);
  const actionHandlers:any = {
    handleUpdate: handleUpdate,
  };
  const handleSwitch=(event: React.ChangeEvent<HTMLInputElement>, id: string)=>{
    if(id ==='es_laboral' || id ==='es_feriado'){
      setValue(id,event.target.checked?'1':'0');
    }
    if(getValues('es_feriado')==='1'){
      setEsFeriado(true);
      setValue('nombre_feriado',diaCalendario?.nombre_feriado)
    }else{
      setValue('nombre_feriado','')
      setEsFeriado(false);
    }
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
      <ModalContainer sx={{width: { xs: '99%', sm: '60%', md: '40%'}}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de dia calendario'}
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
                  <Typography variant="h5" align="center"  sx={{color:'black'}}>
                    {diaCalendario?.dia_semana+'  '}
                  </Typography>
                  <Typography variant="h5" align="center" sx={{color:'black'}} >
                    {diaCalendario?.fecha}
                  </Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 6,
                    sm: 6
                  }}>
                  <SwitchSimple
                    id="es_laboral"
                    label="Es Dia Laboral"
                    defaultChecked={(diaCalendario?.es_laboral==='1')}
                    disabled={!(stateUpdate || !diaCalendario)}
                    onChange={handleSwitch}
                    //icon={<MUIcons.Numbers/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 6,
                    sm: 6
                  }}>
                  <SwitchSimple
                    id="es_feriado"
                    label="Es Feriado"
                    defaultChecked ={(diaCalendario?.es_feriado==='1')}
                    disabled={!(stateUpdate || !diaCalendario)}
                    onChange={handleSwitch}
                    //icon={<MUIcons.Numbers/>}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 12
                  }}>
                  <CustomTextField
                    name="nombre_feriado"
                    control={control}
                    label="Fombre Feriado"
                    placeholder="nombre feriado"
                    disabled = {(!(stateUpdate || !diaCalendario) || !esFeriado)}
                    icon={<MUIcons.Label/>}
                    height={{xs: '1.7em', sm: '1.9em', md: '2.6em'}}
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
              {buttons.filter((button: Button) => (diaCalendario && button.nombre === 'update')).map((button: any,index:number) => {
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
                  )})}
            </ContainerButtons>
          </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDate;