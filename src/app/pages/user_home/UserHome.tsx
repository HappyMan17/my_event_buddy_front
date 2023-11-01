import { useEffect } from 'react'
import { type AppDispatch, getUserById, getEvents, type RootState } from '../../../redux'
import { useDispatch, useSelector } from 'react-redux'
import PageWithTable from '../layouts/PageWithTable'

const UserHome = () => {
  const { events } = useSelector((state: RootState) => state.event)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
    void dispatch(getEvents())
  }, [])

  return (
    <PageWithTable entities={events} props={{ title: 'Events table', notFoundMessage: 'No Events Created Yet', eyeRoute: 'entity-info' }} >
    </PageWithTable>
  )
}

export default UserHome
