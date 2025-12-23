import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const TableReport = (Props: any) => {
  const { listReports, handleOpenModalReport } = Props;
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'N°:',
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'ap_paterno',
        header: 'Apellido paterno',
      },
      {
        accessorKey: 'ap_materno',
        header: 'Apellido materno',
      },
      {
        accessorKey: 'nombre', 
        header: 'Nombre',
      },
      {
        accessorKey: 'ci',
        header: 'N° CI',
      },
      
      {
        accessorKey: 'categoria_postula',
        header: 'Categoria a la que postula',
      },
      {
        accessorKey: 'file',
        header: 'Foto',
        Cell: ({ cell }) => (
          <img
            src={String(cell.getValue())}
            alt="Foto"
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ),
      },
      {
        accessorKey: 'tramite',
        header: 'Tramite que realiza',
      },
      {
        accessorKey: 'resultado_evaluacion',
        header: 'Apto/No apto',
      },
      {
        accessorKey: 'sucursal',
        header: 'Gabinete',
      },
      {
        accessorKey: 'motivo_resultado',
        header: 'Descripcion de impedimento en caso de que no sea apto',
      },
    ],
    [] 
  );

  const table = useMaterialReactTable({
    columns,
    data: listReports??[],
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    enableColumnOrdering:false,
    muiTableHeadCellProps: () => ({
    sx: {
    },
  }),
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          //handleOpenModalReport(row.original);
        },
        sx: {
          cursor: 'pointer',
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

export default TableReport;