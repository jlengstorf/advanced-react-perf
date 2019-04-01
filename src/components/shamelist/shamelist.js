import React from 'react';
import Filters from './filters';
import Shame from './shame';

import './shamelist.scss';

const Shamelist = ({
  shamecaps,
  loadMoreShamecaps,
  showUserDetails,
  showControls,
  deleteShamecap,
  totalCount
}) => (
  <>
    <Filters totalCount={totalCount} />
    <main className="shamelist">
      {shamecaps.map(shamecap => (
        <Shame
          key={shamecap.id}
          {...shamecap}
          showUserDetails={showUserDetails}
          showControls={showControls}
          deleteShamecap={deleteShamecap}
        />
      ))}
    </main>

    {shamecaps.length < totalCount && (
      <button
        type="button"
        className="load-more-button"
        onClick={loadMoreShamecaps}
      >
        MOAR Shame!
      </button>
    )}
  </>
);

export default Shamelist;
