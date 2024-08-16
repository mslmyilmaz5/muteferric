import { createContext, useReducer } from 'react';

export const PoemContext = createContext();

export const poemReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POEMS': 
      return {
        poems: action.payload
      };
    case 'CREATE_POEM':
      return {
        poems: [action.payload, ...state.poems]
      };
    case 'DELETE_POEM':
      return {
        poems: state.poems.filter((w) => w._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const PoemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(poemReducer, {
    poems: []
  });

  return (
    <PoemContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PoemContext.Provider>
  );
};