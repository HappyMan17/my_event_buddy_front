import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type AlertObject } from '../../../components/types';
import { type Contact } from '../../../models';

interface ContactState {
  userContacts: Contact[]
  contactSelected: Contact | null
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: ContactState = {
  userContacts: [],
  contactSelected: null,
  isLoading: false,
  errorMessage: null
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactSelected: (state, action: PayloadAction<Contact | null>) => {
      state.contactSelected = action.payload
    },
    setUserContacts: (state, action: PayloadAction<Contact>) => {
      state.userContacts = [...state.userContacts, action.payload]
    },
    resetUserContacts: (state) => {
      state.userContacts = []
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<AlertObject>) => {
      state.errorMessage = action.payload
    }
  }
})

export const { setContactSelected, setUserContacts, resetUserContacts, setIsLoading, setErrorMessage } = contactSlice.actions

export default contactSlice.reducer
