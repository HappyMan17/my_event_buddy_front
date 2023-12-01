import { useEffect, useState } from 'react'
import { Button, Grid, Typography, Alert } from '@mui/material'
import { PageWithTable } from '../layouts'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { type Activity, type Contact } from '../../../models'
import { type AlertObject } from '../../../components/types'
import { type AppDispatch, type RootState, getActivities, getActivityContact } from '../../../redux';
import { UserProfileImage } from '../../../components';

// import { type AlertObject } from '../../../components/types'

const ActivityPage = () => {
  // const { activities } = useSelector((state: RootState) => state.activities)
  const { userContacts } = useSelector((state: RootState) => state.contacts)
  const { activityContacts } = useSelector((state: RootState) => state.activities)
  const [activity, setActivity] = useState<null | Activity>(null)
  const [errorMessage, setErrorMessage] = useState<null | AlertObject>(null)
  const [completeActivityContacts, setCompleteActivityContacts] = useState<null | Contact[]>(null)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.log({ location })
    if (!location?.state) {
      navigate('/')
    }
    void dispatch(getActivities(location.state.activitiy_id ?? ''))
    void dispatch(getActivityContact({ activitiy_id: location.state.activitiy_id ?? '' }))
    setActivity(location.state)
  }, [])

  useEffect(() => {
    const activityContactsIds = activityContacts.map(contact => contact.contact_id)
    const currentActivityContacts = userContacts.filter(contact => activityContactsIds.includes(contact.relationId))
    // console.log({ cont: eventContactsIds, usercon: userContacts, user: currentEventContacts })
    // console.log({ data: currentEventContacts })
    setCompleteActivityContacts(currentActivityContacts)
  }, [activityContacts])

  const handleButtonClick = (route: string) => {
    navigate(route, {
      state: activity
    })
  }

  return (
    <PageWithTable entities={[]} props={{ title: '', notFoundMessage: 'Activities not created', eyeRoute: '/contact-info' }} >
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
        { activity?.description ?? '' }
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
      { activity?.total_activity_value ?? '' }
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
      { activity?.is_by_percentage ? 'Es por porcentajes iguales.' : 'Se asignan montos a mano.' }
      </Typography>

      <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => { handleButtonClick('/modify-activity'); }}
          >
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
      <Grid container style={{ maxHeight: '215px', overflow: 'scroll' }} gap={0.5} >
          {completeActivityContacts
            ? completeActivityContacts.map((contact) => (
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
    </Grid>
    {errorMessage && (
        <Alert severity={errorMessage.alertType}>
          {errorMessage.message}
        </Alert>
    )}
    </PageWithTable>
  )
}

export default ActivityPage
