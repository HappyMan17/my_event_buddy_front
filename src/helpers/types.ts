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
