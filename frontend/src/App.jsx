import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Poetry from './pages/Poetry';
import Signup from './pages/Signup';
import PoetryStatic from './pages/PoetryStatic';
import { CreatePoem } from './pages/CreatePoem';
import Home from './pages/Home';
import { PoetrySingle } from './pages/PoetrySingle';
import { useAuthContext } from './hooks/useAuthContext';
import Admin from './pages/Admin'

export const App = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/myPoetries' element={<Poetry />} />
        <Route path='/createPoem' element={<CreatePoem />} />
        <Route path='/viewPoem/:poem_id' element={<PoetrySingle />} />
        <Route path='/viewPoet/:user_id' element={<PoetryStatic />} />
      </Routes>
    </>
  );
};

export default App;