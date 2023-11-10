import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { resetEvents, setEvent, setEventError, setIsLoading } from './eventSlice'
import { getEventsByUserId, createEvent, updateEventLogo } from '../../../api/service'
import { eventMapper } from '../../../mappers'
import { type Event } from '../../../models'

export const getEvents = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await getEventsByUserId()

    if (!data) {
      dispatch(resetEvents())
      return
    }
    dispatch(resetEvents())
    // eslint-disable-next-line array-callback-return
    void data.map((event: Event) => {
      const newEvent = eventMapper(event)
      dispatch(setEvent(newEvent))
    })
  }
}

export const createNewEvent = (newEvent: Event, file: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await createEvent(newEvent)

    if (!data) {
      dispatch(setEventError({ message: 'Event not created. Please try again.', alertType: 'error' }))
      return
    }

    const image = await updateEventLogo(data.event.event_id!, file)
    if (!image) {
      // console.log({ ms: 'image not created' })
      return
    }

    data.logo = image.logo
    dispatch(setEvent(eventMapper(data.event)))
    dispatch(setEventError({ message: 'Event created.', alertType: 'success' }))
  }
}
