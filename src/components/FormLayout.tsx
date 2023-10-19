import React, { type ReactNode } from 'react'
import { Box, Grid, Button, Typography } from '@mui/material';

interface LayoutFormProps {
  title: string
  buttonText: string
}

interface AuthLayoutFormProps {
  children: ReactNode
  props: LayoutFormProps
}

export const FormLayout: React.FC<AuthLayoutFormProps> = ({ children, props }) => {
  const { title, buttonText } = props
  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0
    }}>
      <Box component="form" sx={{
        mt: 1,
        bgcolor: 'white',
        margin: { sm: 3, sx: 0 },
        borderRadius: 4,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '200px',
        width: { sm: '600px', sx: '100%' }
      }}>

        <Typography component="h1" variant="h5">{title}</Typography>

        {children}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonText}
        </Button>
      </Box>
    </Grid>
  );
};
