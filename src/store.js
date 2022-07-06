import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const INITIAL_STATE = {
  activeLocation: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-active-location':
      console.log(action.type, action.example);
      return {
        ...state,
        activeLocation: action.loc,
      };
      
  }
};


export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
