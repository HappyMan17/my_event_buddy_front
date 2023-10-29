import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Event } from '../../../models'
import { saveInLocal } from '../../../helpers'

interface EventState {
  event: Event | null
  isLoading: boolean
  errorMessage: string | null
}

const initialState: EventState = {
  event: null,
  isLoading: false,
  errorMessage: null
}

export const eventSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true
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

export const { setIsLoading, setEvent } = eventSlice.actions

export default eventSlice.reducer
