import { type GridColDef } from '@mui/x-data-grid'

interface GridTableInfo {
  columns: GridColDef[]
  rows: Array<Record<string, any>>
}

const notShownHeaders = ['user_id', 'logo', 'event_id']

export const buildDataGridTableInfo = (entityList: Array<Record<string, any>>): GridTableInfo => {
  const objectKeys = Object.keys(entityList[0])
  let counter = 0
  const columns: GridColDef[] = [{
    field: 'id',
    headerName: 'id',
    width: 150,
    editable: true,
    align: 'center',
    headerAlign: 'center'
  }]

  for (const header of objectKeys) {
    if (notShownHeaders.includes(header)) {
      continue
    }
    columns.push({
      field: header,
      headerName: header,
      width: 150,
      editable: true,
      align: 'center',
      headerAlign: 'center'
    })
  }
  let rows = entityList.slice()
  // eslint-disable-next-line array-callback-return
  rows = rows.map(entity => {
    const id = counter
    counter++
    return { ...entity, id }
  })

  return {
    columns,
    rows
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
