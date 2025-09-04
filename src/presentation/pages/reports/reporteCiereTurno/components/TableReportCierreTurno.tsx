import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { formatDateDMY, formatTime12H } from '../../../../utils/dateUtils';
import * as MUIcons from '@mui/icons-material';
import DetalleCierreTurno from './DetalleCierreTurno';
const TableReportCierreTurno = (Props: any) => {
  const { listReports, handleOpenModalReport,imprimimirCierreTurno } = Props;
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'sucursal', 
        header: 'Sucursal',
      },{
        accessorKey: 'usuario', 
        header: 'Usuario',
      },
      {
        accessorKey: 'fecha_apertura',
        header: 'Fecha/Hora Inicial',
        Cell: ({ row }) => (
          <Box >
            {String(formatDateDMY(row?.original.fecha_apertura))+'  '+String(formatTime12H(row?.original.fecha_apertura))}
          </Box>
        ),
      },
      {
        accessorKey: 'fecha_cierre',
        header: 'Fecha/Hora Salida',
        Cell: ({ row }) => (
          <Box >
            {row?.original.fecha_cierre?String(formatDateDMY(row?.original.fecha_cierre))+'  '+String(formatTime12H(row?.original.fecha_cierre)):''}
          </Box>
        ),
      },
      {
        accessorKey: 'montoInicial',
        header: 'Monto Inicial',
      },
      {
        accessorKey: 'ingresos',
        header: 'Total Ingresos',
      },
      {
        accessorKey: 'egresos',
        header: 'Total Egresos',
      },
      {
        accessorKey: 'transferencia',
        header: 'Total Tranferencia',
      },
      {
        accessorKey: 'otros',
        header: 'Total otro',
      },
      {
        accessorKey: 'saldoTeorico',
        header: 'Saldo Teorico',
      },
      
      {
        accessorKey: 'saldoReal',
        header: 'Total Entregado',
      },
      {
        accessorKey: 'descuadre',
        header: 'Descuadre',
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
    muiExpandButtonProps: {
    //children: <MUIcons.KeyboardArrowRight />, // Cambiar icono de expansión
  },
    renderDetailPanel: ({ row }) => {
    const report =row.original;
    return(<Box sx={{ padding: 0,margin:0, backgroundColor: '#f5f5f5', borderRadius: 2,display: 'flex',flexDirection: 'column',alignItems: 'start' }}>
     <DetalleCierreTurno report={report} imprimimirCierreTurno={imprimimirCierreTurno}/>
    </Box>)
    },
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {
          //handleOpenModalReport(row.original);
        },
        /*sx: {
          cursor: 'pointer',
          backgroundColor:row.original.estado == 0?'#f7d9d4': (row.index % 2 === 0 ? '#f9f9f9' : '#ffffff'),
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },*/
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

export default TableReportCierreTurno;