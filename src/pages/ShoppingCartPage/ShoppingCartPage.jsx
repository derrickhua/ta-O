import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import './NewOrderPage.css';
import { Link, useNavigate } from 'react-router-dom';
import MenuList from '../../components/MenuList/MenuList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';


export default function ShoppingCartPage({ user, setUser, cart, }) {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(function() {
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);
  // An empty dependency array results in the effect
  // function running ONLY after the FIRST render



  async function handleCheckout() {
    await ordersAPI.checkout();
    // programatically change client-side routes
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}