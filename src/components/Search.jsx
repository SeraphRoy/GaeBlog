// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [client, setClient] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const algoliaClient = algoliasearch('Y8FHWDW9NB', '7b585e6b877dd5ae83ada3eb38a70bdd');
    setClient(algoliaClient);
    setIndex(algoliaClient.initIndex('Gaeblog'));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || !index) return;

    try {
      const { hits } = await index.search(query);
      setResults(hits);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {results.map((hit) => (
              <li key={hit.objectID}>
                <a href={hit.url}>
                  <h3>{hit.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: hit._highlightResult?.content?.value || '' }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}