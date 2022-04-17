import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/store";
import { addToCart } from "../redux/slices/cartSlice";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const handleSignout = () => {
    //clearing cart item from localstorage
    localStorage.removeItem("Items");

    signOut();
  };

  const handleSignin = () => {
    //clearing cart item from localstorage
    localStorage.removeItem("Items");

    signIn();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const itemsArray = JSON.parse(localStorage.getItem("Items")!);

      if (
        itemsArray !== null &&
        itemsArray !== undefined &&
        itemsArray.length !== 0 &&
        items.length === 0
      ) {
        itemsArray.map((item: any) => dispatch(addToCart(item)));
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* top header */}
      <div className="bg-self_blue flex items-center flex-grow p-1 py-3">
        <div className="flex items-center flex-grow md:flex-grow-0 flex-shrink-0 mr-2 ml-2">
          <Image
            src="/logo.svg"
            width={100}
            height={30}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <div className="bg-yellow-400 hover:bg-yellow-500 hidden md:flex items-center h-10 rounded-md flex-grow flex-shrink cursor-pointer">
          <input
            type="text"
            className="h-full p-2 flex-grow flex-shrink rounded-l-md focus:outline-none px-3"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            className="link"
            onClick={() => (!session ? handleSignin() : handleSignout())}
          >
            <p>{session ? `Hello, ${session.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="flex items-center link relative"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute w-4 h-4 bg-yellow-100 top-0 right-0 md:right-7 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-1">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* Bottom header */}
      <div className="flex items-center bg-self_blue-light text-white text-[13px] space-x-3 p-2 pl-4">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">{"Todays' Deal"}</p>
        <p className="link">Customer Service</p>
        <p className="link">Gift Cards</p>
        <p className="link hidden md:inline-flex">Sell</p>
        <p className="link hidden md:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Foods & Groceries</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
