export interface ISharedMasterSetting {
  id: number
  title: string
  is_active: boolean
  date_created: string
  date_updated: string
}

export interface IWardList {
  address: string
  id: number
  name: string
  ward_number: number
}
export interface ISubTopics extends ISharedMasterSetting {
  topic: {
    title: string
    id: number
    is_active: boolean
  }
}

// (added sn and key on the topics table)
export interface ISharedMasterSettingTable extends ISharedMasterSetting {
  sn: number
  key: string
}

export interface IUnitsSetting extends ISharedMasterSetting {
  short_form: string
}

export type IUnitsSettingTable = IUnitsSetting & ISharedMasterSettingTable
export type ISubTopicSettingTable = ISubTopics & ISharedMasterSettingTable
