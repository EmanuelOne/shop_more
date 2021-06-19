import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { productsAllUrl } from "../string";
import { withRouter } from "react-router";
const SearchBox = ({ setData, isLoading, setisLoading, history }) => {
  console.log(history);
  const [input, setInput] = useState("");
  const handleSubmit = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.get(productsAllUrl + "?name=" + input);
      setData(data);
      history.push("/?name=" + input);
      console.log(data);
      setisLoading(false);
    } catch (err) {
      console.log(err.message);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    setInput("");
  };
  return (
    <div className="group relative mx-auto my-4 bg-purple-white shadow rounded border-0 p-3 flex text-gray-600">
      <input
        type="text"
        className="outline-none group-focus:border-purple-500"
        onChange={(e) => {
          const { value } = e.target;
          setInput(value);
        }}
        onKeyPress={(e) => {
          const { key } = e;
          if (key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Enter Product Name..."
      />

      <AiOutlineSearch
        className="text-2xl hover:scale-50 "
        onClick={() => {
          handleSubmit();
        }}
      />
    </div>
  );
};
export default withRouter(SearchBox);
