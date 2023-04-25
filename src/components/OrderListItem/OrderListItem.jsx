import './OrderListItem.css';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderListItem({ order, setCart }) {
    let date = order.createdAt.replace('-', '/').split('T')[0].replace('-', '/');
    
    return (
        <div className="OrderListItem" onClick={()=> setCart(order)}>
            <div className="importantInfo">
                <span>Order Id: {order.orderId}</span> 
                <span>${order.orderTotal.toFixed(2)}</span>
            </div>
            <div className="secondaryInfo">
            <span>{date}</span><span>{order.totalQty} Items</span>
            </div>
        </div>
    );
}