import React from 'react';
import { useShamecaps } from '../../context/shamecaps';
import Layout from '../layout/layout';
import Loading from '../loading/loading';
import Shamelist from '../shamelist/shamelist';

import './home.scss';

const Home = ({ location }) => {
  const {
    loading,
    shamecaps,
    limit,
    loadMoreShamecaps,
    totalCount,
  } = useShamecaps();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <>
      <section className="banner">YOU KNOW WHAT YOU DID</section>
      <Layout>
        {location.state && location.state.created && (
          <div className="new-shamecap-notice">
            <p>
              <strong>Sweet catharsis!</strong> Your shame has been released
              like a bird into the night.
            </p>
          </div>
        )}
        <Shamelist
          shamecaps={shamecaps}
          limit={limit}
          loadMoreShamecaps={loadMoreShamecaps}
          totalCount={totalCount}
          showUserDetails
        />
      </Layout>
    </>
  );
};

export default Home;
