import React from 'react';
import { Link } from '@reach/router';
import prettier from 'prettier/standalone';
import moment from 'moment';
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
  const plugins = [
    require('prettier/parser-graphql'),
    require('prettier/parser-babylon'),
    require('prettier/parser-markdown')
  ];

  let prettierCode;
  try {
    prettierCode = prettier.format(code, {
      parser: language === 'javascript' ? 'babel' : language,
      plugins
    });
  } catch {
    prettierCode = code;
  }

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
          {moment(created).fromNow()}
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
