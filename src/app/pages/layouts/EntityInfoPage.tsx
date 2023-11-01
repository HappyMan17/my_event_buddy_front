import { type ReactNode } from 'react'
import { Grid, Box, Typography } from '@mui/material'

interface LayoutProps {
  title: string
}
interface PageProps {
  children: ReactNode
  props: LayoutProps
}

const EntityInfoPage: React.FC<PageProps> = ({ children, props }) => {
  const { title } = props

  return (
    <Grid container sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: { xs: '100%', sm: window.screen.height - 220 },
      margin: 0
    }}>
      <Box
        component="form"
        sx={{
          flexGrow: 1,
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

        <Typography variant="h4" fontWeight='bold' align="center" sx={{ borderBottom: 3 }}>
          {title}
        </Typography>
        <Box component='main' sx={{ marginBlock: 3, flexGrow: 1, width: '100%' }}>
          { children }
        </Box>
      </Box>
    </Grid>
  )
}

export default EntityInfoPage
