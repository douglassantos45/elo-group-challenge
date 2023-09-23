import { Route, Routes } from 'react-router-dom';
import { Authentication } from '../pages/Authentication';
import { Dashboard } from '../pages/Dashboard';

export const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Authentication />} />
      <Route path="registration" element={<Authentication />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
