import { useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Combo } from '../../../../../domain/models/ComboModel';
 
const TableCombo = (Props: any) => {
  const { listCombos, handleOpenModalCombo } = Props;
  
  const firstCombo: Combo|null = listCombos[0]??null;
  const columns = useMemo( 
    () =>
      firstCombo
        ? Object.keys(firstCombo)
            .filter(key => {return key !== 'productos' && key !== 'fotografia';})
            .map(key => ({
              accessorKey: key as keyof Combo,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [{
          accessorKey: 'id_combo',
              header: 'id',
        }],
    [firstCombo], 
  );
  useEffect(() => {
  }, [firstCombo])
  
  const table = useMaterialReactTable({
    columns,
    data: listCombos,
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
          handleOpenModalCombo(row.original);
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

export default TableCombo;