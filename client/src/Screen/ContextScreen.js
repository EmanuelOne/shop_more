import React, { useReducer } from "react";
import { initialState } from "../Reducer/initials";
import { reducerFunc } from "../Reducer/reducer";
import Context from "./context";
const ContextScreen = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextScreen;
