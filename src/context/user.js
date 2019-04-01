/*
 * Because we don’t want to require everyone to set up new accounts, API keys,
 * or be limited by flaky wifi, we’re going to fake our authentication.
 *
 * This stores user info in localStorage to simulate a valid session and does
 * nothing secure whatsoever.
 *
 * 🚨 DANGER WILL ROBINSON: This is not a valid authentication solution.
 * 😎 It _is_, however, a very handy way to manage state in React.
 *
 * This approach is a combination of Luke Hall’s and Kent C. Dodd’s ideas:
 * - https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
 * - https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks
 */
import React, { createContext, useEffect, useReducer, useContext } from 'react';

export const UserContext = createContext();

const types = {
  login: 'USER_LOGIN',
  logout: 'USER_LOGOUT'
};

const initialState = {
  name: window.localStorage.getItem('name') || null,
  avatar: window.localStorage.getItem('avatar') || null
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return {
        name: action.name,
        avatar: action.avatar
      };

    case types.logout:
      return {
        name: null,
        avatar: null
      };

    default:
      console.error(`Unknown action “${action.type}”`);
      return state;
  }
};

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);

export const useUser = () => {
  const [user, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (user.name) {
      window.localStorage.setItem('name', user.name);
      window.localStorage.setItem('avatar', user.avatar);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('avatar');
    }
  }, [user]);

  const login = ({ name, avatar }) =>
    dispatch({ type: types.login, name, avatar });
  const logout = () => dispatch({ type: types.logout });

  return { user, login, logout };
};
