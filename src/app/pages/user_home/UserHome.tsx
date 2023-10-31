import { useEffect } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import { type AppDispatch, getUserById, getEvents } from '../../../redux'
import { useDispatch } from 'react-redux'
import { CustomDataGrid } from '../../../components'

const entities = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

const UserHome = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
    void dispatch(getEvents())
  }, [])

  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor: 'red',
      // borderStyle: 'solid',
      height: { xs: '100%', sm: window.screen.height - 220 },
      margin: 0
    }}>
      <Box
        component="form"
        sx={{
          // flexGrow: 1,
          mt: 1,
          bgcolor: 'white',
          margin: { sm: 3, sx: 0 },
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
          // minWidth: {'200px'},
          // width: '90%'
          // borderStyle: 'solid'
        }}
        onSubmit={() => null}
      >

        {/* <Typography component="h1" variant="h5">{title}</Typography> */}
        <Typography variant="h4" fontWeight='bold' align="center">
          User patient home
        </Typography>

        {/* body */}
        <CustomDataGrid entities={ entities } />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Grid>
  )
}

export default UserHome
