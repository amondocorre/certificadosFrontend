import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
const TableSucursalUser = (Props: any) => {
  const { listSucursalUser, handleOpenModalSucursalUser } = Props;
  
 
 const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'n', 
        header: 'N°:',
        Cell: ({ row }) => (
          <Box>
            {row.index+1}
          </Box>
        ),
      },
      {
        accessorKey: 'nombre', 
        header: 'Nombre completo',
      },
      {
        accessorKey: 'perfil_nombre',
        header: 'Perfil',
      },
      {
        accessorKey: 'sucursales',
        header: 'Sucursales',
        Cell: ({ row }) => (
          row.original?.nombreSucursales?.map((sucursal:string,index:number)=>(
          <Box key={index}>
            {index + 1}: <strong>{sucursal}</strong> 
          </Box>
          ))
        ),
      },
    ],
    [] 
  );

  const table = useMaterialReactTable({
    columns,
    data: listSucursalUser,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({}) => [
    ],
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        //children: column.id === 'estado'? row.original.estado === '1'? 'Activo': 'Eliminado': undefined,
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          color: column.id === 'estado' ? row.original.estado === 'activo' ? 'green' : 'red' : 'inherit',
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          handleOpenModalSucursalUser(row.original);
        },
        sx: {
          cursor: 'pointer',
          //backgroundColor:row.original.estado == 'inactivo'?'#f7d9d4': (row.index % 2 === 0 ? '#f9f9f9' : '#ffffff'),
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
      };
    },
  });

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1a3e72', 
      },
      secondary: {
        main: '#dc004e', 
      },
    },
  });

  return (
    <Box>
      <ThemeProvider theme={customTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </Box>
  );
};

export default TableSucursalUser;