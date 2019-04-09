import React, { useState } from 'react';
import { Link } from '@reach/router';
import { formatDistance } from 'date-fns';
import Code from './code';
import Controls from './controls';

export default ({
  id,
  language,
  code,
  user,
  title,
  showUserDetails,
  created,
  showControls,
  deleteShamecap
}) => {
  const [prettierCode, setPrettierCode] = useState('');

  Promise.all([
    import('prettier/standalone' /* webpackChunkName: "prettier" */),
    import('prettier/parser-graphql' /* webpackChunkName: "prettier-parser-graphql" */),
    import('prettier/parser-babylon' /* webpackChunkName: "prettier-parser-babylon" */),
    import('prettier/parser-markdown' /* webpackChunkName: "prettier-parser-markdown" */)
  ]).then(([prettier, ...plugins]) => {
    try {
      setPrettierCode(
        prettier.format(code, {
          parser: language === 'javascript' ? 'babel' : language,
          plugins
        })
      );
    } catch {
      setPrettierCode(code);
    }
  });

  return (
    <section className="shame-wrapper">
      <div className="shame">
        <div className="terminal">
          <Controls />
          <Code language={language} code={prettierCode} />
        </div>
      </div>
      <h3 className="title">{title}</h3>
      {showUserDetails && (
        <span className="details">
          Posted by{' '}
          <Link to={`/${user.name}`} state={{ username: user.displayName }}>
            @{user.name}
          </Link>{' '}
          {formatDistance(created, Date.now(), { addSuffix: true })}
        </span>
      )}
      {showControls && (
        <span className="details">
          <button onClick={() => deleteShamecap(id)} className="delete-button">
            delete this shamecap
          </button>
        </span>
      )}
    </section>
  );
};
