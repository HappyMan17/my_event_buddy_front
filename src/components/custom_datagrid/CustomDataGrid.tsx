import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { buildDataGridTableInfo } from '../../helpers';

interface CustomDataGridProps {
  entities: any[]
  customColumns?: GridColDef[]
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({ entities, customColumns }) => {
  const { columns, rows } = buildDataGridTableInfo(entities)

  if (customColumns) {
    columns.concat(customColumns)
  }

  return (
    <Box sx={{ paddingTop: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
