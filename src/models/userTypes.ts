export interface LoginUser {
  email: string
  password: string
}

export interface User extends LoginUser {
  user_id?: string
  user_name: string
  nick_name: string
  profile_image: string
}

export interface UserUpdate {
  user_id: string
  user_name: string
  nick_name: string
  profile_image: string
}

export interface Inputs {
  userName: string
  nickName: string
  email: string
  password: string
}
