import {useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Status } from '../../../../../domain/models/StatusModel';

const TableStatus = (Props: any) => {
  const { listStatus, handleOpenModalStatus } = Props;
  
  const firstStatus: Status|null = listStatus[0]??null;
  const columns = useMemo(
    () =>
      firstStatus
        ? Object.keys(firstStatus)
            .map(key => ({
              accessorKey: key as keyof Status,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstStatus], 
  );

  const table = useMaterialReactTable({
    columns,
    data: listStatus,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({}) => [
    ],
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        children: column.id === 'estado'? row.original.estado === '1'? 'Activo': 'Eliminado': undefined,
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          color: column.id === 'estado' ? row.original.estado === '1' ? 'green' : 'red' : 'inherit',
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          handleOpenModalStatus(row.original);
        },
        sx: {
          cursor: 'pointer',
          backgroundColor:row.original.estado == 0?'#f7d9d4': (row.index % 2 === 0 ? '#f9f9f9' : '#ffffff'),
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
      {listStatus!.length > 0 && (
        <ThemeProvider theme={customTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </Box>
  );
};

export default TableStatus;