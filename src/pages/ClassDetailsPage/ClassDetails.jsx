import { usespecificClass, useEffect, useState } from 'react';
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
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function ClassDetails({user, categories, setCart}) {
    const [specificClass, setsSpecificClass] = useState({
        hours: 0,
        minutes: 0
    })
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
        className="d-block w-100 h-100"
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
        return (
        <Form.Select name='category' onChange={handleChange} aria-label="Category">
            {categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
          </Form.Select>
        )
    }

    function handleChange(evt) {
        setChangeClass({ ...changeClass, [evt.target.name]: evt.target.value });
        setError('');
    }
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        let duration = `${changeClass.hours} hours ${changeClass.minutes} minutes`
        delete changeClass.hours
        delete changeClass.minutes
        changeClass.duration = duration
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
                { (!showEdit) && 
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
                }
                { (user !== null && user._id === specificClass.seller) &&
                    <>
                    {showEdit && 
                    <div className='hiddenForm'>
                        <div className="formContainer" >
                        <Form autoComplete="off" onSubmit={handleSubmit} className='classMakeForm'>
                        <Form.Group className="mb-2">
                        <FloatingLabel label="Class Name">
                        <Form.Control type="text" name="name" defaultValue={specificClass.name} onChange={handleChange} required/>
                        </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <FloatingLabel label="Description">
                        <Form.Control type="text" as="textarea" rows={4} name="description" defaultValue={specificClass.description} onChange={handleChange} required/>
                        </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <FloatingLabel label="City">
                        <Form.Control type="text" name="city" defaultValue={specificClass.city} onChange={handleChange} required/>              
                        </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <FloatingLabel label="Price">
                        <Form.Control type="number" name="price" defaultValue={specificClass.price} onChange={handleChange} required/>     
                        </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <span className='duration'>
                        <FloatingLabel label="Hours" className='fitDuration'>
                            <Form.Control type="number" name="hours"  id='duration' defaultValue={specificClass.hours} onChange={handleChange} min={0} max={12} required />
                        </FloatingLabel>
                        <FloatingLabel label="Minutes" className='fitDuration'>
                            <Form.Control type="number" name="minutes" id='duration' defaultValue={specificClass.minutes} onChange={handleChange} min={0} max={59} required/>
                        </FloatingLabel>
                        </span>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <FloatingLabel label="Category">
                            {selectForm}
                        </FloatingLabel>
                        </Form.Group>
                        <button className="mt-2 classMakeBtn" variant="outline-secondary" type="submit" onClick={()=>getClass(id)}>Edit Class</button>
                    </Form>                 
                        </div>        
                    </div> 
                    }                      
                </>
                }   

                {(user && user._id !== specificClass.seller) && 
                    <div className='contactLink'>
                        <button onClick={makeAConnection} className='contactButton'>Message Guide</button>
                    </div>
                }
                {(user && user._id === specificClass.seller) && 
                <>
                    <Button variant='outline-secondary' onClick={changeShow}>Edit</Button>
                    <Button variant='outline-secondary' onClick={()=>deleteClass(id)}>DELETE</Button>                                              
                    <p className="error-message">&nbsp;{error}</p> 
                </>
                }

            </div>
        </div>
        <div className='bottomSection'>
            <div className='classDesc'>
                <h2>Description</h2>
                <div>
                    <p>{specificClass.description}</p>
                </div>
            </div>
            { (user && user._id !== specificClass.seller) &&
                <div className='bookingSection'>   
                    <>
                        <h4>Book a Class</h4>
                        <DateTimePicker onChange={setBookingDate} value={bookingDate} />
                        <button className='bookingBtn' onClick={()=>handleAddToOrder()}>Book</button >
                    </>         
                </div> 
            }
       
                    {/* there should be a section for booking and for adding to cart */}


        </div>


    </div>

    </>
    );
  }