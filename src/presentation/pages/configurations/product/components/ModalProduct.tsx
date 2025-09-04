import React, { useCallback, useEffect,} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import { Product } from '../../../../../domain/models/ProductModel';
import CustomImageUpload from '../../../../components/inputs/CustomImageUpload';
import CustomSelect from '../../../../components/inputs/CustomSelect';
import SwitchSimple from '../../../../components/inputs/SwitchSimple';

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  precio_hora: yup
      .number()
      .typeError('Debe ser un número')
      .required('Obligatorio')
      .positive('Debe ser mayor que 0')
      .test('max-decimals','Solo se permiten hasta 2 decimales',value => value === undefined || /^\d+(\.\d{1,2})?$/.test(String(value))),
    precio_dia: yup
      .number()
      .typeError('Debe ser un número')
      .required('Obligatorio')
      .positive('Debe ser mayor que 0')
      .test('max-decimals','Solo se permiten hasta 2 decimales',value => value === undefined || /^\d+(\.\d{1,2})?$/.test(String(value))),
    precio_30dias: yup
      .number()
      .typeError('Debe ser un número')
      .required('Obligatorio')
      .positive('Debe ser mayor que 0')
      .test('max-decimals','Solo se permiten hasta 2 decimales',value => value === undefined || /^\d+(\.\d{1,2})?$/.test(String(value))),
    precio_reposicion: yup
      .number()
      .typeError('Debe ser un número')
      .required('Obligatorio')
      .positive('Debe ser mayor que 0')
      .test('max-decimals','Solo se permiten hasta 2 decimales',value => value === undefined || /^\d+(\.\d{1,2})?$/.test(String(value))),
       uso_dias: yup
          .string()
          .required('El uso dias es obligatorio')
          .min(3, 'Debe seleciconar un tipo de uso_dias'),
});
const dataOptions = [{ value: 'todos', label: 'Todos' },{ value: 'laborales', label: 'Laborales' }];
interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  createProduct: (data: Product) => void;
  updateProduct: (data: Product,id:number) => void;
  deleteProduct: (id: string) => void;
  activateProduct: (id: string) => void;
  product?: Product | null;
  buttons:Button[];
}
const ModalProduct: React.FC<ProductFormProps> = ({ open, onClose, createProduct,updateProduct,deleteProduct,activateProduct,buttons,product}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Product>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre:      '',
      descripcion: '',
      precio_hora:  0,
      precio_dia:   0,
      precio_30dias:0,
      precio_reposicion:0,
      uso_dias:'todos',
      visible:'si'
    }
  });
  useEffect(() => {
    reset();
    if (product) {
      Object.keys(product).forEach((key:any) => {
        setValue(key, (product[key as keyof Product] ?? null));
      });
    }else{
      setValue('visible','si');
    }
  }, [product, setValue,open]);
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Product) => {
        createProduct(data)
      })();
  }, [product]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Product) =>{  
      updateProduct(data,Number(product?.id_producto))
    })();
  }, [product]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_producto'));
    await deleteProduct(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_producto'));
    await activateProduct(id)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate:handleActivate
  };
   const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
          setValue('visible','si');
      } else {
          setValue('visible','no');
      }
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
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Producto'}
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
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nombre" 
                  control={control} 
                  label="Nombre" 
                  placeholder="Ingrese el nombre" 
                  disabled={!(stateUpdate || !product)}
                  icon={<MUIcons.Sell />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="descripcion" 
                  control={control} 
                  label="Descripción (opcional)" 
                  placeholder="ingrese una descripción" 
                  disabled={!(stateUpdate || !product)}
                  icon={<MUIcons.Description />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  control={control} 
                  name="precio_hora" 
                  label="Precio Hora" 
                  type='number'
                  disabled={!(stateUpdate || !product)}
                  placeholder="Ingrese un precio" 
                  icon={<MUIcons.MonetizationOn />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  control={control} 
                  name="precio_dia" 
                  label="Precio por dia" 
                  type='number'
                  disabled={!(stateUpdate || !product)}
                  placeholder="Ingrese un precio" 
                  icon={<MUIcons.MonetizationOn />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  control={control} 
                  name="precio_30dias" 
                  label="Precio por30 dias" 
                  type='number'
                  disabled={!(stateUpdate || !product)}
                  placeholder="Ingrese un precio" 
                  icon={<MUIcons.MonetizationOn />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  control={control} 
                  name="precio_reposicion" 
                  label="Precio de reposición" 
                  type='number'
                  disabled={!(stateUpdate || !product)}
                  placeholder="Ingrese un precio" 
                  icon={<MUIcons.MonetizationOn />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomSelect
                  control={control} 
                  name="uso_dias" 
                  label="Uso Días" 
                  options={dataOptions} 
                  disabled={false}
                  placeholder="Selecciona un tipo USO" 
                  icon={<MUIcons.FormatOverline/>}
                />
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <SwitchSimple
                  id={'visible'}
                  label={'Visible'}
                  icon={<MUIcons.ViewAgenda/>}
                  defaultChecked={product?.visible==='si'?true:false}
                  onChange={handleSwitchChange}
                />
              </Grid>
              <Grid
                size={{
                  xs: 6,
                  sm: 6
                }}>
                  <CustomImageUpload
                    defaultValue={product?.fotografia?product?.fotografia:''}
                    name="foto"
                    control={control}
                    disabled={!(stateUpdate || !product)}
                    label="Subir foto"
                  />
                </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (product?.estado === 'activo' && button.nombre !== 'activate') || 
                                                (product?.estado === 'inactivo' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (product?.estado !== 'activo' && product?.estado !== 'inactivo'))
            .map((button: any,index:number) => {
              if (product?.id_producto && button?.tipo === 'table') {
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
              } else if (!product?.id_producto && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalProduct;