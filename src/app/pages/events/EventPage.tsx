import { useLocation, useNavigate } from 'react-router';
import { type Event } from '../../../models'
import { PageWithTable } from '../layouts'
import { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';

const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate('/')
    }
  }, [location])

  const event: Event = location.state
  const title = event?.description ?? 'title'

  const handleButtonClick = (route: string) => {
    console.log({ route })
    navigate(route, {
      state: event
    })
  }

  return (
    <PageWithTable entities={[]} props={{ title, notFoundMessage: 'Activities not created', eyeRoute: 'entity-info' }} >
      <Grid item sx={{ marginBlock: 3, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h6"
          fontWeight='bold'
          align="center"
          sx={{ justifyContent: 'end' }}
        >
          DESCRIPTION:
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: 5 }}>
          { event.description }
        </Typography>
        <Grid container sx={{ justifyContent: 'center' }} spacing={3} >
          <Grid item>
            <Button variant='contained'> Edit Event </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='success'
              onClick={() => { handleButtonClick('/add-activity'); }}
            >
              Create Activity
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error"> Complete Event </Button>
          </Grid>
        </Grid>
        <Typography variant="h4" align="center" sx={{ marginTop: 5 }}>
            Activities
        </Typography>
      </Grid>
    </PageWithTable>
  )
}

export default EventPage
