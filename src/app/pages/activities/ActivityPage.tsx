import { useEffect, useState } from 'react'
import { Button, Grid, Typography, Alert } from '@mui/material'
import { PageWithTable } from '../layouts'
import { useLocation, useNavigate } from 'react-router'
import { type Activity } from '../../../models'
import { type AlertObject } from '../../../components/types'
// import { type AlertObject } from '../../../components/types'

const ActivityPage = () => {
  const [activity, setActivity] = useState<null | Activity>(null)
  const [errorMessage, setErrorMessage] = useState<null | AlertObject>(null)
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.log({ location })
    if (!location?.state) {
      navigate('/')
    }
    setActivity(location.state)
  }, [])

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
