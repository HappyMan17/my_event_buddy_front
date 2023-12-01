import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { resetEventContact, resetEvents, setEvent, setEventContact, setEventError, setIsLoading } from './eventSlice'
import { getEventsByUserId, createEvent, updateEventLogo, updateEvent as updateEventApi, addEventContactApi, getEventContactsById } from '../../../api/service'
import { eventMapper } from '../../../mappers'
import { type EventTypeRequest, type Event, type EventContact, type EventId } from '../../../models'

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

export const getEventContact = (object: EventId) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await getEventContactsById(object)

    if (!data) {
      dispatch(resetEventContact())
      return
    }
    dispatch(resetEventContact())
    // eslint-disable-next-line array-callback-return
    void data.event.map((eventContact: EventContact) => {
      dispatch(setEventContact(eventContact))
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
    if (image) {
      data.logo = image.logo
    }

    dispatch(setEvent(eventMapper(data.event)))
    dispatch(setEventError({ message: 'Event created.', alertType: 'success' }))
  }
}

export const updateEvent = (updatedEvent: Event) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading());

    try {
      const updatedEventData = await updateEventApi(updatedEvent);

      if (!updatedEventData) {
        dispatch(setEventError({ message: 'Event update failed. Please try again.', alertType: 'error' }));
        return;
      }

      const mappedUpdatedEvent = eventMapper(updatedEventData);
      dispatch(setEvent(mappedUpdatedEvent));
      dispatch(setEventError({ message: 'Event updated successfully.', alertType: 'success' }));
    } catch (error) {
      console.error('Error updating event:', error);
      dispatch(setEventError({ message: 'An error occurred while updating the event.', alertType: 'error' }));
    }
  }
}

export const addEventContact = (eventContact: EventTypeRequest) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading());

    try {
      const createdEventContact = await addEventContactApi(eventContact);

      if (!createdEventContact) {
        dispatch(setEventError({ message: 'Add contact event failed. Please try again.', alertType: 'error' }));
        return;
      }

      dispatch(setEventContact(createdEventContact));
      dispatch(setEventError({ message: 'Event updated successfully.', alertType: 'success' }));
    } catch (error) {
      console.error('Error updating event:', error);
      dispatch(setEventError({ message: 'An error occurred while updating the event.', alertType: 'error' }));
    }
  }
}
