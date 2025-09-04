import { useEffect, useMemo, useState } from 'react';
import {MaterialReactTable,useMaterialReactTable,type MRT_ColumnDef,type MRT_PaginationState,} from 'material-react-table'
import { Rent } from '../../../../domain/models/DashboardModel';
import { Box} from '@mui/material';
import dayjs from 'dayjs';
import { formatDate, formatDateDMY } from '../../../utils/dateUtils';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { StyledTitle } from '../../../components/text/StyledTitle';
const colors:string[] = ['#8cf892ff','#f5f77fff','#e67364ff']
const TableRent = (Props: any) => {
  const { handleOpenModal,listRent,id_sucursal,tipo} = Props;
  const fechaActual = String(formatDate(String(dayjs())));
  const [data, setData] = useState<Rent[]>([]);
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
      const json =await listRent(pagination.pageSize,pagination.pageIndex+1);
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
  const columns = useMemo<MRT_ColumnDef<Rent>[]>(
    () => [
      { accessorKey: 'id_alquiler_documento', header: 'N°',size:10},
      { accessorKey: 'cliente', header: 'Cliente',size:100},
      { accessorKey: tipo==='1'?'fecha_entrega':'fecha_devolucion', header: tipo==='1'?'Fecha Entrega':'Fecha Devolución',size:20,
        Cell: ({ row }) => (
          <Box>
            {String(formatDateDMY(tipo==='1'?row?.original.fecha_entrega:row?.original.fecha_devolucion))}
          </Box>
        ),},
      { accessorKey: 'total_pagar', header: 'Total',size:20},
      { accessorKey: 'a_cuenta', header: 'A Cuenta',size:20},
      { accessorKey: 'saldo', header: 'Saldo',size:20,
        Cell: ({ row }) => (
          <Box>
            {(Number(row?.original.total_pagar)-Number(row?.original.a_cuenta)).toFixed(2)}
          </Box>
        ),},
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
        <StyledTitle sx={{fontSize: '25px',}}>{tipo==='1'?'Contratos a Entregar':'Contratos en Proceso'}</StyledTitle>
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
      if(tipo ==='2' && String(row.original?.fecha_devolucion)){
        const fechaInicio: Date = new Date(String(row.original?.fecha_devolucion));
        const fechaFin: Date = new Date(fechaActual);
        const diferenciaMs: number = (fechaFin.getTime() - fechaInicio.getTime());
        const diferenciaDias: number = diferenciaMs / (1000 * 60 * 60 * 24);
        if(diferenciaDias>0)bgColor=colors[2]
        if(diferenciaDias<=0 && diferenciaDias>=-7)bgColor=colors[1]
      }
      return {
        onClick: () => {
          handleOpenModal(Number(row.original.id_alquiler_documento));
        },
        sx: {
          backgroundColor:tipo ==='2'?bgColor:undefined,
          cursor: 'pointer',
        },
      };
    },
  });
  return <MaterialReactTable table={table} />;
};

export default TableRent;
