import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { getUserByEmail, createContact, getUserContacts } from '../../../api'
import { setContactSelected, setErrorMessage, setIsLoading, setUserContacts } from './contactSlice'
import { contactMapper, userMapper } from '../../../mappers'
import { type Contact } from '../../../models'

export const getAUserByEmail = (email: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading(true))

    const data = await getUserByEmail(email)

    if (!data) {
      dispatch(setErrorMessage({ alertType: 'error', message: 'Could not find the contact' }))
      dispatch(setIsLoading(false))
      return
    }

    // console.log({ data }) // todo remove
    dispatch(setIsLoading(false))
    dispatch(setContactSelected(userMapper(data.user)))
  }
}

export const AddUserContact = (contactId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading(true))

    const data = await createContact({ friend_id: contactId })

    if (!data) {
      dispatch(setErrorMessage({ alertType: 'error', message: 'Could not add the contact' }))
      dispatch(setIsLoading(false))
      return
    }

    // console.log({ data }) // todo remove
    dispatch(setErrorMessage({ alertType: 'success', message: 'Contact added successfully' }))
    dispatch(setIsLoading(false))
  }
}

//! endpoint not created yet
export const getAllUserContacts = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading(true))

    const data = await getUserContacts()

    if (!data) {
      // dispatch(setErrorMessage({ alertType: 'error', message: 'Could not find contacts' }))
      dispatch(setIsLoading(false))
      return
    }

    dispatch(setIsLoading(false))
    data.map((contact: Contact) => dispatch(setUserContacts(contactMapper(contact))))
  }
}
