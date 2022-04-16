import { ProductType } from "../utils/types";

type ItemType = {
  item: ProductType;
};

const CheckoutProduct = ({
  item: { id, title, price, rating, description, category, image },
}: ItemType) => {
  return <div>CheckoutProduct</div>;
};

export default CheckoutProduct;
