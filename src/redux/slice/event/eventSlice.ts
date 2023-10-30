import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Event } from '../../../models'
import { saveInLocal } from '../../../helpers'
import { type AlertObject } from '../../../components/types'

interface EventState {
  event: Event | null
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: EventState = {
  event: null,
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
      saveInLocal<Event>('event', newEventData)
      state.event = newEventData
    }
  }
})

export const { setIsLoading, setEvent, setEventError } = eventSlice.actions

export default eventSlice.reducer
