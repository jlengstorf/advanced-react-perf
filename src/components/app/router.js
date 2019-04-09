import React from 'react';
import { Router } from '@reach/router';

import Home from '../../pages/home';
import Add from '../../pages/add';
import Login from '../../pages/login';
import User from '../../pages/user';
import Dashboard from '../../pages/dashboard';

const AppRouter = () => (
  <Router>
    <Home path="/" />
    <Add path="/add" />
    <Login path="/login" />
    <User path="/:username" />
    <Dashboard path="/dashboard" />
  </Router>
);

export default AppRouter;
