export interface INormalizedBudget {
  id: number
  total_cost: number
  municipality: number
  user_committee: number
  quantity: number
  contingency_percent: number
  contingency_amount: number
  total_estimate: number
}

export interface IProjectBudget {
  id: number
  total_cost: string
  municipality: string
  user_committee: string
  quantity: string
  contingency_percent: string
  contingency_amount: number
  total_estimate: number
}
