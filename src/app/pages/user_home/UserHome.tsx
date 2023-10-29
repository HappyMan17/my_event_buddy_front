import { useEffect } from 'react'
import { type AppDispatch, getUserById, getEvents } from '../../../redux'
import { useDispatch } from 'react-redux'

const UserHome = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
    void dispatch(getEvents())
  }, [])

  return (
    <div>newUserHome</div>
  )
}

export default UserHome
