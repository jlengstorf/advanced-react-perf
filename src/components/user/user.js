import React from 'react';
import { Link } from '@reach/router';
import { useShamecaps } from '../../context/shamecaps';
import Layout from '../layout/layout';
import Shamelist from '../shamelist/shamelist';

import './user.scss';

const User = ({ username }) => {
  const { shamecaps, limit, loadMoreShamecaps, totalCount } = useShamecaps({
    user: username
  });

  return (
    <Layout>
      <header className="user-page-header">
        <h1 className="user-heading">Showing shamecaps for @{username}</h1>
        <Link to="/">&larr; back to all shamecaps</Link>
      </header>
      <Shamelist
        shamecaps={shamecaps}
        limit={limit}
        loadMoreShamecaps={loadMoreShamecaps}
        totalCount={totalCount}
      />
    </Layout>
  );
};

export default User;
