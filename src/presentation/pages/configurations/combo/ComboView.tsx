import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { comboContainer } from '../../../../di/configurations/comboContainer';
import { Combo } from '../../../../domain/models/ComboModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import TableCombo from './components/TableCombo';
import ModalCombo from './components/ModalCombo';
import { Product } from '../../../../domain/models/ProductModel';
import { productContainer } from '../../../../di/configurations/productContainer';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const ComboView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const ComboViewModel = comboContainer.resolve('comboViewModel');
  const ProductViewModel = productContainer.resolve('productViewModel');
  const [loading, setLoading] = useState(false)
  const [listCombos , setListCombos] = useState<Combo[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [openModalCombo, setOpenModalCombo] = useState(false)
  const [selectCombo, setSelectCombo] = useState<Combo|null>(null)
  const handleOpenModalCombo = useCallback((Combo:Combo|null)=>{
    setOpenModalCombo(true);
    setSelectCombo(Combo);
  },[])
  const handleCloseModalCombo = ()=>{
    setSelectCombo(null);
    setOpenModalCombo(false)}
  useEffect(()=>{
    getCombo();
    getProduct();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalCombo(null)
  },[])
  const handleCreateSave = useCallback(async(Combo:Combo)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo Combo?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ComboViewModel.create(Combo);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCombo();
        getCombo();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(Combo:Combo,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ComboViewModel.update(id,Combo);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCombo()
        getCombo()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleDelete = useCallback(async(id:string)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el Combo?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ComboViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCombo()
        getCombo()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleActivate = useCallback(async(id:string)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el Combo?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ComboViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCombo()
        getCombo()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDelete: handleDelete,
    handleActivate:handleActivate
  };
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        var btnHeader:any = [];
        setButtons(response!.buttons);
        response!.buttons.forEach((button:any) => {
          const IconComponent = MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label;
          const newButton = {
            title: button.descripcion,
            tooltip: button.tooltip,
            icon: <IconComponent />,
            onClick:  () => {
              if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                actionHandlers[button.onclick](); 
              } else if (typeof button.onclick === 'function') {
                button.onclick();
              }
            }
          }
          if(button!.tipo ==='header'){
            btnHeader.push(newButton);
          }
        });
        setButtonsHeader(btnHeader);
      } else {

      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getCombo = async () => {
    setLoading(true)
    try {
      const response = await ComboViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListCombos(response.data);
      } else {
        setListCombos([]);
      }
    } catch (error) {}
    setLoading(false)
  };
  const getProduct = async () => {
    setLoading(true)
    try {
      const response = await ProductViewModel.findActive();
      if ('status' in response && response.status === 'success') {
        setListProducts(response.data);
      } else {
        setListProducts([]);
      }
    } catch (error) {}
    setLoading(false)
  };
  return (
    <div>
      <HeaderPage>
      <Grid
        size={{
          xs: 6.5,
          sm: 7,
          md: 8
        }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="end"
          alignItems="end"
          alignSelf={'center'}
          size={{
            xs: 5.5,
            sm: 5,
            md: 4
          }}>
          {buttonsHeader.map((button:any) => (
            <Tooltip key={button.title} title={button.tooltip}>
              <IconButton color="secondary" onClick={button.onClick} sx={{ ml: 1 }}>
                {button.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Grid>
      </HeaderPage>
      <div>
        {<TableCombo
          listCombos={listCombos}
          handleOpenModalCombo={handleOpenModalCombo}
        />}
      </div>{
        <ModalCombo
        open={openModalCombo}
        onClose={handleCloseModalCombo}
        createCombo={handleCreateSave}
        updateCombo={handleUpdate}
        deleteCombo={handleDelete}
        activateCombo={handleActivate}
        combo={selectCombo}
        buttons={buttons}
        listProducts={listProducts}
        ></ModalCombo>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ComboView;