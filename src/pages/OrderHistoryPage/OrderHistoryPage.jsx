import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api'
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderList from '../../components/OrderList/OrderList'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
export default function OrderHistoryPage({ user, setUser }) {
  const [cart, setCart] = useState(null);
  const [prevOrders, setPrevOrders] = useState([])
  

  useEffect(function() {
    // Load orderHistory, search for all orders where isPaid === true
    async function getOrderHistory() {
      const history = await ordersAPI.getPastOrders();
      setPrevOrders(history)
      setCart(history[0])
    }
    getOrderHistory()
    console.log(prevOrders)
  }, []);

  

  return (
    <main className="OrderHistoryPage">
      <aside>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      {/* Render an OrderList component (needs to be coded) */}
      <OrderList history={prevOrders} setCart={setCart}/>
      {/* Render the existing OrderDetail component */}
      <OrderDetail order={cart}
      handleChangeQty={null} 
      handleCheckout={null} />
    </main>
  );
}