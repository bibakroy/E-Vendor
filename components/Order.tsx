import moment from "moment";
import Currency from "react-currency-formatter";
import { OrderType } from "../utils/types";

type OrderPropsType = {
  order: OrderType;
};

const Order = ({
  order: { id, amount, amountShipping, items, timestamp, images },
}: OrderPropsType) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-sm font-bold">TOTAL</p>
          <Currency quantity={amount} currency="USD" /> - Next Day Delivery{" "}
          <Currency quantity={amountShipping} currency="USD" />
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl text-right text-blue-500 flex-1">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-sm whitespace-nowrap">
          ORDER #{id}
        </p>
      </div>
      <div className="p-5 sm:-10">
        <div className="flex space-x-6 overflow-y-auto">
          {images.map((image) => (
            <img src={image} className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
