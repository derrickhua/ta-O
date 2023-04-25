import { useState, useEffect} from 'react';
import * as ordersAPI from '../../utilities/ordersApi';
import './ShoppingCartPage.css';
import { useNavigate } from 'react-router-dom';
import OrderDetail from '../../components/OrderDetail/OrderDetail';


export default function ShoppingCartPage({ user, setUser }) {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(function() {
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <OrderDetail
        order={cart}
        handleCheckout={handleCheckout}
      />
      {/* load all of the items where the buyer value is the user */}
    </main>
  );
}