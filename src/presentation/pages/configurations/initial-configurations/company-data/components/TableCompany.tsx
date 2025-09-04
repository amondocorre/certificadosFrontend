import React, { useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box,createTheme, ThemeProvider } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Company } from '../../../../../../domain/models/CompanyModel';

const TableCompany = (Props: any) => {
  const { listCompanys, handleOpenModalCompany } = Props;
  const firstCompany: Company|null = listCompanys[0]??null;
  const columns = useMemo(
    () =>
      firstCompany
        ? Object.keys(firstCompany)
            .filter(key => {return key !== 'id_empresa_sis' && key !== 'created_at' && key !== 'updated_at' && key !== 'pie_documento' && key !=='url_logo_impresion' && key!=='url_logo_empresa';})
            .map(key => ({
              accessorKey: key as keyof Company,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstCompany], 
  );

  const table = useMaterialReactTable({
    columns,
    data: listCompanys,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({ row }) => [
    ],
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        //children: column.id === 'estado'? row.original.estado === '1'? 'Activo': 'Eliminado': undefined,
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          //color: column.id === 'estado' ? row.original.estado === '1' ? 'green' : 'red' : 'inherit',
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => {
      const style = {};
      return {
        onClick: (event) => {
          handleOpenModalCompany(row.original);
        },
        sx: {
          cursor: 'pointer',
          //backgroundColor:row.original.estado == 0?'#f7d9d4': (row.index % 2 === 0 ? '#f9f9f9' : '#ffffff'),
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
      {listCompanys!.length > 0 && (
        <ThemeProvider theme={customTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </Box>
  );
};

export default TableCompany;