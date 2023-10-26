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

export const createUser = async (user: User): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.REGISTER}`
  const { data, error } = await post(url, user)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}

export const updateUser = async (user: UserUpdate, files: any): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.UPDATE}`
  const formData = new FormData();
  Object.keys(user).forEach(key => { formData.append(key, user[key]); })
  for (let i = 0; i < files.files.length; i++) {
    formData.append('files', files.files[i]);
  }

  const { data, error } = await put(url, formData)
  if (error != null) {
    console.log('error updating user')
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
