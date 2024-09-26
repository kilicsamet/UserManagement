import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from '../pages/users/User';
import UserEdit from '../pages/users/UserEdit';
import UserAdd from '../pages/users/UserAdd';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="user-edit/:id" element={<UserEdit />}/>
      <Route path="user-add" element={<UserAdd />}/>
    </Routes>
  );
};

export default AppRouter;
