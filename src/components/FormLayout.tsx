import React, { type BaseSyntheticEvent, type ReactNode } from 'react'
import { Box, Grid, Button, Typography } from '@mui/material';

interface LayoutFormProps {
  title: string
  buttonText: string
  handleSubmit: (submit: BaseSyntheticEvent<any>) => Promise<void>
}

interface AuthLayoutFormProps {
  children: ReactNode
  props: LayoutFormProps
}

export const FormLayout: React.FC<AuthLayoutFormProps> = ({ children, props }) => {
  const { title, buttonText, handleSubmit } = props
  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor: 'red',
      margin: 0
    }}>
      <Box
        component="form"
        sx={{
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
        }}
        onSubmit={handleSubmit}
      >

        <Typography component="h1" variant="h4">{title}</Typography>

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
