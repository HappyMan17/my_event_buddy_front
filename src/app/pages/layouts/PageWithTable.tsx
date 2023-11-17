import { type ReactNode } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { CustomDataGrid } from '../../../components'

interface LayoutProps {
  title: string
  notFoundMessage: string
  eyeRoute?: string
}
interface PageProps {
  children: ReactNode
  entities: any
  props: LayoutProps
}

const PageWithTable: React.FC<PageProps> = ({ children, entities, props }) => {
  const { title, notFoundMessage, eyeRoute } = props

  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 'auto',
      overflow: 'hidden',
      margin: 0
    }}>
      <Box
        component="form"
        sx={{
          // flexGrow: 1,
          mt: 1,
          bgcolor: 'white',
          margin: { sm: 3, sx: 0 },
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onSubmit={() => null}
      >

        <Typography variant="h4" fontWeight='bold' align="center">
          {title}
        </Typography>

        { children }

        {/* body */}
        {(entities && entities.length > 0)
          ? (
              <CustomDataGrid entities={ entities } hasEye={true} eyeRoute={eyeRoute} />
            )
          : (
              <Typography
                variant="h5"
                fontWeight='bold'
                align="center"
                sx={{ margin: 5 }}
              >
                { notFoundMessage }
              </Typography>
            )
        }
      </Box>
    </Grid>
  )
}

export default PageWithTable
