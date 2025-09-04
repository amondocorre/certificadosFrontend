import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Client } from '../../../../domain/models/ClientModel';

const TableClient = (Props: any) => {
  const { listClient, handleOpenModalClient } = Props;
   
  const firstClient: Client|null = listClient[0]??null;
  const columns = useMemo(
    () =>
      firstClient
        ? Object.keys(firstClient)
            .filter(key => {return key !== 'empresas' && key !== 'foto_ciA' && key !== 'foto_ciB' && key !=='status_color' && key !=='id_status';})
            .map(key => ({
              accessorKey: key as keyof Client,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstClient], 
  );

  const table = useMaterialReactTable({
    columns,
    data: listClient,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({  }) => [
    ],
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          handleOpenModalClient(row.original);
        },
        sx: {
          cursor: 'pointer',
          backgroundColor:row.original.status_color ?row.original.status_color:'#ffffff',
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
      { 
        <ThemeProvider theme={customTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      }
    </Box>
  );
};

export default TableClient;