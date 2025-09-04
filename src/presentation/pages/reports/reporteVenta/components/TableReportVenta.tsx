import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { formatDateDMY, formatTime12H } from '../../../../utils/dateUtils';

const TableReportVenta = (Props: any) => {
  const { listReports, handleOpenModalReport } = Props;
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'numero', 
        header: 'N°:',
      },
      {
        accessorKey: 'nombre_completo', 
        header: 'Cliente',
      },
      {
        accessorKey: 'fecha_compra',
        header: 'Fecha compra',
        Cell: ({ row }) => (
          <Box >
            {String(formatDateDMY(row?.original.fecha_compra))+'  '+String(formatTime12H(row?.original.fecha_compra))}
          </Box>
        ),
      },
      {
        accessorKey: 'precio_servicio',
        header: 'Precio Servicios(Bs)',
      },
      {
        accessorKey: 'descuento',
        header: 'Total descuento(Bs)',
      },
      
      {
        accessorKey: 'monto_pagado',
        header: 'Ponto Pagado(Bs)',
      },
      {
        accessorKey: 'saldo_pagar',
        header: 'Deuda pendiente(Bs)',
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
          handleOpenModalReport(row.original);
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
      <ThemeProvider theme={customTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </Box>
  );
};

export default TableReportVenta;