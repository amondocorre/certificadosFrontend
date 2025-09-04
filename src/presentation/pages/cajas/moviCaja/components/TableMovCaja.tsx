import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box} from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

import { formatDateDMY, formatTime12H } from '../../../../utils/dateUtils';
import { Rent } from '../../../../../domain/models/RentModel';

const TableMovCaja = (Props: any) => {
  const { listMovCaja, printMovimientoCaja } = Props;
  const columns = useMemo<MRT_ColumnDef<Rent>[]>(
    () => [
      {
        accessorKey: 'sucursal', 
        header: 'Sucursal',
      },{
        accessorKey: 'tipo', 
        header: 'Tipo movimiento',
      },
      {
        accessorKey: 'monto',
        header: 'Monto(Bs)',
      },
      {
        accessorKey: 'fecha_movimiento,', 
        header: 'Fecha Movimiento',
        Cell: ({ row }) => (
          <Box >
            {String(formatDateDMY(row?.original.fecha_movimiento))}
          </Box>
        ),
      },
      
      {
        accessorKey: 'hora_movimiento,',
        header: 'Hora Movimiento',
        Cell: ({ row }) => (
          <Box >
            {String(formatTime12H(row?.original.fecha_movimiento))}
          </Box>
        ),
      },
      {
        id: 'descripcion',
        accessorKey: 'descripcion',
        header: 'Descripcion',
      },
      
      {
        id: 'usuario',
        accessorKey: 'usuario',
        header: 'Usuario',
      },
    ],
    [] 
  );
  const table = useMaterialReactTable({
    columns,
    data: listMovCaja,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({ }) => [],
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: () => {printMovimientoCaja(row.original.id_movimientos_caja);},
        sx: {cursor: 'pointer','&:hover': {backgroundColor: '#f0f0f0'}}
      };
    },
  });
  return (
    <Box>  
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TableMovCaja;