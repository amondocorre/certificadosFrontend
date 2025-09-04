import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Sucursal } from '../../../../../domain/models/SucursalModel';

const TableSucursal = (Props: any) => {
  const { listSucursales, handleOpenModalSucursal } = Props;
  
  const firstSucursal: Sucursal|null = listSucursales[0]??null;
  const columns = useMemo(
    () =>
      firstSucursal
        ? Object.keys(firstSucursal)
            //.filter(key => {return key !== 'fotografia' && key !== 'id_usuario_crea' && key !== 'id_usuario_modifica';})
            .map(key => ({
              accessorKey: key as keyof Sucursal,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstSucursal], 
  );

  const table = useMaterialReactTable({
    columns,
    data: listSucursales,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({}) => [
    ],
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        children: column.id === 'estado'? row.original.estado === '1'? 'Activo': 'Inactivo': undefined,
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          color: column.id === 'estado' ? row.original.estado === '1' ? 'green' : 'red' : 'inherit',
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          handleOpenModalSucursal(row.original);
        },
        sx: {
          cursor: 'pointer',
          backgroundColor:row.original.estado == 'inactivo'?'#f7d9d4': (row.index % 2 === 0 ? '#f9f9f9' : '#ffffff'),
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
        main: '#1976d2', 
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

export default TableSucursal;