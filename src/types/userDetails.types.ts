export interface ISharedUserCommitteeDetails {
  id: number
  position: string
  name: string
  address: string
  phone_number: string
  gender: string
  citizenship_number: string
  citizenship_picture_front: string
  citizenship_picture_back: string
  member_type: string
}
export interface ISharedUserCommitteeDetailsTable extends ISharedUserCommitteeDetails {
  sn: number
  key: string
}
