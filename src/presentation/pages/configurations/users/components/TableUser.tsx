import React, { useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, ThemeProvider, Typography } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { User } from '../../../../../domain/models/User';

const UserTable = (Props: any) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { usersList, handleOpenModalUser } = Props;
  const [open, setOpen] = useState(false);

  const handleOpenModal = (row: any) => {
    setSelectedUser(row.original);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const firstUser: User = usersList[0];

  const columns = useMemo(
    () =>
      firstUser
        ? Object.keys(firstUser)
            .filter(key => {return key !== 'foto' && key !=='id_perfil';})
            .map(key => ({
              accessorKey: key as keyof User,
              header: key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            }))
        : [],
    [firstUser], 
  );

  const table = useMaterialReactTable({
    columns,
    data: usersList,
    enableRowSelection: false,
    enableRowActions: false,
    localization: MRT_Localization_ES,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => handleOpenModal(row)}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => console.info('Delete')}>
        Delete
      </MenuItem>,
    ],
    muiTableBodyCellProps: ({ column,row}) => {
      return {
        sx: {
          fontSize:column.id === 'estado'?'16px':'auto',
          color: column.id === 'estado' ? row.original.estado === 'Activo' ? 'green' : 'red' : 'inherit',
        },
      };
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        handleOpenModalUser(row.original);
      },
      sx: {
        cursor: 'pointer',
        backgroundColor: row.index % 2 === 0 ? '#f9f9f9' : '#ffffff',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    }),
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
      {usersList!.length > 0 && (
        <ThemeProvider theme={customTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </Box>
  );
};

export default UserTable;