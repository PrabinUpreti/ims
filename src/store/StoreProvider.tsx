import { ReactNode, useReducer } from 'react'
import { DispatchContext, StoreContext } from './context'
import { initialState, reducer, IStoreState, IAction } from './reducer'

interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<IStoreState, IAction>>(
    reducer,
    initialState
  )

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StoreContext.Provider>
  )
}

export default StoreProvider
