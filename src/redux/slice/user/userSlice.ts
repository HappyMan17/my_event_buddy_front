import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../../../models'
import { clearLocal, getFromLocal, saveInLocal } from '../../../helpers'
import { checkIfTokenExist } from '../../../api'

export interface UserState {
  user: User | null
  isLoading: boolean
  isUserLogin: boolean
}

const initialState: UserState = {
  user: getFromLocal('user'),
  isLoading: false,
  isUserLogin: checkIfTokenExist()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoadingUser: (state) => {
      state.isLoading = true
    },
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
      state.isLoading = false
    },
    checkUserToken: (state) => {
      if (!isTokenValid()) {
        logout()
      }
      state.isLoading = false
    }
  }
})

export const { login, logout, setUser, setIsLoadingUser, checkUserToken } = userSlice.actions

export default userSlice.reducer
