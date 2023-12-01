import { useEffect } from 'react'
import { type AppDispatch, getUserById, getEvents, type RootState } from '../../../redux'
import { useDispatch, useSelector } from 'react-redux'
import PageWithTable from '../layouts/PageWithTable'
import { useTranslation } from 'react-i18next';

const UserHome = () => {
  const { events } = useSelector((state: RootState) => state.event)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    void dispatch(getUserById())
    void dispatch(getEvents())
  }, [])

  const { t } = useTranslation();

  return (
    <PageWithTable entities={events} props={{ title: (t('table_events_title')), notFoundMessage: (t('table_no_events_message')), eyeRoute: 'event-info' }} >
    </PageWithTable>
  )
}

export default UserHome
