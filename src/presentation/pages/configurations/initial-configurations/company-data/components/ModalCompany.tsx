import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../../components/buttons/ActionButton';
import { Button } from '../../../../../../domain/models/ButtonModel';
import { Company } from '../../../../../../domain/models/CompanyModel';
import MapComponent from '../../../../../components/inputs/MapContainer';
import CustomImageUpload from '../../../../../components/inputs/CustomImageUpload';

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  correo: yup.string().required('El correo es obligatorio'),
  nit: yup.string().required('El nit es obligatorio'),
  celular: yup.number().required('El celular es obligatorio'),
});


interface CompanyFormProps {
  open: boolean;
  onClose: () => void;
  createCompany: (data: Company) => void;
  updateCompany: (data: Company,id:number) => void;
  deleteCompany: (id: string) => void;
  activateCompany: (id: string) => void;
  company?: Company | null;
  buttons:Button[];
}
const ModalCompany: React.FC<CompanyFormProps> = ({ open, onClose, createCompany,updateCompany,deleteCompany,activateCompany,buttons,company}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
const defaultLocation = { lat: -17.3936, lng: -66.1571 };
   const initialMapPosition = company?.ubicacion_gps
    ? {
        lat: parseFloat(company.ubicacion_gps.split(',')[0]),
        lng: parseFloat(company.ubicacion_gps.split(',')[1]),
      }
    : defaultLocation;
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Company>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: '',
      nit:              '',
      direccion:       '',
      telefono:        '',
      celular:          0,
      correo:           '',
      pagina_web:      '',
      ubicacion_gps:   '',
      logo_empresa:    '',
      logo_impresion:  '',
      pie_documento:   '',
    }
  });
  useEffect(() => {
    if (company) {
      Object.keys(company).forEach((key:any) => {
        if(key !== 'updated_at' && key !== 'updated_at' && key !=='url_logo_impresion' && key!=='url_logo_empresa'){
          setValue(key, (company[key as keyof Company] ?? null));
        }
      });
    }
  }, [company, setValue,open]);
   const handleMapPositionChange = (newPosition: L.LatLngLiteral) => {
    setValue('ubicacion_gps', `${newPosition.lat},${newPosition.lng}`);
  };
  const handleCreate = useCallback(async () => {
    const logoE = document.getElementById('image-upload-logo_empresa') as HTMLInputElement;
    const logoI = document.getElementById('image-upload-logo_impresion') as HTMLInputElement;
    let fileE = logoE.files?.[0];
    let fileI = logoI.files?.[0];
      await handleSubmit((data: Company) => {
        data.fileE = fileE;
        data.fileI = fileI;
        createCompany(data)})
  }, [company]);
  const handleUpdate = useCallback(async () => {
    const logoE = document.getElementById('image-upload-logo_empresa') as HTMLInputElement;
    const logoI = document.getElementById('image-upload-logo_impresion') as HTMLInputElement;
    let fileE = logoE.files?.[0];
    let fileI = logoI.files?.[0];
    await handleSubmit((data: Company) =>{  
      data.fileE = fileE;
      data.fileI = fileI;
      updateCompany(data,Number(company?.id_empresa_sis))
    })();
  }, [company]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_empresa_sis'));
    await deleteCompany(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_empresa_sis'));
    await activateCompany(id)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate:handleActivate
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="company-form-modal-title"
      aria-describedby="company-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Empresa'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <MUIcons.Close />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 6,
                  sm: 6
                }}>
                <CustomImageUpload
                  defaultValue={company?.logo_empresa?company?.logo_empresa:''}
                  name="logo_empresa"
                  control={control}
                  disabled={!(stateUpdate || !company)}
                  label="Subir logo empresa"
                />
              </Grid>
              <Grid
                size={{
                  xs: 6,
                  sm: 6
                }}>
                <CustomImageUpload
                  defaultValue={company?.logo_impresion?company?.logo_impresion:''}
                  name="logo_impresion"
                  control={control}
                  disabled={!(stateUpdate || !company)}
                  label="Subir logo de impresion"
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nombre" 
                  control={control} 
                  label="Nombre" 
                  placeholder="Ingrese el nombre" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.Store />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nit" 
                  control={control} 
                  label="Nit" 
                  placeholder="Ingrese el nit" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.Spa />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="correo" 
                  control={control} 
                  label="Correo" 
                  placeholder="ingrese el correo" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.Email />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="celular" 
                  control={control} 
                  label="Celular" 
                  type='number'
                  placeholder="Ingrese el celular" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.PhoneAndroid />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="telefono" 
                  control={control} 
                  label="Telefono" 
                  type='number'
                  placeholder="Ingrese el telefono" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.Call />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="pagina_web" 
                  control={control} 
                  label="Pagina web" 
                  placeholder="Ingrese la pagina web" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.TravelExplore />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="direccion" 
                  control={control} 
                  label="Direccion" 
                  placeholder="Ingrese la direccion" 
                  disabled={!(stateUpdate || !company)}
                  icon={<MUIcons.LocationOn />} 
                />
              </Grid>
              <Grid size={12}>
                <MapComponent
                  control={control}
                  initialPosition={initialMapPosition}
                  onPositionChange={handleMapPositionChange}
                  disabled={!(stateUpdate || !company)}
                />
              </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (button.nombre !== 'activate' && button.nombre !== 'deleted'))
            .map((button: any,index:number) => {
              if (company?.id_empresa_sis && button?.tipo === 'table') {
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
              } else if (!company?.id_empresa_sis && button?.tipo === 'header' && button?.nombre === 'create') {
                return (
                  <ActionButton
                    key={`table-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={ () => {
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

export default ModalCompany;