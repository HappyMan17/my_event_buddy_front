import React, { type ReactNode } from 'react'
import { Box, Grid, ThemeProvider, createTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

const defaultTheme = createTheme();

interface LayoutProps {
  title: string
}
interface AuthLayoutProps {
  children: ReactNode
  props: LayoutProps
}

export const HomeLayout: React.FC<AuthLayoutProps> = ({ children, props }) => {
  const { title } = props
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ display: 'flex', direction: 'column', margin: '0' }} >
        <Grid container sx={{
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100vh'
        }}>
          <Grid item xs={12} sm={8} sx={{
            height: { sm: '60px', xs: '100vh' },
            maxWidth: { xs: '500px', sm: '600px' },
            minWidth: '100%'
          }}>
            <Box sx={{
              my: 1.5,
              mx: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Typography component="h1" variant="h5">{title}</Typography>
              {children}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} sx={{
            bgcolor: 'grey',
            height: { sm: '100%', xs: '100vh' },
            maxWidth: { xs: '100%', sm: '100%' },
            minWidth: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Box sx={{
              my: 1.5,
              mx: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
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
