import {
  ISharedMasterSetting,
  ISubTopics,
  IUnitsSetting,
  IWardList,
} from './settings.types'

interface IFinancialYear {
  title: string
  id: number
  is_active: boolean
}

export interface IProjectList {
  id: number
  name: string
  code: string
  date_created: string
  date_updated: string
  financial_year: number
  quantity: string
  unit: IUnitsSetting
  sub_topic: ISubTopics
  source: ISharedMasterSetting
  expense_center: ISharedMasterSetting
  wards: IWardList[]
  allocated_budget: string
  status: string
}

export interface IProjectDetail {
  name: string
  code: string
  location: string
  wards: IWardList[]
  financial_year: IFinancialYear
  source: ISharedMasterSetting
  expense_center: ISharedMasterSetting
  sub_topic: ISubTopics
  topic?: ISharedMasterSetting
  project_level: ISharedMasterSetting
  expense_topic: ISharedMasterSetting
  unit: IUnitsSetting
  geo_coordinate: string
  quantity: string
  allocated_budget: string
  estimated_budget: string
  contract_budget: string
  physical_progress: string
  financial_progress: string
  execution_method: string
  status: string
  remarks: string
}

export interface IProjectFormModalData {
  sources: ISharedMasterSetting[]
  expenseCenters: ISharedMasterSetting[]
  projectLevels: ISharedMasterSetting[]
  expenseTopics: ISharedMasterSetting[]
  units: IUnitsSetting[]
  wards: IWardList[]
  financialYears: ISharedMasterSetting[]
  topics: ISharedMasterSetting[]
}

export interface IProjectTable extends IProjectList {
  sn: number
  key: number
}

export interface IStartProjectPayload {
  execution_method: string
  confirm: string
}
