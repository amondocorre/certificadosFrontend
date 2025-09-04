import React, { useCallback, useEffect, useState,} from 'react';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import { StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { Sucursal } from '../../../../../domain/models/SucursalModel';
import SwitchSimple from '../../../../components/inputs/SwitchSimple';

interface SucursalUserFormProps {
  open: boolean;
  onClose: () => void;
  updateSucursalUser: (id:number,sucursales:string[]) => void;
  sucursalUser?: any | null;
  buttons:Button[];
  listSucursales:Sucursal[];
}
const ModalSucursalUser: React.FC<SucursalUserFormProps> = ({ open, onClose,updateSucursalUser,buttons,sucursalUser,listSucursales}) => {
  //const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  //const stateUpdate = !(btnUpdate?.length===0)
  const [selectSucursales, setSelectSucursales] = useState<string[]>([]);
  useEffect(() => {
    if (sucursalUser) {
      if (Array.isArray(sucursalUser.sucursales)) {
        setSelectSucursales(sucursalUser.sucursales);
    }
    } else { 
        setSelectSucursales([]);
    }
  }, [sucursalUser]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
    if (event.target.checked) {
        setSelectSucursales([...selectSucursales, buttonId]);
    } else {
        setSelectSucursales(selectSucursales.filter((id) => id !== buttonId));
    }
  };
  const handleUpdate = useCallback(async () => {
    updateSucursalUser(Number(sucursalUser?.id_usuario),selectSucursales)
  }, [sucursalUser,selectSucursales]);
  const actionHandlers:any = {
    handleUpdate: handleUpdate,
  };
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
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Permisos sucursales'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <MUIcons.Close />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3}>
              <Grid size={{xs:12,sm:12}} sx={{ width: '100%' }}>
                <Grid container >
                <Grid size={{xs:12,sm:12}} sx={{ border: '1px solid #1976d2', borderRadius: '8px', }}>
                  <StyledHeaderSecondary sx={{ mb: 1}}>
                    Sucursales
                  </StyledHeaderSecondary>
                  <Grid container >
                    {listSucursales.map((sucursal: Sucursal) => ( 
                        <Grid size={{xs:6,sm:6}}sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SwitchSimple
                            id={String(sucursal.id_sucursal)}
                            label={sucursal.nombre}
                            //icon={React.createElement(MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label)}
                            onChange={handleSwitchChange}
                            defaultChecked ={selectSucursales.includes(String(sucursal.id_sucursal))}
                          />
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (sucursalUser && button.nombre === 'update' ))
            .map((button: any,index:number) => {
              if (sucursalUser?.id_usuario && button?.tipo === 'table') {
                return (
                  <ActionButton
                    key={`header-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={() => {
                      if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                        actionHandlers[button.onclick](); 
                      } else if (typeof button.onclick === 'function') {
                        button.onclick();
                      }
                    }}
                    disabled={false} 
                  />
                );
              }
              return null; 
            })}
          </ContainerButtons>
        </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalSucursalUser;