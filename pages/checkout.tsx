import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../redux/store";
import { ProductType } from "../utils/types";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key!);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session?.user?.email,
    });

    // redirect user to stripe checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) alert(result.error.message);
  };

  return (
    <div className={`bg-gray-200 ${items.length === 0 ? "h-screen" : ""}`}>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/advertisement-2.png"
            height={250}
            width={items.length === 0 ? 1500 : 1220}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is empty" : "Shopping cart"}
            </h1>
            {items.map((item: ProductType, i: number) => (
              <CheckoutProduct key={i} item={item} />
            ))}
            {/* {items.length !== 0
              ? items.map((item: ProductType, i: number) => (
                  <CheckoutProduct key={i} item={item} />
                ))
              : itemsArray.map((item: ProductType, i: number) => (
                  <CheckoutProduct key={i} item={item} />
                ))} */}
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col max-w-screen-xl m-5 bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total} currency="USD" />
              </span>
            </h2>
            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-500 to-gray-300 border-gray-200 text-gray-50 cursor-not-allowed"
              }`}
            >
              {session ? "Proceed to Checkout" : "Sign in to checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
