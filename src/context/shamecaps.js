/*
 * Because we don’t want to require everyone to set up new accounts, API keys,
 * or be limited by flaky wifi, we’re going to fake our data management.
 *
 * This stores shamecaps in localStorage and simulates request latency.
 */
import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { navigate } from '@reach/router';

const LIMIT = 10;

const types = {
  create: 'SHAMECAP_CREATE',
  delete: 'SHAMECAP_DELETE',
  load: 'SHAMECAP_LOAD',
  filter: 'SHAMECAP_FILTER',
  loadMoreShamecaps: 'SHAMECAP_UPDATE_LIMIT'
};

// Support query string params for filters.
const queryString = new URL(document.location).searchParams;

const localShame = window.localStorage.getItem('shamecaps');
const shamecaps =
  localShame && localShame.length
    ? JSON.parse(localShame)
    : [
        {
          id: 1,
          code: `const superhacks = 'this is terrible code';`,
          user: { name: 'SaraVieira' },
          title: 'Superhacks',
          created: 1552860977820,
          language: 'javascript'
        },
        {
          id: 2,
          code: `// oh my god I’m so sorry`,
          user: { name: 'jlengstorf' },
          title: 'I’m so sorry',
          created: 1552860957820,
          language: 'javascript'
        }
      ];

const fetchShamecaps = limit => {
  const getData = () => shamecaps.slice(0, limit);

  return new Promise(resolve => {
    // Simulate network latency.
    setTimeout(() => {
      const shamecaps = getData();
      resolve(shamecaps);
    }, 850);
  });
};

// Load from localStorage if items are set. Otherwise seed with a couple entries.
const initialState = {
  loading: true,
  limit: LIMIT,
  shamecaps: [],
  filters: {
    language: queryString.get('language') || 'all',
    type: queryString.get('type') || 'all'
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.load:
      return {
        ...state,
        loading: false,
        shamecaps: action.shamecaps
      };

    case types.loadMoreShamecaps:
      return {
        ...state,
        limit: state.limit + LIMIT
      };

    case types.create:
      const nextShamecaps = [...state.shamecaps, action.shamecap];
      window.localStorage.setItem('shamecaps', JSON.stringify(nextShamecaps));
      return {
        ...state,
        shamecaps: nextShamecaps
      };

    case types.delete:
      return {
        ...state,
        shamecaps: state.shamecaps.filter(s => s.id !== action.id)
      };

    case types.filter:
      return {
        ...state,
        filters: { ...state.filters, ...action.filters }
      };

    default:
      console.error(`Unrecognized action “${action.type}”`);
      return state;
  }
};

export const ShamecapsContext = createContext();

export const ShamecapsProvider = ({ children }) => (
  <ShamecapsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ShamecapsContext.Provider>
);

export const useShamecaps = userFilters => {
  const [{ loading, limit, shamecaps, filters }, dispatch] = useContext(
    ShamecapsContext
  );

  // Only on mount — and only if no data has loaded — load the shamecaps.
  useEffect(() => {
    if (loading) {
      async function getData() {
        const data = await fetchShamecaps();
        dispatch({ type: types.load, shamecaps: data });
      }

      getData();
    }
  }, []);

  useEffect(() => {
    const url = new URL(document.location);
    if (url.pathname === '/') {
      const params = url.searchParams;
      const originalQueryString = `${params}`;
      Object.entries(filters).forEach(([key, val]) => {
        params.set(key, val);
      });

      if (originalQueryString !== `${params}`) {
        navigate(`${url.pathname}?${params}`);
      }
    }
  }, [filters]);

  const createShamecap = shamecap => dispatch({ type: types.create, shamecap });
  const deleteShamecap = id => dispatch({ type: types.delete, id });
  const loadMoreShamecaps = () => dispatch({ type: types.loadMoreShamecaps });
  const setFilters = filters => dispatch({ type: types.filter, filters });

  // If user filters are applied, make sure we use them.
  const { language = filters.language, type = filters.type, user } =
    userFilters || filters;

  const filteredShamecaps = shamecaps
    // Show most recent shamecaps first
    .sort((a, b) => b.created - a.created)
    // Apply filters
    .filter(shamecap =>
      [
        language && language !== 'all' ? shamecap.language === language : true,
        type && type !== 'all' ? shamecap.type === type : true,
        user ? shamecap.user.name === user : true
      ].every(Boolean)
    );

  return {
    loading,
    shamecaps: filteredShamecaps.slice(0, limit),
    totalCount: filteredShamecaps.length,
    filters,
    limit,
    createShamecap,
    deleteShamecap,
    loadMoreShamecaps,
    setFilters
  };
};
