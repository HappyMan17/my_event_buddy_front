import { post, get } from '..'
import { k } from '../../helpers'

export const createContact = async (body: { friend_id: string }): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.CREATE_CONTACT}`
  // console.log({ body })
  const { data, error } = await post(url, body)
  // const { data, error } = await put(url, user)
  if (error !== null) {
    console.log('error updating user: ', error)
    return null
  }
  return data
}

export const getUserContacts = async () => {
  const url = `${k.api.BASE_URL}${k.api.USER_CONTACTS}`

  const { data, error } = await get(url)
  // const { data, error } = await put(url, user)
  if (error !== null) {
    console.log('error updating user: ', error)
    return null
  }
  return data
}
