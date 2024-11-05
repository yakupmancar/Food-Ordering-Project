import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Orders = () => {
  const { getOrders, orders } = useAppContext();
  const { user } = useUser();
  const userId = user?.id;
  
  useEffect(() => {
    if (userId) {
      getOrders(userId);
    }
  }, [userId]);

  return <div>


  </div>;
};

export default Orders;
