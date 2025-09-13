import { useEffect, useMemo, useState } from 'react';
import {MaterialReactTable,useMaterialReactTable,type MRT_ColumnDef,type MRT_PaginationState,} from 'material-react-table'
import { Box} from '@mui/material';
import { formatDateDMY } from '../../../utils/dateUtils';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { EvaluantionPsychological } from '../../../../domain/models/DashboardModel';
const colors:string[] = ['#8cf892ff','#f5f77fff','#e67364ff']
const TablePsychological = (Props: any) => {
  const { handleOpen,listEvaPsychological,id_sucursal} = Props;
  const [data, setData] = useState<EvaluantionPsychological[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }
    try {
      const json =await listEvaPsychological(pagination.pageSize,pagination.pageIndex+1);
      setData(json.data);
      setRowCount(json.pagination.total);
    } catch (error) {
      setIsError(true);
      setData([]);
      setRowCount(0);
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };
  useEffect(() => {
    if(Number(id_sucursal)>=0){
      fetchData();
    }
  }, [id_sucursal,pagination.pageIndex,pagination.pageSize,]);
  const columns = useMemo<MRT_ColumnDef<EvaluantionPsychological>[]>(
    () => [
      { accessorKey: 'id_evaluacion_psicologica', header: 'N°',size:10},
      { accessorKey: 'nombre_completo', header: 'Nombre Completo',size:100},
      { accessorKey: 'fecha_evaluacion',header:'Fecha Evaluacion', size:20,
        Cell: ({ row }) => (
          <Box>
            {String(formatDateDMY(row?.original.fecha_evaluacion))}
          </Box>
        ),},
      { accessorKey: 'ci', header: 'Ci',size:20},
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    //enableRowSelection: true,
    localization: MRT_Localization_ES,
    initialState: { density:'compact' },
    manualPagination: true,
    enableColumnFilters: false,
    enableFilters:false,
    enableSorting:false,
    enableHiding:false,
    enableColumnActions: false,
    rowCount,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      isFullScreen:isFullScreen,
    },
    onIsFullScreenChange:(screen)=>{setIsFullScreen(screen);},
    onPaginationChange: setPagination,
    muiToolbarAlertBannerProps: isError ? {color: 'error',children: 'Error loading data',}: undefined,
    muiTopToolbarProps: {
      sx: {
        background:'#e75a5aff',
        minHeight: '35px', 
        color:'#fff',
        '& .MuiBox-root': {
            padding: '0px 0px', 
            margin:0,
            minWidth: 'auto',   
        },
      },
    },
    muiTableHeadProps:()=>({
      sx:{
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}),
    muiTableHeadCellProps:() =>({
     sx: {
        padding: '0px 4px !important',
        margin: '0px 0px !important',
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#e4eaecff',
        borderRight:'1px solid #cec7c7ff'
      }}),
    muiTableBodyCellProps:()=>{ 
      return({
        sx: {
          //fontSize: '12px',
          padding: '2px 12px',
          borderRight:'1px solid #cec7c7ff'
        },
      })},
     muiBottomToolbarProps: {
        sx: {
          minHeight: '40px', 
          '& .MuiBox-root': {
          top:-5,
          padding: '0px 0px', 
          minWidth: 'auto',   
        },
      }
    },
    muiPaginationProps:{ 
      rowsPerPageOptions: isFullScreen ? [5,10, 20, 50,100] : [5, 10, 20],
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{width:'100%'}}>
        <StyledTitle sx={{fontSize: '25px',}}>{'Evaluaciones Psicologicas'}</StyledTitle>
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        marginTop:0,
        height: {xs:isFullScreen?'90%':'50vh',sm:isFullScreen?'90%':'50vh',md:isFullScreen?'100%':'50vh'},
      },
    },
    muiTableBodyRowProps: ({ row }) => {
      let bgColor = colors[0];
      if(row.original.id_estado_evaluacion == 1)bgColor=colors[1]
      //if(row.original.id_estado_evaluacion == 1)bgColor=colors[1]
      return {
        onClick: () => {
          handleOpen(Number(row.original.id_evaluacion_psicologica));
        },
        sx: {
          backgroundColor:bgColor,
          cursor: 'pointer',
        },
      };
    },
  });
  return <MaterialReactTable table={table} />;
};

export default TablePsychological;
