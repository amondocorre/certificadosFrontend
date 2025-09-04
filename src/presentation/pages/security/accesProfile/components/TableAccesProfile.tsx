import {useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, MRT_DensityState, useMaterialReactTable } from 'material-react-table';
import { Box,Divider,IconButton, Typography} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { AccesUser } from '../../../../../domain/models/AccesModel';

import { palette } from '../../../../utils/palette';
import { adjustHslLuminosity, hexToHsl } from '../../../../utils/colorTransformer';
const TableAccesProfile = (Props: any) => {
  const { listAccesProfile, handleOpenModalAccesProfile } = Props;
  const firstMenuAcces: AccesUser|null = listAccesProfile?listAccesProfile[0]??null:null;
  const [density, setDensity] = useState<MRT_DensityState>('compact');
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () =>[
      {
      accessorKey: 'nombre' ,
      header: 'Nombre',
      },{
      accessorKey: 'tipo' ,
      header: 'Tipo',
      },{
      accessorKey: 'icono' ,
      header: 'Icono',
        Cell: ({row}) => {
          const IconComponent = (MUIcons as any)[row.original.icono as string];
          return IconComponent ? <IconComponent /> : null;
        },
      },{
        accessorKey: 'acceso' ,
        header: 'Acceso',
        Cell: ({row}) => {
          return row.original.acceso==='1'?'Activo':'Inactivo'
        },
      },
    ],
    [firstMenuAcces], 
  ); 
  const table = useMaterialReactTable({
    columns,
    data: listAccesProfile,
    enableRowSelection: false,
    localization: MRT_Localization_ES,
    enableExpandAll: true,
    enableExpanding: true,
    filterFromLeafRows: true, 
    initialState: {
      density:density,
      columnOrder: [
        'mrt-row-expand',
        ...columns.map((col: any) => col.accessorKey || col.id),
      ],
      // expanded: true,
    },
    state:{ density },
    onDensityChange:(density)=>{setDensity(density);},
    getSubRows: (row: any) => (row.tipo==='menu' ? row.subMenu : null),
    muiTableHeadCellProps:({column}) => {
      return {
        sx: {
          width: column.id === 'mrt-row-expand' ? '5px' : column.id === 'mrt-row-actions' ? '20px' : 'auto', 
          minWidth: column.id === 'mrt-row-expand' ? '5px' : column.id === 'mrt-row-actions' ? '20px' : 'auto', 
          padding: column.id === 'mrt-row-expand' || column.id === 'mrt-row-actions' ? '0px' : 'auto', 
          '&:first-of-type': {
            '.Mui-TableHeadCell-Content-Labels':{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              width:'100%',
            },
            '.MuiButtonBase-root':{
              width:'100%',
              borderRadius: '10px',
              margin:0,
              padding:0 
            }
          }
        },
      };
    },
    muiTableBodyCellProps: ({ column,row}) => {
      const isMenu = row.original.tipo === 'menu';
            const rowBackgroundColor = isMenu
              ? adjustHslLuminosity(hexToHsl(palette.secondary.dark), Number(row?.original?.nivel) * 20)
              : row.index % 2 === 0 ? '#f9f9f9' : '#ffffff';
      return {
        children:column.id==='nombre'?
         (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              //paddingLeft: `${row.depth * 10}px`, // Indentación
            }}
          >
            {row.depth>0 &&
                Array.from({ length: row.depth }).map((_, i) => {
                const lineColor = adjustHslLuminosity(hexToHsl(palette.secondary.dark), i* 20); // Color del padre de esta línea (i.e. el color de la profundidad `i`)
                const tam = row.depth-1===i?2:22;
                return (
                  <Divider orientation="vertical" sx={{marginRight: `${(1) * tam}px`,backgroundColor:lineColor,width: '4px',height:density === 'compact'?'45px':density==='comfortable'?'60px':'75px'}} flexItem />
                );
              })}
          {row.depth>0&&
              <Box
              sx={{
                width: '20px',
                minWidth: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={row.getToggleExpandedHandler()}
                disableRipple
                disabled={!row.getCanExpand()}
                sx={{
                  padding: 0,
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform: row.getIsExpanded() ? 'rotate(90deg)' : 'rotate(0deg)',
                  opacity: row.getCanExpand() ? 1 : 0.3,
                  cursor: row.getCanExpand() ? 'pointer' : 'default',
                  fontSize:'26px'
                }}
              >
                <MUIcons.ChevronRight />
              </IconButton>
            </Box>
            }
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              paddingLeft:'8px',
              height:density === 'compact'?'45px':density==='comfortable'?'60px':'75px',
              background: row.original.tipo !== 'menu'? row.index % 2 === 0? '#f9f9f9': '#ffffff': adjustHslLuminosity(hexToHsl(palette.secondary.dark), row.original.nivel * 20),
            }}
          >
            {
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.original.nombre}
            </Typography>}
          </div>
          </div>
        ):undefined,
        sx: {
          marginInline:0,
          paddingInline:0,
          padding:0,// column.id ==='mrt-row-expand'?0:undefined,
          fontSize: column.id === 'acceso' ? '16px' : 'auto',
          color: column.id === 'acceso' ? (row.original.acceso === '1' ? 'green' : 'red') : 'inherit',
          width: column.id === 'mrt-row-expand' ? '5px' : 'auto',
          backgroundColor: column.id !== 'mrt-row-expand' && column.id !== 'nombre' ? rowBackgroundColor : 'transparent',
          minWidth: column.id === 'mrt-row-expand' ? '5px' : 'auto',
          '.MuiButtonBase-root': { width: '100%', borderRadius: '10px' },
        },
      };
    },
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Cell: ({ row, table }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
          {row.depth ==0&&<div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height:density === 'compact'?'45px':density==='comfortable'?'60px':'75px',
            }}
          >
            <Box
              sx={{
                width: '10%',
                minWidth: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={row.getToggleExpandedHandler()}
                disableRipple
                disabled={!row.getCanExpand()}
                sx={{
                  padding: 0,
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform: row.getIsExpanded() ? 'rotate(90deg)' : 'rotate(0deg)',
                  opacity: row.getCanExpand() ? 1 : 0.3,
                  cursor: row.getCanExpand() ? 'pointer' : 'default',
                  fontSize:'26px'
                }}
              >
                <MUIcons.ChevronRight />
              </IconButton>
            </Box>
          </div>}
        </div>
        ),
      },
      
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event:any) => {
        if (!event.target.closest('.MuiButtonBase-root')) {
          handleOpenModalAccesProfile(row.original);
        }
      },
      sx: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    }),
  });
  return (
    <Box>
      {listAccesProfile!.length > 0 && (
          <MaterialReactTable table={table} />
      )}
    </Box>
  );
};

export default TableAccesProfile;