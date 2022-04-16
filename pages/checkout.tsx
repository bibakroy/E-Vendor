import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems } from "../redux/slices/cartSlice";

const checkout = () => {
  const items = useSelector(selectItems);

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
            {items.map((item, i) => {
              <CheckoutProduct key={i} item={item} />;
            })}
          </div>
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default checkout;
