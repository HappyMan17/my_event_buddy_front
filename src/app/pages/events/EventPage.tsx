import { useLocation, useNavigate } from 'react-router';
import { type Event } from '../../../models'
import { PageWithTable } from '../layouts'
import { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';

const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.log('called')
    if (!location.state) {
      navigate('/')
    }
  }, [location])

  const event: Event = location.state
  const title = event?.description ?? 'title'

  return (
    <PageWithTable entities={[]} props={{ title, notFoundMessage: 'Activities not created' }} >
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
            <Button variant='contained'> Complete Event </Button>
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
