import React from 'react';
import Helmet from 'react-helmet';
import Header from './header';
import Router from './router';
import { AnalyticsProvider } from '../../context/analytics';
import { ShamecapsProvider } from '../../context/shamecaps';
import { UserProvider } from '../../context/user';

import './app.scss';

const App = () => (
  <AnalyticsProvider>
    <ShamecapsProvider>
      <UserProvider>
        <Helmet titleTemplate="%s · shame.dev" defaultTitle="shame.dev">
          <meta
            name="description"
            content="A site to share your dirty little code secrets."
          />
        </Helmet>
        <Header />
        <Router />
      </UserProvider>
    </ShamecapsProvider>
  </AnalyticsProvider>
);

export default App;
