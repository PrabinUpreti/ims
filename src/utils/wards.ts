import { convertToNepali } from './nepaliConverter'

export const displayWard = (wardNumber: number) =>
  `वडा नं. - ${convertToNepali(wardNumber)}`
