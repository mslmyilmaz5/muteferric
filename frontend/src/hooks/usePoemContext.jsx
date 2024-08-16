import { useContext } from 'react';
import { PoemContext } from '../context/PoemContext';

export const usePoemContext = () => {
  const context = useContext(PoemContext);

  if (!context) {
    throw Error('usePoemContext must be used inside a PoemContextProvider');
  }

  return context
};