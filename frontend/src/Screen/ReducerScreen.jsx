import React, { useContext } from "react";
import { DECREMENT, INCREMENT, NORMAL } from "../Reducer/CONSTANT";

import context from "./context";

const Home = () => {
  const { state, dispatch } = useContext(context);
  const { count } = state;
  //   const handleClick = (btn) => {
  //     if (btn === "in") setInput(input + 1);
  //     else setInput(input - 1);
  //   };
  return (
    <div>
      <h1 className="text-2xl"> Reducer Practice</h1>
      <h4 className="text-md inline font-bold mr-2"> Start Count</h4>
      <input
        type="number"
        // value={input}
        placeholder="enter number"
        onChange={(e) => dispatch({ type: NORMAL, payload: e.target.value })}
      />
      <h2>{count ? count : 0}</h2>
      <button
        onClick={() => dispatch({ type: DECREMENT })}
        className="grayscale bg-gray-100 h-full px-4 py-2 border-transparent outline-none m-4"
      >
        Decreament
      </button>
      <button
        onClick={() => dispatch({ type: INCREMENT })}
        className="grayscale bg-gray-100 h-full px-4 py-2 border-transparent outline-none m-4"
      >
        Increament
      </button>
    </div>
  );
};

export default Home;
