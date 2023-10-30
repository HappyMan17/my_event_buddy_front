import { useEffect } from 'react'
import { type AppDispatch, getUserById, getEvents } from '../../../redux'
import { useDispatch } from 'react-redux'
import { Card, CardContent, Box, Divider, Avatar } from '@mui/material'
import avatarImage from '../../../assets/images/logoUser.png'


const UserHome = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
    void dispatch(getEvents())
  }, [])

  return (
    <Card borderRadius="12" minWidth="256" textAlign="center">
      <CardContent>
        <Avatar width="60" height="60" margin="auto" src={avatarImage} />
        Lorem Ipsum
        Colombia
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} height="50%">
          Eventos
          6941
        </Box>
        <Box p={2} flex={'auto'} height="50%">
          Contactos
          12
        </Box>
      </Box>
    </Card>
  )
}

export default UserHome
