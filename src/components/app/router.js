import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import Loading from '../loading/loading';

const Home = lazy(() =>
  import('../../pages/home' /* webpackChunkName: "Home" */)
);
const Login = lazy(() =>
  import('../../pages/login' /* webpackChunkName: "Login" */)
);
const Add = lazy(() => import('../../pages/add' /* webpackChunkName: "Add" */));
const User = lazy(() =>
  import('../../pages/user' /* webpackChunkName: "User" */)
);
const Dashboard = lazy(() =>
  import('../../pages/dashboard' /* webpackChunkName: "Dashboard" */)
);

const AppRouter = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Home path="/" />
      <Add path="/add" />
      <Login path="/login" />
      <User path="/:username" />
      <Dashboard path="/dashboard" />
    </Router>
  </Suspense>
);

export default AppRouter;
