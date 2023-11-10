import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { getUserByEmail } from '../../../api'
import { setContactSelected, setErrorMessage, setIsLoading } from './contactSlice'
import { createContact } from '../../../api/service'
import { userMapper } from '../../../mappers'

export const getAUserByEmail = (email: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading(true))

    const data = await getUserByEmail(email)

    if (!data) {
      dispatch(setErrorMessage({ alertType: 'error', message: 'Could not find the contact' }))
      dispatch(setIsLoading(false))
      return
    }

    console.log({ data }) // todo remove
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

    console.log({ data }) // todo remove
    dispatch(setErrorMessage({ alertType: 'error', message: 'Contact added successfully' }))
    dispatch(setIsLoading(false))
  }
}

//! endpoint not created yet
// export const getAUserContacts = () => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     dispatch(setIsLoading(true))

//     const data = await getUserByEmail()

//     if (!data) {
//       dispatch(setErrorMessage({ alertType: 'error', message: 'Could not find the contact' }))
//       dispatch(setIsLoading(false))
//       return
//     }

//     console.log({ data }) // todo remove
//     dispatch(setIsLoading(false))
//     dispatch(setContactSelected(data))
//   }
// }
