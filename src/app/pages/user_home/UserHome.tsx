import { useEffect } from 'react'
import { type AppDispatch, getUserById } from '../../../redux'
import { useDispatch } from 'react-redux'

const UserHome = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
  }, [])

  return (
    <div>newUserHome</div>
  )
}

export default UserHome
