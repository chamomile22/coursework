import { createContext, useContext, useState } from 'react';

const StoreContext = createContext(undefined);

export function StoreProvider({ children }) {
  const [state, setState] = useState({
    user: {
      userName: '',
      email: '',
      roleId: null,
    }
  })
  
  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context;
}