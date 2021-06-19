import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";
import { Pagination, PageBox } from "../styled-components/pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { pagination } from "../components/pagination";
const ImageScreen = ({ history, location }) => {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  let { search } = location;
  search = location.search.replace("&", "?").split("?");
  let pageQuery = 1;
  let categoryQuery = "";
  if (search)
    search.map((e) => {
      const key = e.split("=")[0];
      const value = e.split("=")[1];
      if ("page".includes(key)) pageQuery = value;
      else if ("category".includes(key)) categoryQuery = value;
      return null;
    });
  // console.log(pageQuery, category);

  useEffect(() => {
    if (!data.products) {
      axios
        .get(
          `http://localhost:5000/api/products?page=${pageQuery}&category=${categoryQuery}`
        )
        .then((res) => {
          setData(res.data);
          setisLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [data, pageQuery, categoryQuery]);
  console.log();
  let { page, pages } = data;
  const handlePage = (e, category, type) => {
    if (!type) pageQuery = e.target.innerText;
    categoryQuery = category ? category : categoryQuery;
    // console.log();
    setisLoading(true);
    axios
      .get(
        `http://localhost:5000/api/products?page=${pageQuery}&category=${categoryQuery}`
      )
      .then((res) => {
        if (type) history.push(`/?page=${1}&category=${categoryQuery}`);
        // else if (!type && categoryQuery)
        //   history.push(`/?page=${pageQuery}&category=${categoryQuery}`);
        else history.push(`/?page=${pageQuery}&category=${categoryQuery}`);
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => console.log(err.message));
    window.scrollTo({ top: 0, behavior: "smooth" });

    //send the history to ?page={page}
    //api apiUrl?page={page}
  };
  const handleIcon = (type) => {
    //next >> prevous
    if (type === "next") {
      pageQuery = Number(pageQuery) + 1;
    } else {
      pageQuery = pageQuery - 1;
    }
    setisLoading(true);
    axios
      .get(
        `http://localhost:5000/api/products?page=${pageQuery}&category=${categoryQuery}`
      )
      .then((res) => {
        history.push(`/?page=${pageQuery}&category=${categoryQuery}`);
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => console.log(err.message));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`flex px-6 py-4 flex-col h-screen ${
        isLoading && "justify-center gap-4"
      } `}
    >
      <SearchBox
        setisLoading={setisLoading}
        isLoading={isLoading}
        setData={setData}
      />
      {isLoading ? (
        <div className="mx-auto align-middle loader border-purple-500 ease-linear rounded-full border-8 border-t-8  h-64 w-64"></div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 content-center justify-items-center gap-4">
            {data.products ? (
              data.products.map((product, i) => (
                <ProductCard
                  key={i}
                  product={product}
                  image={`./images/image${i + 1 <= 6 ? i + 1 : i - 5}.jpg`}
                  handleClick={handlePage}
                />
              ))
            ) : (
              <div className="mx-auto ">No Images found</div>
            )}
          </div>
        </>
      )}
      <Pagination
        className={`${
          !isLoading ? "opacity-100" : "opacity-5"
        } transition-opacity gap-2 sm:gap-4 mt-4`}
      >
        {page > 1 && (
          <IoIosArrowBack
            className="text-2xl hover:bg-black rounded hover:text-white"
            onClick={() => handleIcon("previous")}
          />
        )}
        {pagination(0, pages).map((e, i) => (
          <PageBox
            className="rounded overflow-hidden shadow-lg p-2 my-2 cursor-pointer "
            key={i}
            page={page === e}
            onClick={handlePage}
          >
            {e}
          </PageBox>
        ))}
        {page !== pages && (
          <IoIosArrowForward
            onClick={() => handleIcon("next")}
            className="text-2xl hover:bg-black rounded hover:text-white"
          />
        )}
      </Pagination>
    </div>
  );
};

export default ImageScreen;
