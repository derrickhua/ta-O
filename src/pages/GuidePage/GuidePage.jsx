import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';
// CSS related stuff
import './GuidePage.css'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export default function GuidePage({ categories, user, setUser }) {
    const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    city: '',
    category: 'Sports',
    price: 0,
    images: [],
    hours: 0,
    minutes: 0,
    });
    const [classes, setClasses] = useState([]);
    const [soldClasses, setSoldClasses] = useState([]);
    const [imgCarousel, setImgCarousel] = useState([])
    const [error, setError] = useState('');


    function makeSelect(categoryArray){
      return (
        <Form.Select name='category' onChange={handleChange} aria-label="Category">
          {categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
        </Form.Select>
      )

    }

    let selectForm = makeSelect(categories)
    
    async function getClasses() {
      const classes = await classAPI.getAllOfUser();
      let regClasses = classes.filter((klass) => klass.isPaid === false)
      let soldClasses = classes.filter((klass) => klass.isPaid === true)
      setClasses(regClasses);
      setSoldClasses(soldClasses);
    }

    useEffect(function() {
        getClasses()
      }, []);

    function handleChange(evt) {
      setNewClass({ ...newClass, [evt.target.name]: evt.target.value });
      setError('');
    }
  
    async function handleSubmit(evt) {
      // Prevent form from being submitted to the server
      evt.preventDefault();
      let duration = `${newClass.hours} hours ${newClass.minutes} minutes`
      delete newClass.hours
      delete newClass.minutes
      newClass.duration = duration
      try {
        // need to remove 2 parts due to making my own duration picker
        const theClass = await classAPI.makeClass(newClass);
        console.log(theClass)
      } catch {
        setError('New Class Making Failed - Try Again');
      }
    }


    // const [status, setStatus] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [photoPrev, setPhotoPrev] = useState(null)
    
    async function handleImgChange(evt){
        setPhoto(evt.target.files[0])
    }

    async function handleImageUpload(evt){
        evt.preventDefault()
        const data = new FormData()
        data.append('file', photo)
        classAPI.uploadImage(data).then(res => {
          let klass = newClass
          klass.images.push(res.data)
          setNewClass(klass);
          setPhotoPrev(res.data)
          setError('');
          makeImageCarousel(klass)
        })
    }

    async function makeImageCarousel(klass) {
      let carouselImages = klass.images.map((image, idx) =>
      <Carousel.Item fluid='true' key={idx}>
      <img
          className="d-block w-100 carousel-item-images"
          src={image}
          alt={`Slide # ${idx}`}
      />
      </Carousel.Item>
      );
      setImgCarousel(carouselImages)  
    }
  
    return (
      <>
      <div className='topGuidePage'>
      <div className='mb-4 green'><h2>CLASS MAKER</h2></div>
        <div className="form-container">
          <div className='resize'>
            <div className='imgUpload'>
              <Carousel variant="dark" id='carouselHero'>
                  {imgCarousel}
              </Carousel>
              <Form onSubmit={handleImageUpload} className='imgUploadForm'>
              <Form.Group className="mb-3">
                <Form.Control type="file" name="image" id="image" accept="image/*" onChange={handleImgChange}/>
              </Form.Group>
              <button className="mb-2 classMakeBtn" type='submit'>Upload</button>
              </Form>      
            </div>
          </div>

          <Form autoComplete="off" onSubmit={handleSubmit} className='classMakeForm'>
            <Form.Group className="mb-2">
            <FloatingLabel label="Class Name">
              <Form.Control type="text" name="name" value={newClass.name} onChange={handleChange} required/>
            </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-2">
            <FloatingLabel label="Description">
              <Form.Control type="text" as="textarea" rows={4} name="description" value={newClass.description} onChange={handleChange} required/>
            </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-2">
            <FloatingLabel label="City">
              <Form.Control type="text" name="city" value={newClass.city} onChange={handleChange} required/>              
            </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-2">
            <FloatingLabel label="Price">
            <Form.Control type="number" name="price" value={newClass.price} onChange={handleChange} required/>     
            </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-2">
              <span className='duration'>
              <FloatingLabel label="Hours" className='fitDuration'>
                <Form.Control type="number" name="hours"  id='duration' value={newClass.hours} onChange={handleChange} min={0} max={12} required />
              </FloatingLabel>
              <FloatingLabel label="Minutes" className='fitDuration'>
                <Form.Control type="number" name="minutes" id='duration' value={newClass.minutes} onChange={handleChange} min={0} max={59} required/>
              </FloatingLabel>
              </span>
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel label="Category">
                  {selectForm}
              </FloatingLabel>
            </Form.Group>
            <button className="mt-2 classMakeBtn" variant="outline-secondary" type="submit" onClick={getClasses}>New Class</button>
          </Form>
          <p className="error-message">&nbsp;{error}</p>
        </div>
      </div>      
    <div className='botGuidePage'>
      <h3 className='green'>My Classes</h3>
      <ClassCardBox classes={classes} user={user}/>
      <h3 className='green'>My Classes that were Bought</h3>
      <ClassCardBox classes={soldClasses} user={user}/>     
    </div>
 
      </>

    );
  }