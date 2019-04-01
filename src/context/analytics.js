/*
 * Because we don’t want to require everyone to set up new accounts, API keys,
 * or be limited by flaky wifi, we’re going to fake our data management.
 *
 * This pulls fake analytics and simulates request latency.
 */
import React, { createContext, useContext, useEffect, useReducer } from 'react';

const getRandomValue = () => Math.ceil(Math.random() * 8 + 2);

const types = {
  load: 'ANALYTICS_LOAD'
};

const initialState = {
  loading: true,
  metrics: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.load:
      return {
        ...state,
        loading: false,
        metrics: action.metrics
      };

    default:
      console.error(`Unknown action type ${action.type}`);
      return state;
  }
};

const fetchData = () => {
  return new Promise(resolve => {
    // Simulate a slooooooooow data call.
    setTimeout(() => {
      resolve([
        { key: 'cringe', name: '🙈', domain: [0, 11], value: getRandomValue() },
        { key: 'fuckit', name: '🤬', domain: [0, 11], value: getRandomValue() },
        { key: 'scary', name: '😱', domain: [0, 11], value: getRandomValue() },
        { key: 'evil', name: '😈', domain: [0, 11], value: getRandomValue() },
        {
          key: 'heartbreaking',
          name: '💔',
          domain: [0, 11],
          value: getRandomValue()
        },
        { key: 'sad', name: '😭', domain: [0, 11], value: getRandomValue() }
      ]);
    }, 4000);
  });
};

export const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => (
  <AnalyticsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AnalyticsContext.Provider>
);

export const useAnalytics = () => {
  const [state, dispatch] = useContext(AnalyticsContext);

  useEffect(() => {
    async function getData() {
      const data = await fetchData();

      dispatch({ type: types.load, metrics: data });
    }

    getData();
  }, []);

  return state;
};
