export interface IProjectBeneficiary {
  id: number
  total_family: string
  adhibasi: string
  dalit: string
  total_male: string
  total_female: string
  total_other: string
  child_male: string
  child_female: string
  child_other: string
  other_male: string
  other_female: string
  other_other: string
}

export interface IProjectBeneficiaryTable {
  sn: string
  topic: string
  female: string | null
  male: string | null
  other: string | null
  total: string
  key: string
}
