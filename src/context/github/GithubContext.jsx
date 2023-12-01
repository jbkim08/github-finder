import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer.js';

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading(); //로딩상태 true

    //url주소에 쿼리스트링을 만듬(q=text)
    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    //console.log(data);
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });

  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS',
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
