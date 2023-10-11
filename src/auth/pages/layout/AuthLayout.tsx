import React, { type ReactNode } from 'react'
import { Box, Grid, ThemeProvider, createTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

const defaultTheme = createTheme();

interface LayoutProps {
  title: string
  minHeight: string
  isHome?: boolean
}
interface AuthLayoutProps {
  children: ReactNode
  props: LayoutProps
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, props }) => {
  const { title, minHeight, isHome = false } = props
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ display: 'flex', direction: isHome ? 'column' : 'row', margin: '0' }} >
        <Grid container sx={{
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: isHome ? 'flex-start' : 'center',
          width: '100%',
          height: '100vh'
        }}>
          <Grid item xs={12} sm={8} sx={{
            bgcolor: isHome ? 'transparent' : 'white',
            height: { sm: minHeight, xs: '100vh' },
            maxWidth: { xs: '500px', sm: '600px' },
            minWidth: isHome ? '100%' : '600px',
            borderRadius: isHome ? 0 : { sm: 8, xs: 0 }
          }}>
            <Box sx={{
              my: isHome ? 1.5 : 8,
              mx: 4,
              display: 'flex',
              flexDirection: isHome ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: isHome ? 'space-between' : 'center'
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
