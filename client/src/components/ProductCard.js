import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const ProductCard = ({ product, image, handleClick }) => {
  let { category, description, name, rating } = product;
  console.log(rating);
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  description =
    description.split(".")[0].length < 5
      ? description.split(".")[1]
      : description.split(".")[0];
  // description.length < 50 ? description : description.slice(0, 50) + "...";
  name = name.length < 30 ? name : name.slice(0, 30) + "...";
  return (
    <div className="max-w-full w-48 rounded-lg overflow-hidden shadow-lg productCard py-4 justify-between flex flex-col group ">
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="w-full object-cover  image flex items-end justify-center"
      >
        <div className="opacity-0 transition-all group-hover:opacity-100 flex items-end justify-center">
          {[...new Array(rating)].map(() => (
            <AiFillStar className="text-yellow-400 text-xl" />
          ))}
          {[...new Array(5 - rating)].map(() => (
            <AiOutlineStar className="text-yellow-400 text-xl" />
          ))}
        </div>
      </div>
      {/* <img src={image} className="w-full object-cover" alt={product.name} /> */}
      <div className="flex gap-4 flex-col justify-between px-1 sm:px-3 pb-1">
        <div className="font-bold text-purple-500 text-lg capitalize">
          {name}
        </div>
        <p className="font-bold text-gray-500 text-xs">{description}</p>
        <span
          className="rounded-full text-xs font-semibold bg-gray-200 px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-500"
          onClick={(e) => handleClick(e, category, "category")}
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
