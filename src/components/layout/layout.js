import React from 'react';

import './layout.scss';

const Layout = ({ children }) => (
  <div
    style={{
      margin: '0 auto',
      width: 1100,
      maxWidth: '90%',
      padding: '0px 1.0875rem 1.45rem',
      paddingTop: 0
    }}
  >
    {children}
  </div>
);

export default Layout;
