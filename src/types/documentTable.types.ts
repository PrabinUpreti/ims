export interface IDocumentTable {
  id: number
  key: string
  sn: number
  topic: string
  subTopic: string
  date: string
  status: string
  remark: string
}

// TODO: this ISteps name is not satisfying, let me suggest some suitable name
export interface ISteps {
  id: number
  code: string
  title: string
  steps: {
    id: number
    title: string
    sub_title: string
    code: string
    has_template: boolean
    files: number[]
    step: number
    step_code: string
    status: string
    children: { [key: string]: string }[]
  }[]
}
