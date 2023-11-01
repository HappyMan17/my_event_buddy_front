import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { buildDataGridTableInfo } from '../../helpers';
import { Stack } from '@mui/system';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router';

interface CustomDataGridProps {
  entities: any[]
  customColumns?: GridColDef[]
  hasEye?: boolean
}

const getEyeColumn = (handleClick: (param: any) => void): GridColDef[] => [
  {
    field: 'actions',
    headerName: 'ver',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return (
        <Stack direction="row" display='1' spacing={5}>
          <IconButton aria-label="delete" size="small" onClick={() => { handleClick(params.row); }}>
            <RemoveRedEyeIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )
    }
  }
]

const CustomDataGrid: React.FC<CustomDataGridProps> = ({ entities, customColumns, hasEye = false }) => {
  const { columns, rows } = buildDataGridTableInfo(entities)
  const navigate = useNavigate()

  const handleButtonClickWatch = (params: any) => {
    console.log({ params })
    navigate('entity-info', {
      state: params
    })
  }

  let gridColumns = columns

  if (customColumns) {
    gridColumns = columns.concat(customColumns)
  }

  if (hasEye) {
    gridColumns = gridColumns.concat(getEyeColumn(handleButtonClickWatch))
  }

  return (
    <Box sx={{ paddingTop: 3 }}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          width: { xs: '350px', sm: 'auto' }
        }}
        // checkboxSelection
      />
    </Box>
  );
}

export default CustomDataGrid
