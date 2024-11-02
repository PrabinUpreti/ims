export interface IFieldErrors {
  [key: string]: string[]
}

export interface IAPIError {
  errors: string[]
  field_errors?: IFieldErrors
}
