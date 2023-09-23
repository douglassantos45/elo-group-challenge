import { Route, Routes } from 'react-router-dom';
import { Authentication } from '../pages/Authentication';
import { Dashboard } from '../pages/Dashboard';

export const Router = () => {
  return (
    <Routes>
      <Route path="elo-group-challenge/login" element={<Authentication />} />
      <Route
        path="elo-group-challenger/egistration"
        element={<Authentication />}
      />
      <Route path="/elo-group-challenge/" element={<Dashboard />} />
    </Routes>
  );
};
