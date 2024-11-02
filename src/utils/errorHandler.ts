import { FormInstance, notification } from 'antd'
import { AxiosError } from 'axios'
import { isNil } from 'lodash'
import { HttpStatusCode } from '../constants'
import { RESPONSE_ERROR } from '../messages'
import { IAPIError, IFieldErrors } from '../types/apiResponse.types'

const showErrorMessages = (messages?: string[]) => {
  messages?.forEach(message => {
    notification.error({
      message,
    })
  })
}

const setFormFieldErrors = (form: FormInstance, fieldErrors: IFieldErrors) => {
  const fields = Object.entries(fieldErrors).map(([field, errors]) => ({
    name: field,
    errors,
  }))
  form.setFields(fields)
}

/**
 * Displays API error messages on toast.
 * Depends on API response.
 *
 * @param form - antd form instance.
 * @param err - Axios error
 */
export const handleAPIError = (e: AxiosError) => {
  if (isNil(e.response)) {
    notification.error({ message: RESPONSE_ERROR })
    return
  }

  const { errors } = e.response.data as IAPIError
  showErrorMessages(errors)
}

/**
 * Displays API error messages on toast and form field error.
 * Depends on API response.
 *
 * @param form - antd form instance.
 * @param err - Axios error
 */
export const handleFormError = (form: FormInstance, err: AxiosError) => {
  if (isNil(err.response)) {
    notification.error({ message: RESPONSE_ERROR })
    return
  }

  const { errors, field_errors: fieldErrors } = err.response.data as IAPIError
  showErrorMessages(errors)

  if (err.response.status === HttpStatusCode.BAD_REQUEST && !isNil(fieldErrors)) {
    setFormFieldErrors(form, fieldErrors)
  }
}
