import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as classAPI from '../../utilities/classesApi'
import * as ordersAPI from '../../utilities/ordersApi'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {makeConnection} from '../../utilities/usersApi'
import './ClassDetails.css'
import Button from 'react-bootstrap/Button';

export default function ClassDetails({user, categories, setCart}) {
    const [specificClass, setsSpecificClass] = useState([])
    const [changeClass, setChangeClass] = useState({});
    const [showEdit, setShowEdit] = useState(false)
    const [bookingDate, setBookingDate] = useState(new Date())
    const [error, setError] = useState('');
    const navigate = useNavigate();    
    const goToUserClasses = () => navigate(`/guiding`);
    const goToMessages = () => navigate(`/messages`);    

    let {id} = useParams();
    let selectForm = makeSelect(categories)

    async function getClass(id) {
      const theClass = await classAPI.getById(id);
      setsSpecificClass(theClass);
    }

    useEffect(function() {
        getClass(id);
      }, [id]);    
    
    
    function makeSelect(categoryArray){
        return <select name='category' onChange={handleChange}>
          {categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
    }

    function handleChange(evt) {
        setChangeClass({ ...changeClass, [evt.target.name]: evt.target.value });
        setError('');
    }
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
        const theClass = await classAPI.updateClass(id, changeClass);
        } catch {
        setError('Class update Failed - Try Again');
        }
    }

    async function deleteClass(id){
        try {
            await classAPI.deleteClass(id);
            goToUserClasses()
        } catch {
            setError('Class Delete Failed - Try Again');
        }
    }
    
    function changeShow() {
        if (showEdit) {
            setShowEdit(false)
        } else {
            setShowEdit(true)
        }
    }

    function makeAConnection() {
        makeConnection({ firstUser: user._id, secondUser: specificClass.seller }).then(res => {
            console.log(res)
            goToMessages();
        })
    }    

    async function handleAddToOrder() {
        let classData = {}
        classData.date = bookingDate
        classData.klass = specificClass
        try {  
        const cart = await ordersAPI.addItemToCart(classData);
        setCart(cart);        
        } catch(err) {
            console.log(err)
        }
    }

  
    return (
    <>
    <div className='classDetailsPage'>
        <div className='classDetails'>
            <img src={specificClass.images} style={{margin: "0px 20px"}}></img>
            <div style={{margin: "20px auto"}}>
                <h6>Class Name: {specificClass.name}</h6>
                <h6>Description: {specificClass.description}</h6>
                <h6>City: {specificClass.city}</h6>
                <h6>Price: ${specificClass.price}</h6>
                <h6>Duration: {specificClass.duration}</h6>
                <h6>Category: {specificClass.category}</h6>
                <h6>by: {specificClass.username}</h6>
            </div>

        </div>
    {/* 
        this section will be dedicated to making contact with the seller/guide
        the inquiry button should then send this person to the messenger page and open a tab where
        user and this person share a chat
    */}
    {user && 
    <div className="inquiry">
        <br />
        <Button onClick={makeAConnection}>Contact Seller</Button>
        <br />
        <br />
    </div>    
    }

        { (user !== null && user._id === specificClass.seller) &&
            <>
        <div className='hiddenForm'>

            {showEdit && 
                <div className="formContainer" >
                    <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Class Name</label>
                    <input type="text" name="name" placeholder={specificClass.name} onChange={handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" placeholder={specificClass.description} onChange={handleChange}/>
                    <label>City</label>
                    <input type="text" name="city" placeholder={specificClass.city} onChange={handleChange}/>
                    <label>Price</label>
                    <input type="number" name="price" placeholder={specificClass.price} onChange={handleChange}/>
                    {/* in the future import html duration picker */}
                    <label>Duration</label>
                    <input type="text" name="duration" placeholder={specificClass.duration} onChange={handleChange}/>
                    <label>Category</label>
                    {selectForm}
                    <button type="submit" onClick={()=>getClass(id)}>Change Class</button>
                    </form>
                    <p className="error-message">&nbsp;{error}</p>                        
                </div>        

            }
            
        </div>             
        <Button variant='outline-secondary' onClick={changeShow}>Edit</Button>
        <Button variant='outline-secondary' onClick={()=>deleteClass(id)}>DELETE</Button>            
        </>
        }   

        {/* there should be a section for booking and for adding to cart */}
        {   (user !== null && user._id !== specificClass.seller) && 
        <>
            <DateTimePicker onChange={setBookingDate} value={bookingDate} />
            <button onClick={()=>handleAddToOrder()}>Book a Class</button>
        </>
        }
    </div>

    </>
    );
  }