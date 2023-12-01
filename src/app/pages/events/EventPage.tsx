import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { type Contact, type Event } from '../../../models'
import { PageWithTable } from '../layouts'
import { Grid, Typography, Button, Avatar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState, getActivities, getEventContact } from '../../../redux';
import { deepOrange } from '@mui/material/colors';
import { k } from '../../../helpers';
import { type AlertObject } from '../../../components/types';
import { UserProfileImage } from '../../../components';

const EventPage = () => {
  const { activities } = useSelector((state: RootState) => state.activities)
  const { userContacts } = useSelector((state: RootState) => state.contacts)
  const { eventContacts } = useSelector((state: RootState) => state.event)
  const [errorMessage, setErrorMessage] = useState<null | AlertObject>(null)
  const [completeEventContacts, setCompleteEventContacts] = useState<null | Contact[]>(null)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!location?.state) {
      navigate('/')
      return
    }
    void dispatch(getActivities(location.state.event_id ?? ''))
    void dispatch(getEventContact({ event_id: location.state.event_id ?? '' }))
  }, [])

  useEffect(() => {
    const eventContactsIds = eventContacts.map(contact => contact.contact_id)
    const currentEventContacts = userContacts.filter(contact => eventContactsIds.includes(contact.relationId))
    // console.log({ cont: eventContactsIds, usercon: userContacts, user: currentEventContacts })
    // console.log({ data: currentEventContacts })
    setCompleteEventContacts(currentEventContacts)
  }, [eventContacts])

  const event: Event = location.state ?? {}
  const title = event?.description ?? 'title'

  const handleButtonClick = (route: string) => {
    navigate(route, {
      state: event
    })
  }

  return (
    <PageWithTable entities={activities} props={{ title, notFoundMessage: 'Activities not created', eyeRoute: '/activity-info' }} >
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
        <Grid container sx={{ justifyContent: 'center', marginBottom: '50px' }} spacing={3} >
          <Grid item>
            <Button
              variant='contained'
              onClick={() => {
                if (activities?.length > 0) {
                  setErrorMessage({
                    alertType: 'error',
                    message: 'The event has activities, so it cannot be modified'
                  })
                } else {
                  handleButtonClick('/modify-event');
                }
              }}
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
        <Typography
          variant="h6"
          fontWeight='bold'
          align="center"
          sx={{ justifyContent: 'end' }}
        >
          CONTACTS:
        </Typography>
        <Grid container style={{ maxHeight: '215px', overflow: 'scroll' }} gap={0.5} >
          {completeEventContacts
            ? completeEventContacts.map((contact) => (
              <Grid item key={contact.contactId} style={{ borderStyle: 'solid', borderWidth: '1px', width: '100%', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '5px' }}>
                <UserProfileImage userImage={contact.contactProfileImage} />
                <Typography component="h1" variant="h5" sx={{ marginInline: 3 }}> { contact.contactNickname } </Typography>
              </Grid>
            ))
            : (
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  No contacts registered
                </Typography>
              )
          }
        </Grid>
        <Typography variant="h4" align="center" sx={{ marginTop: 3 }}>
            Activities
        </Typography>
      </Grid>
      {errorMessage && (
        <Alert severity={errorMessage.alertType}>
          {errorMessage.message}
        </Alert>
      )}
    </PageWithTable>
  )
}

export default EventPage
