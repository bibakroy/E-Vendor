import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems } from "../redux/slices/cartSlice";
import { ProductType } from "../utils/types";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

const checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();

  return (
    <div className="bg-gray-200">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/advertisement-2.png"
            height={250}
            width={1020}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is empty" : "Shopping cart"}
            </h1>
            {items.map((item: ProductType, i: number) => (
              <CheckoutProduct key={i} item={item} />
            ))}
          </div>
        </div>
        <div>
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={1} currency="USD" />
                </span>
              </h2>
              <button
                className={`button mt-2 ${
                  !session &&
                  "from-gray-500 to-gray-200 border-gray-200 text-gray-200 cursor-not-allowed"
                }`}
              >
                {session ? "Proceed to Checkout" : "Sign in to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
