import './OrderList.css';
import OrderListItem from '../OrderListItem/OrderListItem';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderList({ history, setCart }) {
    const orderHistory = history.map((order, idx) =>
        <OrderListItem 
        order = {order}
        setCart = {setCart}
        />
        );
    
    return (
        <div className="OrderList">
            {orderHistory}
        </div>
    );
}