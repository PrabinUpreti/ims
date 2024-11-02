import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { IPagination, IParams } from '../types/pagination.types'
import { convertToNepali } from '../utils/nepaliConverter'

interface FetchOptions<T> {
  apiCall: (params: IParams) => Promise<
    AxiosResponse<{
      data: T[]
      count: number
    }>
  >
  pageSize: number
  onError: (error: AxiosError) => void
}

/**
 * A custom hook for fetching and managing **paginated table data**.
 *
 * @template T - The type of the data being fetched.
 *
 * @param {function} apiCall - function to fetch the paginated data.
 * takes in `params` and returns a `Promise<AxiosResponse<{ data: T[]; count: number }>>`.
 *
 * @param {number} pageSize - number of items to display per page.
 *
 * @param {function} onError - callback function to handle any errors that occur during the API call.
 *
 * @returns {Object} An object containing the following properties:
 *   - **`tableData`**: An array containing the fetched data of type `T[]` to be displayed in the table.
 *   - **`loading`**: A boolean that is `true` when the data is being fetched and `false` when the fetch is complete.
 *   - **`pagination`**: An object representing the current pagination state with properties `total` and `current`
 *   - **`fetchData`**: A function that triggers the API call to fetch the data.
 *   - **`handlePaginationChange`**: A function that updates the page number and refetches data when the page is changed.
 *   - **`handleSearch`**: A function that handles search operations, updates the `search` parameter, and resets the pagination.
 *   - **`setTableData?`**: (Optional) A setter function to manually update the table data.
 */
const usePaginatedTableData = <T extends object>({
  apiCall,
  pageSize,
  onError,
}: FetchOptions<T>) => {
  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<T[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    total: 0,
    current: 1,
  })
  const [params, setParams] = useState<IParams>({
    offset: 0,
    search: '',
  })

  const fetchData = useCallback(() => {
    setLoading(true)
    apiCall(params)
      .then(res => {
        const startSN = params.offset
        const tableData = res.data.data.map((item: T, index: number) => ({
          ...item,
          sn: convertToNepali(startSN + index + 1),
          key: startSN + index + 1,
        }))

        setTableData(tableData)
        setPagination(prev => ({
          ...prev,
          total: res.data.count,
          current: params.offset / pageSize + 1,
        }))
      })
      .catch(onError)
      .finally(() => setLoading(false))
  }, [apiCall, params, pageSize, onError])

  const handlePaginationChange = (page: number) => {
    setParams(prevParams => ({
      ...prevParams,
      offset: (page - 1) * pageSize,
    }))
  }

  const handleSearch = useCallback((searchTerm: string) => {
    setParams(prevParams => ({
      ...prevParams,
      search: searchTerm,
      offset: 0,
    }))
  }, [])

  return {
    tableData,
    loading,
    pagination,
    fetchData,
    setTableData,
    handlePaginationChange,
    handleSearch,
  }
}
export default usePaginatedTableData
