import React, { type ReactNode } from 'react'
import { Box, Grid, ThemeProvider, createTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

const defaultTheme = createTheme();

interface LayoutProps {
  title: string
  minHeight: string
}
interface AuthLayoutProps {
  children: ReactNode
  props: LayoutProps
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, props }) => {
  const { title, minHeight } = props
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ display: 'flex', direction: 'row', margin: '0' }} >
        <Grid container sx={{
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <Grid item xs={12} sm={8} sx={{
            bgcolor: 'white',
            height: { sm: minHeight, xs: '100vh' },
            maxWidth: { xs: '500px', sm: '600px' },
            minWidth: '600px',
            borderRadius: { sm: 8, xs: 0 }
          }}>
            <Box sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography component="h1" variant="h5">{title}</Typography>
              {children}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
