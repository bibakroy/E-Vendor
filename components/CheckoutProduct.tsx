import { ProductType } from "../utils/types";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

type ItemType = {
  item: ProductType;
};

const CheckoutProduct = ({
  item: { id, title, price, rating, description, category, image },
}: ItemType) => {
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

    const itemsArray = JSON.parse(localStorage.getItem("Items")!);
    itemsArray.push(product);

    localStorage.setItem("Items", JSON.stringify(itemsArray));
  };

  const removeItemFromCart = () => {
    //remove from redux
    dispatch(removeFromCart({ id }));

    //remove from localstorage
    const itemsArray = JSON.parse(localStorage.getItem("Items")!);
    const index = itemsArray.findIndex((item: any) => item.id === id);

    if (index >= 0) {
      itemsArray.splice(index, 1);
    } else {
      console.warn(
        `Cannot remove the product of id ${id} as it is not existed`
      );
    }

    localStorage.setItem("Items", JSON.stringify(itemsArray));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill(1)
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-blue-500" />
            ))}
        </div>
        <p className="text-sm my-2 line-clamp-2">{description}</p>
        <Currency quantity={price} currency="USD" />
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button w-25" onClick={addItemToCart}>
          Add to Cart
        </button>
        <button className="button w-25" onClick={removeItemFromCart}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
