import {useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,IconButton} from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { MenuItem } from '../../../../../domain/models/AccesModel';

import * as MUIcons from '@mui/icons-material';
import { palette } from '../../../../utils/palette';
import { adjustHslLuminosity, hexToHsl } from '../../../../utils/colorTransformer';
const TableMenuAcces = (Props: any) => {
  const { listMenuAcces, handleOpenModalMenuAcces } = Props;
  
  const firstMenuAcces: MenuItem|null = listMenuAcces?listMenuAcces[0]??null:null;
  const columns = useMemo(
    () =>[
      {
      accessorKey: 'nombre' ,
      header: 'Nombre',
      },{
      accessorKey: 'tipo' ,
      header: 'Tipo',
      },{
        accessorKey: 'link' ,
        header: 'Link',
      },{
        accessorKey: 'icono' ,
        header: 'Icono',
      },{
        accessorKey: 'estado' ,
        header: 'Estado',
      },
    ],
    [firstMenuAcces], 
  ); 
  const table = useMaterialReactTable({
    columns,
    data: listMenuAcces,
    enableRowSelection: false,
    localization: MRT_Localization_ES,
    enableExpandAll: true, // Habilitar expandir todo
    enableExpanding: true,
    enableRowActions: true,
    initialState: {
      columnOrder: [
        'mrt-row-expand', // Columna de expandir primero
        'mrt-row-actions', // Columna de acciones segundo
        ...columns.map((col:any) => col.accessorKey || col.id), // Resto de las columnas dinámicas
      ],
    },
    getSubRows: (row: any) => (row.tipo==='menu' ? row.subMenu : null),
    renderRowActions: ({ row }) => (
    <Box>
      {row.original.tipo==='menu'&&
      <IconButton onClick={(event) => {
        event.stopPropagation(); 
        handleOpenModalMenuAcces(row.original,true)}}>
        <MUIcons.AddCircle />
      </IconButton>}
    </Box>
  ),
    muiTableHeadCellProps:({column}) => {
      return {
        sx: {
          width: column.id === 'mrt-row-expand' ? '20px' : column.id === 'mrt-row-actions' ? '20px' : 'auto', 
          minWidth: column.id === 'mrt-row-expand' ? '20px' : column.id === 'mrt-row-actions' ? '20px' : 'auto', 
          padding: column.id === 'mrt-row-expand' || column.id === 'mrt-row-actions' ? '0px' : 'auto', 
          '&:first-of-type': {
            '.Mui-TableHeadCell-Content-Labels':{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              width:'100%',
            },
            '.MuiButtonBase-root':{
              width:'100%',
              borderRadius: '10px',
              margin:0,
              padding:0 
            }
          }
        },
      };
    },
    //enableEditing:(row)=>row.original.tipo==='menu',
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        children: column.id === 'estado'? row.original.estado === '1'? 'Activo': 'Eliminado': undefined,
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          color: column.id === 'estado' ? row.original.estado === '1' ? 'green' : 'red' : 'inherit',
          width: column.id === 'mrt-row-expand' ? '20px' : column.id === 'mrt-row-actions' ? '20px' : 'auto',
          minWidth: column.id === 'mrt-row-expand' ? '20px' : column.id === 'mrt-row-actions' ? '20px' : 'auto',
          //padding: column.id === 'mrt-row-expand' || column.id === 'mrt-row-actions' ? '2px' : 'auto', 
          //'&:first-of-type': {
            '.MuiButtonBase-root':{
              width:'100%',
              //border: '2px solid red', 
              borderRadius: '10px', 
            }
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        handleOpenModalMenuAcces(row.original,false);
      },
      sx: {
        cursor: 'pointer',
        backgroundColor:
          row.original.tipo !=='menu'
            ? row.index % 2 === 0
              ? '#f9f9f9'
              : '#ffffff'
            : adjustHslLuminosity(hexToHsl(palette.secondary.dark), row.original.nivel*20),
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    }),
  });
  return (
    <Box>
      {listMenuAcces!.length > 0 && (
          <MaterialReactTable table={table} />
      )}
    </Box>
  );
};

export default TableMenuAcces;