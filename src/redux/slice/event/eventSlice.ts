import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Event } from '../../../models'
import { type AlertObject } from '../../../components/types'

interface EventState {
  events: Event[]
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: EventState = {
  events: [],
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
      state.errorMessage = action.payload
    },
    setEvent: (state, action: PayloadAction<Event>) => {
      state.isLoading = false
      state.errorMessage = null
      const newEventData = action.payload
      state.events.push(newEventData)
    },
    resetEvents: (state) => {
      state.events = []
    }
  }
})

export const { setIsLoading, setEvent, setEventError, resetEvents } = eventSlice.actions

export default eventSlice.reducer
