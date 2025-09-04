import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Product } from '../../../../../domain/models/ProductModel';

const TableProduct = (Props: any) => {
  const { listProducts, handleOpenModalProduct } = Props;
  
  const firstProduct: Product|null = listProducts[0]??null;

  const columnNames: Record<string, string> = {
  id_producto: 'ID',
  nombre: 'Nombre',
  descripcion: 'Descripción',
  precio_hora: 'Precio x Hora',
  precio_dia: 'Precio x Día',
  precio_30dias: 'Precio x 30 Días',
  precio_reposicion: 'Precio de reposición',
  Estado: 'Estado',
  fecha_creacion: 'Fecha Registro',
  uso_dias: 'uso de dias',
};

  const columns = useMemo(
    () =>
      firstProduct
        ? Object.keys(firstProduct)
            .filter(key => {return key !== 'fotografia' && key !== 'id_usuario_crea' && key !== 'id_usuario_modifica';})
            .map(key => ({
              accessorKey: key as keyof Product,
              header: columnNames[key] || key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstProduct], 
  );

  const table = useMaterialReactTable({
    columns,
    data: listProducts,
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
          handleOpenModalProduct(row.original);
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

export default TableProduct;