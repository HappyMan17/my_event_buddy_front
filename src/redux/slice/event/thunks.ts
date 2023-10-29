import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { setEvent, setIsLoading } from './eventSlice'
import { getEventsByUserId } from '../../../api/service'
import { eventMapper } from '../../../mappers'

export const getEvents = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await getEventsByUserId()

    if (!data) {
      return
    }

    dispatch(setEvent(eventMapper(data)))
  }
}
