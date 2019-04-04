import React, { Suspense, lazy } from 'react'
import { useAnalytics } from '../../context/analytics'
import { useUser } from '../../context/user'
import { useShamecaps } from '../../context/shamecaps'
import Layout from '../layout/layout'
import Loading from '../loading/loading'

import './dashboard.scss'
import Shamelist from '../shamelist/shamelist'

const Chart = lazy(() => import('./chart' /* webpackChunkName: "chart" */))

const Dashboard = () => {
  const { loading, metrics } = useAnalytics()
  const { user } = useUser()
  const {
    shamecaps,
    limit,
    loadMoreShamecaps,
    deleteShamecap,
    totalCount
  } = useShamecaps({
    user: user.name
  })

  return (
    <>
      <Layout>
        <h1 className="dashboard-heading">Your Account</h1>
        <p>Here’s how people feel about your shamecaps:</p>
      </Layout>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={Loading}>
          <div className="chart">
            <Chart metrics={metrics} />
          </div>
        </Suspense>
      )}
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
  )
}

export default Dashboard
