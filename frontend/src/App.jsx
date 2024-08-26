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
import AboutUs from './pages/AboutUs'

export const App = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hakkimizda' element={<AboutUs />} />
        <Route path='/giris' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/kayit-ol' element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profilim' element={<Poetry />} />
        <Route path='/yeni-yazi-siir' element={<CreatePoem />} />
        <Route path='/siir/:poem_id' element={<PoetrySingle />} />
        <Route path='/sair/:user_id' element={<PoetryStatic />} />
      </Routes>
    </>
  );
};

export default App;