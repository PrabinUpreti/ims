import axios, { AxiosRequestConfig } from 'axios'

interface IRequestOptions {
  url: AxiosRequestConfig['url']
  params?: AxiosRequestConfig['params']
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
}

export const request = ({
  url,
  params,
  method = 'GET',
  data,
  headers = {},
}: IRequestOptions) =>
  axios({
    url,
    params,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
