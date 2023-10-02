import { Typography } from '@mui/material'

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
