import LineItem from '../LineItem/LineItem'
// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({ order, handleCheckout }) {
  if (!order) return null;
  console.log(order)
  const lineClasses = order.classes.map(specificClass =>
    <LineItem
      specificClass={specificClass}
      isPaid={order.isPaid}
      key={specificClass._id}
    />
  );

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        {order.isPaid ?
          <span>ORDER <span className="smaller">{order.orderId}</span></span>
          :
          <span>NEW ORDER</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div>
        {lineClasses.length ?
          <>
            {lineClasses}
            <section className="total">
              {order.isPaid ?
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                :
                <button
                  className="btn-sm"
                  onClick={handleCheckout}
                  disabled={!lineClasses.length}
                >CHECKOUT</button>
              }
              <span>{order.totalQty} Classes</span>
              <span className="right">${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div>Get out of your comfort zone!</div>
        }
      </div>
    </div>
  );
}