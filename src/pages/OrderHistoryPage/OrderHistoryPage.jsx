import './OrderHistoryPage.css';
import * as ordersAPI from '../../utilities/ordersApi'
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderList from '../../components/OrderList/OrderList'
import { useEffect } from 'react';
import { useState } from 'react';
export default function OrderHistoryPage({ user, setUser }) {
  const [cart, setCart] = useState(null);
  const [prevOrders, setPrevOrders] = useState([])
  

  useEffect(function() {
    // Load orderHistory, search for all orders where isPaid === true
    async function getOrderHistory() {
      const history = await ordersAPI.getPastOrders();
      setPrevOrders(history)
      console.log(history)
    }
    getOrderHistory()
  }, []);

  

  return (
    <main className="OrderHistoryPage">
      {/* Render an OrderList component (needs to be coded) */}
      <OrderList history={prevOrders} setCart={setCart} order={cart} />
      {/* Render the OrderDetail component */}
      <OrderDetail order={cart}
      handleChangeQty={null} 
      handleCheckout={null} />
    </main>
  );
}