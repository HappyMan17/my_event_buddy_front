import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Activity } from '../../../models'
import { type AlertObject } from '../../../components/types'

interface ActivityState {
  activities: Activity[]
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: ActivityState = {
  activities: [],
  isLoading: false,
  errorMessage: null
}

export const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true
    },
    setActivityError: (state, action: PayloadAction<AlertObject>) => {
      state.errorMessage = action.payload
    },
    setActivity: (state, action: PayloadAction<Activity>) => {
      state.isLoading = false
      state.errorMessage = null
      const newActivityData = action.payload
      state.activities.push(newActivityData)
    },
    resetActivities: (state) => {
      state.activities = []
    }
  }
})

export const { setIsLoading, setActivity, setActivityError, resetActivities } = activitySlice.actions

export default activitySlice.reducer
