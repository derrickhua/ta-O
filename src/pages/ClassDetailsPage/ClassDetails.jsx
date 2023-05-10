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
import Carousel from 'react-bootstrap/Carousel';

export default function ClassDetails({user, categories, setCart}) {
    const [specificClass, setsSpecificClass] = useState([])
    const [changeClass, setChangeClass] = useState({});
    const [showEdit, setShowEdit] = useState(false)
    const [carousel, setCarousel] = useState([])
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
    let carouselImages = theClass.images.map((image, idx) =>
    <Carousel.Item fluid>
    <img
        className="d-block w-100 h-100 rounded"
        src={image}
        alt={`Slide # ${idx}`}
    />
    </Carousel.Item>
    );
    setCarousel(carouselImages)  
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
        <div className='titleAndName'><h2>{specificClass.name}</h2><h4>by {specificClass.username}</h4></div>
        <div className='classDetailsSection'>
            <Carousel variant="dark">
                {carousel}
            </Carousel>
            <div className='infoContainer'>
                <div className='classInfo'>
                    <div>
                        <h6>City</h6>
                        <h7>{specificClass.city}</h7>
                    </div>
                    <div>
                        <h6>Price</h6>
                        <h7>${specificClass.price}</h7>
                    </div>
                    <div>
                        <h6>Duration</h6>
                        <h7>{specificClass.duration}</h7>
                    </div>
                    <div>
                        <h6>Category</h6>
                        <h7>{specificClass.category}</h7>
                    </div>          
                </div>
                <div className='contactLink'>
                
                {user &&  <button onClick={makeAConnection} className='contactButton'>Message Guide</button>}
                </div>
            </div>
        </div>
        <div className='bottomSection'>
            <div className='classDesc'>
                <h2>Description</h2>
                <div>
                    <p>{specificClass.description}</p>
                </div>
            </div>
            <div className='bookingSection'>
                {(user !== null && user._id !== specificClass.seller) && 
                <>
                    <h4>Book a Class</h4>
                    <DateTimePicker onChange={setBookingDate} value={bookingDate} />
                    <button className='bookingBtn' onClick={()=>handleAddToOrder()}>Book</button >
                </>
                }            
            </div>        
                    {/* there should be a section for booking and for adding to cart */}


        </div>

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

    </div>

    </>
    );
  }