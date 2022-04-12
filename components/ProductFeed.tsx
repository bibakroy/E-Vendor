import { ProductType } from "../utils/types";
import { Product } from "./Product";

type ProductFeedPropsType = {
  products: ProductType[];
};

export const ProductFeed = ({ products }: ProductFeedPropsType) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-32 mx-auto">
      {products.slice(0, 4).map((product: any) => {
        return <Product key={product.id} product={product} />;
      })}
      <img className="md:col-span-full px-5" src="/advertisement.jpg" alt="" />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product: any) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
      {products.slice(5, products.length).map((product: any) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};
