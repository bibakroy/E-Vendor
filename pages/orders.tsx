import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import { GetServerSideProps } from "next";
import db from "../firebase";
import moment from "moment";
import Order from "../components/Order";
// import { collection, getDocs } from "firebase/firestore";
import { OrderType } from "../utils/types";

type OrderArrayType = {
  orders: OrderType[];
};

const order = ({ orders }: OrderArrayType) => {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b border-yellow-400 mb-2 pb-1">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders.map((order: OrderType) => (
            <Order order={order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //get the user's logged in credentials
  const session: any = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

  // getDoc(session.user.email)
  //   .collection("orders")
  //   .orderBy("timestamp", "desc")
  //   .get();

  //stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
      session,
    },
  };
};
