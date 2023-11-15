import { useLocation, useNavigate } from 'react-router';
import { type Event } from '../../../models'
import { PageWithTable } from '../layouts'
import { useEffect } from 'react';
import { Grid, Typography, Button, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState, getActivities } from '../../../redux';
import { deepOrange } from '@mui/material/colors';
import { k } from '../../../helpers';

const EventPage = () => {
  const { activities } = useSelector((state: RootState) => state.activities)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!location?.state) {
      navigate('/')
      return
    }
    void dispatch(getActivities(location.state.event_id ?? ''))
  }, [])

  const event: Event = location.state ?? {}
  const title = event?.description ?? 'title'

  const handleButtonClick = (route: string) => {
    navigate(route, {
      state: event
    })
  }

  return (
    <PageWithTable entities={activities} props={{ title, notFoundMessage: 'Activities not created', eyeRoute: 'event-info' }} >
      <Grid item sx={{ marginBlock: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant='contained'
          onClick={() => null}
          sx={{ width: '80px', height: '80px', borderRadius: 10, backgroundColor: 'transparent', margin: 3 }}
        >
          {event.logo && event.logo !== ''
            ? (
                <Avatar
                  sx={{ width: '85px', height: '85px', justifyContent: 'center' }}
                  alt="Remy Sharp" src={`${k.api.BASE_URL}${k.api.EVENT_LOGO}${event.logo}`}
                />
              )
            : (
                <Avatar sx={{ bgcolor: deepOrange[500], padding: 5 }}>{ 'I' }</Avatar>
              )
        }
        </Button>
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
            <Button
              variant='contained'
              onClick={() => { handleButtonClick('/modify-event'); }}
            >
              Edit Event
            </Button>
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
