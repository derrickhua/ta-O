import { useNavigate } from 'react-router-dom';
import LineItem from '../LineItem/LineItem'
// Used to display the details of any order, including the cart (unpaid order)
import './OrderDetail.css'
import Button from 'react-bootstrap/Button';


export default function OrderDetail({ order, handleCheckout }) {
  const navigate = useNavigate();

  if (!order) return null;
  const lineClasses = order.classes.map(specificClass =>
    <LineItem
      goToDetails={()=> navigate(`/class/${specificClass.item._id}`)}
      specificDate={specificClass.date}
      specificClass={specificClass.item}
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
        <span>  {new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className='lineClassDiv'>
        {lineClasses.length ?
          <div className='lineClassHistory'>
            <div>
              {lineClasses}
            </div>
            
            <section className="total">
              {order.isPaid ?
                <div className='orderTotal'>
                  <span className="right">TOTAL</span><span>${order.orderTotal}</span>
                </div>
                
                :
                <>
                <span className="right">TOTAL: ${order.orderTotal}</span>
                <Button
                  className="btn-sm"
                  variant='outline-secondary'
                  onClick={handleCheckout}
                  disabled={!lineClasses.length}
                >CHECKOUT</Button>                
                </>

              }
            </section>
          </div>
          :
          <div>Get out of your comfort zone!</div>
        }
      </div>
    </div>
  );
}