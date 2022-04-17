export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
};

// type Rating = {
//   rate: number;
//   count: number;
// };

export type OrderType = {
  id: string;
  amount: number;
  amountShipping: number;
  images: string[];
  timestamp: number;
  items: Object[];
};
