import { DECREMENT, INCREMENT, NORMAL } from "./CONSTANT";

export const reducerFunc = (state, action) => {
  let { count } = state;
  count = Number(count);
  console.log(action, state);
  switch (action.type) {
    case NORMAL:
      return { ...state, count: action.payload };
    case INCREMENT:
      return {
        ...state,
        count: count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: count - 1,
      };
    default:
      return { ...state };
  }
};
