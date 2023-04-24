import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom"

export default function ClassCard({user, specificClass}) {


    const navigate = useNavigate();
    const goToDetails = () => navigate(`/class/${specificClass._id}`)

    return (
          <Card
          bg='light'
          key='Light' 
          style={{ width: '18rem', margin:'10px'}}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title className='name'><h3>{specificClass.name}</h3></Card.Title>
            <Card.Text className='sellername'><h6>{specificClass.username}</h6></Card.Text>
            <Card.Text className='description'>
              {specificClass.description}
            </Card.Text>
            <Button variant="dark" onClick={goToDetails}>Go to Details</Button>
          </Card.Body>
        </Card>      
    );
  }