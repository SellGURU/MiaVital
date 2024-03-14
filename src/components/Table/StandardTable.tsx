import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { publish, subscribe } from '@/utils/event';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];


interface DataTableProps {
    applyFilters:() => Array<CityData|any>
    mode:'city'|'member'
    filterBox:Array<filterProps>
}

export default function DataTable(props:DataTableProps) {
  const [rows,setRows] = React.useState(props.applyFilters())
  const resolveWith = (par:number) => {
    return window.innerWidth * par /100 >= 80 ? window.innerWidth * par /100 : 80
  }
  const cityColums:GridColDef[] = [
    { field: 'name', headerName: 'City Name', width: resolveWith(13) },
    { field: 'membersLength', headerName: 'Number of Members', width: resolveWith(10),align:'center' },
    { field: 'heartRate', headerName: 'Heart Rate (AVG)', width: resolveWith(10),headerAlign:'center' ,align:'center'},
    { field: 'bloodPressure', headerName: 'Blood Pressure(AVG)', width:resolveWith(12),type:'string',resizable:true,headerAlign:'center',align:'center' },
    { field: 'temperature', headerName: 'Temperature(AVG)', width:resolveWith(12)  ,headerAlign:'center',align:'center'},
    { field: 'respirationRate', headerName: 'Respiration Rate(AVG)', width: resolveWith(12),headerAlign:'center',align:'center' },
    { field: 'spo2', headerName: 'SPO2(AVG)', width:resolveWith(8),align:'center',headerAlign:'center' },
  ]
  const memberColums:GridColDef[] =[
    { field: 'name', headerName: 'Member Name', width: resolveWith(11) },
    { field: 'memberId', headerName: 'Member Id', width: resolveWith(6),align:'center',headerAlign:'center' },    
    { field: 'riskLevel', headerName: 'Risk Level', width: resolveWith(6),align:'center',headerAlign:'center' },
    { field: 'heartRate', headerName: 'Heart Rate', width: resolveWith(6),align:'center',headerAlign:'center' },
    { field: 'DBPbloodPressure', headerName: 'Blood Pressure', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'temperature', headerName: 'Temperature', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'respirationRate', headerName: 'Respiration Rate', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'spo2', headerName: 'SPO2', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'bloodGlucose', headerName: 'Blood Glucose', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'HbA1c', headerName: 'HbA1c', width: resolveWith(7),align:'center',headerAlign:'center' },
    { field: 'BMI', headerName: 'BMI', width: resolveWith(6),align:'center',headerAlign:'center' }
  ]
  subscribe('mapChange',() => {
    setRows(props.applyFilters())
  })  
  React.useEffect(() => {
    publish('mapChange',{})
    setRows(props.applyFilters())
  },[props.filterBox])  
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={props.mode == 'city' ? cityColums : memberColums}
        // getCellClassName={}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        // autoHeight
        density='standard'
        style={{
          border:'none',
          justifyContent:'space-between'
        }}
        
        pageSizeOptions={[]}
        // checkboxSelection
      ></DataGrid>
    </div>
  );
}