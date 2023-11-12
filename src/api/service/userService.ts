import { k } from '../../helpers'
import { get, post, put } from '..'
import { type UserUpdate, type LoginUser, type User } from '../../models/userTypes'

export const getAllUsers = async () => {
  const url = `${k.api.BASE_URL}/api/auth/all`
  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting users')
    return null
  }
  return data;
}

export const getUser = async () => {
  const url = `${k.api.BASE_URL}${k.api.GET_USER}`
  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting user')
    return null
  }
  return data;
}

export const getUserByEmail = async (email: string): Promise<any> => {
  const url = `${k.api.BASE_URL}${k.api.GET_USER_BY_EMAIL}${email}`
  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting user')
    return null
  }
  return data;
}

export const createUser = async (user: User): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.REGISTER}`
  const { data, error } = await post(url, user)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}

export const updateUser = async (user: UserUpdate): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.UPDATE}`

  const { data, error } = await put(url, user)
  // const { data, error } = await put(url, user)
  if (error !== null) {
    console.log('error updating user: ', error)
    return null
  }
  return data
}

export const updateUserProfileImage = async (user: UserUpdate, file: any): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.UPDATE_USER_PROFILE_IMAGE}`

  if (!file.files[0]) {
    return null
  }

  const formData = new FormData();
  // formData.append('files', { ...file.files[0], userid: user.user_id })
  formData.append('userId', user.user_id)
  formData.append('files', file.files[0])

  const { data, error } = await put(url, formData, true)

  if (error !== null) {
    console.log('error updating user: ', error)
    return null
  }
  return data
}

export const loginUser = async (user: LoginUser): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.LOGIN}`
  const { data, error } = await post(url, user)
  if (error) {
    console.log('error login user')
    return null
  }
  return data
}

export const checkIfTokenExist = (): boolean => {
  const userToken = localStorage.getItem('userToken')
  if (!userToken) {
    return false
  }
  // validate token if false, localStorage.removeItem('userToken')
  return true
}

export const saveToken = (token: string) => {
  localStorage.setItem('userToken', JSON.stringify(token));
}
