import { Button, Grid, Typography } from '@mui/material'
import { PageWithTable } from '../layouts'

const ActivityPage = () => {
  return (
    <PageWithTable entities={[]} props={{ title, notFoundMessage: 'Activities not created', eyeRoute: 'event-info' }} >
      <Grid item sx={{
        marginBlock: 3,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ justifyContent: 'end' }}
      >
        DESCRIPTION:
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 5 }}>
        {/* { activities description } */}
      </Typography>

      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ justifyContent: 'end' }}
      >
        VALUE:
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 5 }}>
        {/* { valor description } */}
      </Typography>

      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ justifyContent: 'end' }}
      >
        PERCENTAGE:
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 5 }}>
        {/* { percentage description } */}
      </Typography>

      <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
        <Grid item>
          <Button variant="contained"> 
            Edit activity 
          </Button>
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Button variant="contained" color="error">
            Complete activity
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" align="center" sx={{ marginTop: 5 }}>
        Contactos
      </Typography>
    </Grid>
    </PageWithTable>
  )
}

export default ActivityPage
