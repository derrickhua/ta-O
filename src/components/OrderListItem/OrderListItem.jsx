import './OrderListItem.css';

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderListItem({ order, setCart }) {
    let date = order.createdAt.replace('-', '/').split('T')[0].replace('-', '/');
    
    return (
        <div className="OrderListItem" onClick={()=> setCart(order)}>
            <div className="importantInfo">
                <span>Order Id: {order.orderId}&nbsp;&nbsp;</span> 
            </div>
            <div className="secondaryInfo">
            <span>{date}</span>
            </div>
        </div>
    );
}