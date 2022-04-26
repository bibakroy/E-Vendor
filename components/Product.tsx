import { ProductType } from "../utils/types";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

type ProductPropsType = {
  product: ProductType;
};

const MAX_RATING = 1;
const MIN_RATING = 5;

export const Product = ({
  product: { id, title, price, description, category, image },
}: ProductPropsType) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    };

    //add to redux
    dispatch(addToCart(product));

    //add to localstorage
    if (localStorage.getItem("Items") === null) {
      localStorage.setItem("Items", "[]");
    }

    let itemsArray = JSON.parse(localStorage.getItem("Items")!);
    itemsArray.push(product);

    localStorage.setItem("Items", JSON.stringify(itemsArray));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(1)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-blue-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div>
        <Currency quantity={price} currency="USD" />
      </div>
      <button className="mt-auto button" onClick={addItemToCart}>
        Add to Cart
      </button>
    </div>
  );
};
