import { createContext, useContext, Dispatch } from 'react'
import { IStoreState, IAction } from './reducer'

export const StoreContext = createContext<IStoreState | null>(null)
export const DispatchContext = createContext<Dispatch<IAction> | null>(null)

export const useStore = (): IStoreState => {
  const store = useContext(StoreContext)

  if (store == null) {
    throw Error('useStore must be used within an StoreProvider')
  }

  return store
}

export const useDispatch = (): Dispatch<IAction> => {
  const dispatch = useContext(DispatchContext)

  if (dispatch == null) {
    throw Error('useDispatch must be used within an StoreProvider')
  }

  return dispatch
}
