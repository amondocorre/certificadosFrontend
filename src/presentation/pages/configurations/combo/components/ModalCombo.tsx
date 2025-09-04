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
import { Combo } from '../../../../../domain/models/ComboModel';
import EspandingProducts from './EspandingProducts';
import { Product } from '../../../../../domain/models/ProductModel';
import { AlertError } from '../../../../components/alerts';
import CustomImageUpload from '../../../../components/inputs/CustomImageUpload';
import CustomSelect from '../../../../components/inputs/CustomSelect';
import CustomSwitch from '../../../../components/inputs/CustomSwitch';
import SwitchSimple from '../../../../components/inputs/SwitchSimple';

const comboProductSchema = yup.object().shape({
  id_producto: yup.string().required('El producto es obligatorio'),
  nombre: yup.string().required('El nombre del producto es obligatorio'),
  cantidad: yup
    .number()
    .typeError('La cantidad debe ser un número')
    .required('La cantidad es obligatoria')
    .integer('La cantidad debe ser un número entero')
    .min(1, 'La cantidad debe ser al menos 1'),
});
const comboSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
  precio_hora: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .positive('Debe ser mayor que 0'),
  precio_dia: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .positive('Debe ser mayor que 0'),
  precio_30dias: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .positive('Debe ser mayor que 0'),
  uso_dias: yup
    .string()
    .required('El uso dias es obligatorio')
    .min(3, 'Debe seleciconar un tipo de uso_dias'),
  //productos: yup.array().of(comboProductSchema).min(1, 'Debe agregar al menos un producto')
});
const dataOptions = [{ value: 'todos', label: 'Todos' },{ value: 'laborales', label: 'Laborales' }];
interface ComboFormProps {
  open: boolean;
  onClose: () => void;
  createCombo: (data: Combo) => void;
  updateCombo: (data: Combo,id:number) => void;
  deleteCombo: (id: string) => void;
  activateCombo: (id: string) => void;
  combo?: Combo | null;
  buttons:Button[];
  listProducts:Product[];
}
const ModalCombo: React.FC<ComboFormProps> = ({ open, onClose, createCombo,updateCombo,deleteCombo,activateCombo,buttons,combo,listProducts}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
 
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Combo>({
    resolver: yupResolver(comboSchema),
    defaultValues: {
      nombre:      '',
      precio_hora:  0,
      precio_dia:   0,
      precio_30dias:0,
      uso_dias: 'todos',
      productos:[],
      descripcion:'',
      visible:'si',
    }
  });
   /*const { fields, append, remove } = useFieldArray({
    control,
    name: 'productos'
  });*/
  useEffect(() => {
    reset();
    if (combo) {
      Object.keys(combo).forEach((key:any) => {
        setValue(key, (combo[key as keyof Combo] ?? null));
      });
    }else{
      setValue('visible','si');
    }
  }, [combo, setValue,open]);
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Combo) => {
        data.productos= getValues('productos') 
        let messageError = '';
        if(data?.productos?.length==0){
          AlertError({ title: '', message: 'Debe agregar al menos un producto al combo.'})
          return  
        }
        data?.productos?.forEach((producto:any) => {
          if(producto.nombre==''){
            messageError = 'Uno de las productos tiene datos incompletos.';
            return
          }
          const cantidad = producto.cantidad;
          if(cantidad==undefined || isNaN(cantidad) || cantidad==0){
            messageError = 'El '+producto.nombre+' debe tener una cantiad mayor a 0.';
            return
          }
        });
        if(messageError){
          AlertError({ title: '', message: messageError})
          return
        }
        createCombo(data)
      })();
  }, [combo,setValue]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Combo) =>{  
      data.productos= getValues('productos')
      let messageError = '';
      if(data?.productos?.length==0){
        AlertError({ title: '', message: 'Debe agregar al menos un producto al combo.'})
        return  
      }
      data?.productos?.forEach((producto:any) => {
        if(producto.nombre==''){
          messageError = 'Uno de las productos tiene datos incompletos.';
          return
        }
        const cantidad = producto.cantidad;
        if(cantidad==undefined || isNaN(cantidad) || cantidad==0){
          messageError = 'El '+producto.nombre+' debe tener una cantiad mayor a 0.';
          return
        }
      });
      if(messageError){
        AlertError({ title: '', message: messageError})
        return
      }
      updateCombo(data,Number(combo?.id_producto))
    })();
  }, [combo,setValue]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_producto'));
    await deleteCombo(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_producto'));
    await activateCombo(id)
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
            {'Formulario de Combo'}
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
                  disabled={!(stateUpdate || !combo)}
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
                  disabled={!(stateUpdate || !combo)}
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
                  disabled={!(stateUpdate || !combo)}
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
                  label="Precio por día" 
                  type='number'
                  disabled={!(stateUpdate || !combo)}
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
                  label="Precio por 30 días" 
                  type='number'
                  disabled={!(stateUpdate || !combo)}
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
              <Grid size={12}>
                <EspandingProducts
                combo= {combo}
                listProducts={listProducts}
                //control={control}
                setValue={setValue}
                //append={append}
                //remove ={remove}
                >
                </EspandingProducts>
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <SwitchSimple
                  id={'visible'}
                  label={'Visible'}
                  icon={<MUIcons.ViewAgenda/>}
                  defaultChecked={combo?.visible==='si'?true:false}
                  onChange={handleSwitchChange}
                />
              </Grid>
              <Grid size={{xs: 6,sm: 6}}>
                <CustomImageUpload
                  defaultValue={combo?.fotografia?combo?.fotografia:''}
                  name="foto"
                  control={control}
                  disabled={!(stateUpdate || !combo)}
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
            {buttons.filter((button: Button) => (combo?.estado === 'activo' && button.nombre !== 'activate') || 
                                                            (combo?.estado === 'inactivo' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                            (combo?.estado !== 'activo' && combo?.estado !== 'inactivo'))
                        .map((button: any,index:number) => {
              if (combo?.id_producto && button?.tipo === 'table') {
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
              } else if (!combo?.id_producto && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalCombo;