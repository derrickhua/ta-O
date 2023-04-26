import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom"
import * as ordersAPI from '../../utilities/ordersApi'
import './ClassCard.css'
export default function ClassCard({user, specificClass, setCart}) {

    const navigate = useNavigate();
    const goToDetails = () => navigate(`/class/${specificClass._id}`)

    async function handleAddToOrder(specClass) {
      try {
        const cart = await ordersAPI.addItemToCart(specClass);
        setCart(cart);        
      } catch(err) {
        console.log(err)
      }

    }

    return (
          <Card
          bg='light'
          key='Light' 
          style={{ width: '15rem', margin:'10px'}}
          >
          <Card.Img variant="top" src={specificClass.images} />
          <Card.Body>
            <Card.Title className='name' onClick={goToDetails}><h3>{specificClass.name}</h3> <h6>${specificClass.price.toFixed(2)}</h6></Card.Title>
            <Card.Text className='sellername'>
              <span><h6>by {specificClass.username}</h6> </span> 
              {(user && user._id !== specificClass.seller) && <Button variant="dark" onClick={()=>handleAddToOrder(specificClass)}>+</Button>}
            </Card.Text>
            <Card.Text className='description'>
            </Card.Text>
          </Card.Body>
        </Card>      
    );
  }