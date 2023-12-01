import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type EventContact, type Event } from '../../../models'
import { type AlertObject } from '../../../components/types'

interface EventState {
  events: Event[]
  eventContacts: EventContact[]
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: EventState = {
  events: [],
  eventContacts: [],
  isLoading: false,
  errorMessage: null
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true
    },
    setEventError: (state, action: PayloadAction<AlertObject>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },
    setEventContact: (state, action: PayloadAction<EventContact>) => {
      state.isLoading = false
      state.errorMessage = null
      const contacts = state.eventContacts.map(contact => contact.contact_id)
      if (!contacts.includes(action.payload.contact_id)) {
        state.eventContacts.push(action.payload)
      }
    },
    resetEventContact: (state) => {
      state.isLoading = false
      state.errorMessage = null
      state.eventContacts = []
    },
    setEvent: (state, action: PayloadAction<Event>) => {
      state.isLoading = false
      state.errorMessage = null
      const newEventData = action.payload
      state.events.push(newEventData)
    },
    resetEvents: (state) => {
      state.isLoading = false
      state.events = []
    }
  }
})

export const { setIsLoading, setEvent, setEventError, resetEvents, setEventContact, resetEventContact } = eventSlice.actions

export default eventSlice.reducer
