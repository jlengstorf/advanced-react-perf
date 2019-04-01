import React from 'react';
import Helmet from 'react-helmet';
import Home from '../components/home/home';

const HomePage = ({ location }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="description"
          content="A site to share your dirty little code secrets."
        />
      </Helmet>
      <Home location={location} />
    </React.Fragment>
  );
};

export default HomePage;
