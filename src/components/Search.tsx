/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import './layout.css';

import algoliasearch from 'algoliasearch';

// const client = algoliasearch(applicationId, apiKey, {
//   timeout: 4000,
// });

// (async () => {
//   try {
//     const content = await index.search({ query: 'query string' });
//     console.log(content);
//   } catch (err) {
//     console.log(err);
//     console.log(err.debugData);
//   }
// })();

const client = algoliasearch('UJ52ZQO0TB', '7ccb45867b098edbb008932e685dd043');

const Search = () => {
  const inputElm = React.useRef<HTMLInputElement>(null);

  const handleClickButton = async () => {
    const word = inputElm!.current!.value;
    const index = client.initIndex('dev_recipes');
    try {
      const response = await index.search({ query: word });
      // Response from Algolia:
      // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
      console.info(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <input type="text" ref={inputElm} />
      <input type="button" value="検索" onClick={handleClickButton} />
    </>
  );
};

export default Search;
