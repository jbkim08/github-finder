import { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer.js';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  //경고창내용을 스테이트로
  const [state, dispatch] = useReducer(AlertReducer, null);

  //경고창 메세지 설정후 3초후 제거
  const setAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        msg: msg,
        type: type,
      },
    });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
  );
};

export default AlertContext;
