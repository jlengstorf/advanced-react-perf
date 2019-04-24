import { useState } from 'react';

const usePrettier = (code, language) => {
  const [prettierCode, setPrettierCode] = useState('');

  Promise.all([
    import('prettier/standalone' /* webpackChunkName: "prettier" */),
    import('prettier/parser-graphql' /* webpackChunkName: "prettier-graphql-parser" */),
    import('prettier/parser-babylon' /* webpackChunkName: "prettier-babel-parser" */),
    import('prettier/parser-markdown' /* webpackChunkName: "prettier-markdown-parser" */)
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

  return prettierCode;
};

export default usePrettier;
