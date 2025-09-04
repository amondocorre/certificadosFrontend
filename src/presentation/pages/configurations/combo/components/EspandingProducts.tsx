import { Box, Collapse, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, memo, useRef } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import { palette } from '../../../../utils/palette';
import * as MUIcons from '@mui/icons-material';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { AlertError } from '../../../../components/alerts';
import { ComboProduct } from '../../../../../domain/models/ComboModel';
const cellStyled ={
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  borderLeft: "1px solid white",
  padding: '0px', margin: '0px',
  wordBreak: 'normal',
  paddingLeft: '0px',
  paddingRight: '0px',
  height:'31px'
}
const cellHeaderStyle ={
  background:'#757575',
  borderLeft: "1px solid white",
  wordBreak: 'normal',
  padding: "0px",
  width: '20%',
  minWidth: '100px', 
}
const textStyle={
  marginLeft: '6px', 
  color: 'white', 
  fontSize:'12px', 
  fontFamily:'Times New Roman' 
}

const EspandingProducts = (props: any) => {
  const { combo,listProducts,setValue} = props;
  const [openOne, setOpenOne] = useState(true);
  const [trigger, setTrigger] = useState(false)
  const [products, setProducts] = useState<ComboProduct[]|[]>([])
  const hasMounted = useRef(false);
  const handleClick = () => {
    setOpenOne(!openOne);
  };
  useEffect(() => {
    if(combo?.productos){
      setProducts(combo?.productos);   
      setValue('productos',combo?.productos);
      hasMounted.current=false
    }
  }, [combo])

  useEffect(() => {
    if (hasMounted.current) {
      setValue('productos', products);
    } else {
      hasMounted.current = true;
    }
  }, [trigger]);

  const cambiarProducto =(producto:ComboProduct,idProducto:any)=>{
    const productoSelect = listProducts.filter((item: any) => item.id_producto === idProducto);
    producto.id_producto = productoSelect[0]?.id_producto;
    producto.nombre = productoSelect[0]?.nombre;
    producto.cantidad = 0;
    producto.fotografia = productoSelect[0]?.fotografia;
    setTrigger(!trigger);
  }

  const agregarProducto = () => {
    if(products?.filter((item: any) => !item.id_producto).length>0){
      AlertError({ title: '', message: 'Tienes un producto con datos incompletos.'})
      return
    }
    const listAux = listProducts.filter((item: any) => !(products!.some((item2: any) => item.id_producto == item2.id_producto)));
    if(listAux.length>0){
      const producto: ComboProduct = {
                      id_producto: '',
                      nombre:'',
                      cantidad: 0,
                      fotografia: '',
                    };
      setProducts([...products,producto]);
    }else{
      AlertError({ title: '', message: 'El combo ya cuenta con todos los productos del registro.'})
      return
    }
    setTrigger(!trigger);
  }
  const quitarProducto = (producto:any,index:number)=>{
    setProducts(products?.filter((item:any) => (item.id_producto !== producto.id_producto))); 
  }
  const SelectFieldproducto = memo(({idProducto,isDisabled,data }: any) => {
    const listAux = products?.filter((item: any) => item.id_producto !== idProducto );
    const list = data? listProducts.filter((item: any) => (!listAux.some((item2: any) => item.id_producto == item2.id_producto))): listProducts;    
    return (
      <TextField
        id="outlined-select-gender"
        select
        sx={{ width: '100%' }}
        size='small'
        variant="outlined"
        defaultValue={idProducto}
        InputProps={{style: {height: "30px",},inputProps: { min: 0 }}}
        inputProps={{style: {margin: '0.4px', padding: '2px'},}}
        title={""}
        disabled={isDisabled}
        onChange={(event: any) => {
          cambiarProducto(data,event.target.value);
        }}
      >
        {list?.map((option: any) => (
          <MenuItem key={option?.id_producto} value={option?.id_producto}>
            {option?.nombre}
          </MenuItem>
        ))}
      </TextField>
    );
  });
  const cambiarValorInput =(producto:any,value:any,atribute:any,name:any)=>{
    /*const productoSelect = listProducts.filter((item: any) => item.id_producto === producto.id_producto);
    if(productoSelect.length>0){
      productoSelect[0].cantidad=value
    }*/
    producto[atribute]=(Number(value));
    setValue('productos',products);
    setTimeout(() => {
      const inputElement = document.getElementById(name);
      if (inputElement) inputElement.focus(); 
    }, 0);
  }
  const InputTextFiel = memo(({valueDefault,name,atribute,isDisabled,data,handleChange}: any) => {
      return (
        <TextField 
          id={name}
          name={name}
          sx={{}}
          size="small"
          type="number"
          defaultValue={valueDefault}
          variant="outlined"
          disabled={isDisabled}
          InputProps={{ style: {height: "30px",},
          //inputProps: { min: 1, max: 100 }
          }}
          onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
          title={""}
          onChange={(event: any) => {
            let value = Number(event.target.value);
            if (value < 1) value = 0;
            handleChange(data, value, atribute, name);
            event.target.value = value.toString(); 
          }}
        />
      )
    })
 return (
  <Box sx={{ width: "100%" }}>
    <Box
      sx={{
        backgroundColor: palette.secondary.dark,
        display: "flex",
        flexDirection: "row",
        justifyContent: "normal",
        borderRadius: 1,
        mt: "1%",
        alignItems: "center",
        width: "100%", 
      }}
    >
      <Box sx={{width:'99.8%',display: 'flex',flexDirection: 'row',alignItems: 'center',cursor: "pointer",}} onClick={handleClick}>
        <Box sx={{width:'95%',display: 'flex',flexDirection: 'row',alignItems: 'center',borderLeft: '1px solid white',}}>
          <MUIcons.Category/>
          <StyledTitle id="client-description" sx={{}}>
            {'Productos'}
          </StyledTitle>
        </Box>
        <Box sx={{width:'5%',display: 'flex',flexDirection: 'row',alignItems: 'center',}}>
          {openOne ? (
            <RemoveIcon sx={{ backgroundColor: "#DC3545", color: "white",width:'100%', pr: "0px" }} />
          ) : (
            <AddIcon sx={{ backgroundColor: "#DC3545", color: "white",width:'100%', pr: "-100px" }} />
          )}
        </Box>
      </Box>
    </Box>
    <Collapse in={openOne} timeout="auto" unmountOnExit>
      <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',width:'99%',marginLeft:'1%'}}>
        <TableContainer
          onClick={() => {}}
          component={Paper}
          sx={{margin: '0px', padding: '0px', marginTop: '5px'}}>
          <Table sx={{ tableLayout: "auto" }}>
            <TableHead> 
              <TableRow sx={{"& th": {fontSize: "12px",}}}>
                <TableCell sx={{...cellHeaderStyle,width:'5%',minWidth:'6px',maxWidth:'10px',position:"sticky",}}align="center">
                  <MUIcons.Add sx={{color:'white',background:'#1976d2',marginTop:1,width: '30px',cursor:'pointer'}} onClick={agregarProducto}/>
                </TableCell>
                <TableCell sx={{...cellHeaderStyle,backgroundColor:'#E12129',position:"sticky",}}align="left">
                  <Typography  sx={{ ...textStyle}} >
                      {'Nombre'}
                    </Typography>  
                </TableCell>
                <TableCell sx={{...cellHeaderStyle}} align="center">
                    <Typography  sx={{ ...textStyle}} >
                      {'Cantidad'}
                    </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {products?.map((row: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell key={index} sx={{...cellStyled,background:'white',paddingLeft: "5px", minWidth: '40px',  position: "sticky",}}align="center">
                        <MUIcons.DoDisturbOn sx={{color:'white',background:'#1976d2',marginTop:1,width: '30px',cursor:'pointer'}} onClick={()=>{quitarProducto(row,index)}}/>
                      </TableCell>
                      <TableCell sx={{...cellStyled ,background:'white', minWidth: '50px',  position: "sticky",}}align="center">
                        <SelectFieldproducto
                            valueDefault={row.nombre}
                            idProducto={row.id_producto}
                            isDisabled={false}
                            data={row}
                          />
                      </TableCell>
                      <TableCell sx={{...cellStyled ,background:'white',}}align="center">
                        {
                          <InputTextFiel
                          name={'cantidad_'+row.id_producto}
                          valueDefault = {row?.cantidad}
                          atribute={'cantidad'}
                          data={row}
                          isDisabled={false}
                          handleChange = {cambiarValorInput}
                        />
                        /*<CustomTextField
                          control={control} 
                          name={'cantidad_'+row.id_producto} 
                          label="" 
                          type='number'
                          disabled={false}
                          placeholder="Ingrese un valor"  
                        />*/
                        }
                      </TableCell>
                    </TableRow>  
                  )})}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
    </Collapse>
  </Box>
);
}

export default EspandingProducts