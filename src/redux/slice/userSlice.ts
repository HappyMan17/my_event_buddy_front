import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../../models'
import { clearLocal, getFromLocal, saveInLocal } from '../../helpers'

export interface UserState {
  user: User | null
  isUserLogin: boolean
}

const initialState: UserState = {
  user: getFromLocal('user'),
  isUserLogin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isUserLogin = true
    },
    logout: (state) => {
      clearLocal('user')
      clearLocal('userToken')
      state.isUserLogin = false
    },
    setUser: (state, action: PayloadAction<User>) => {
      const newUserData = action.payload
      saveInLocal<User>('user', newUserData)
      state.user = newUserData
    }
  }
})

export const { login, logout, setUser } = userSlice.actions

export default userSlice.reducer
