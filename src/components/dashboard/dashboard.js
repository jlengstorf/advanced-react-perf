import React from 'react';
import { useUser } from '../../context/user';
import { useShamecaps } from '../../context/shamecaps';
import Layout from '../layout/layout';
import Shamelist from '../shamelist/shamelist';
import Chart from './chart';

import './dashboard.scss';

const Dashboard = () => {
  const { user } = useUser();
  const {
    shamecaps,
    limit,
    loadMoreShamecaps,
    deleteShamecap,
    totalCount
  } = useShamecaps({
    user: user.name
  });

  return (
    <>
      <Layout>
        <h1 className="dashboard-heading">Your Account</h1>
        <p>Here’s how people feel about your shamecaps:</p>
      </Layout>
      <div className="chart">
        <Chart />
      </div>
      <Layout>
        <Shamelist
          shamecaps={shamecaps}
          limit={limit}
          loadMoreShamecaps={loadMoreShamecaps}
          totalCount={totalCount}
          deleteShamecap={deleteShamecap}
          showControls
        />
      </Layout>
    </>
  );
};

export default Dashboard;
