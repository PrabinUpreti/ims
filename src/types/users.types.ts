export interface IUser {
  id: number
  name: string
  first_name: string
  last_name: string
  email: string
  department: string
  rps: string
  role: string
  phone_number: string
  ward: number
  position: string
  is_active: boolean
  profile_picture: string
  address?: string
}

export interface IUserTableData extends IUser {
  sn: number
  key: string
}
