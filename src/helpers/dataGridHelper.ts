import { type GridColDef } from '@mui/x-data-grid'

interface GridTableInfo {
  columns: GridColDef[]
  rows: Array<Record<string, any>>
}

export const buildDataGridTableInfo = (entityList: Array<Record<string, any>>): GridTableInfo => {
  const objectKeys = Object.keys(entityList[0])

  const columns: GridColDef[] = objectKeys.map(header => {
    return {
      field: header,
      headerName: header,
      width: 150,
      editable: true,
      align: 'center',
      headerAlign: 'center'
    }
  })

  return {
    columns,
    rows: entityList
  }
}

// const columns: GridColDef[] = [
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     align: 'center',
//     headerAlign: 'center'
//   }
// ];
