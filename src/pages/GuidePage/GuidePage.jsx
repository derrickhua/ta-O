import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';
// CSS related stuff
import './GuidePage.css'
import Button from 'react-bootstrap/Button';

export default function GuidePage({ categories, user, setUser }) {
    const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    city: '',
    category: 'Sports',
    price: 0,
    images: [],
    });
    const [classes, setClasses] = useState([]);
    const [soldClasses, setSoldClasses] = useState([]);
    const [error, setError] = useState('');


    function makeSelect(categoryArray){
      return <select name='category' onChange={handleChange}>
        {categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
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
        })
    }
  
    return (
      <>
      <div className='topGuidePage'>

        <div className="form-container">
          <div className='imgUpload'>
            <div className='previewImg'>
                <img src={photoPrev} alt='Preview'></img>
            </div>
            <form onSubmit={handleImageUpload} className='imgUploadForm'>
                    <input type="file" name="image" id="image" accept="image/*" onChange={handleImgChange} />
                    <Button variant="outline-secondary" type='submit'>Upload</Button>
            </form>            
          </div>

          <form autoComplete="off" onSubmit={handleSubmit} className='classMakeForm'>
            <label>Class Name</label>
            <input type="text" name="name" value={newClass.name} onChange={handleChange} required />
            <label>Description</label>
            <input type="text" name="description" value={newClass.description} onChange={handleChange} required />
            <label>City</label>
            <input type="text" name="city" value={newClass.city} onChange={handleChange} required />
            <label>Price</label>
            <input type="number" name="price" value={newClass.price} onChange={handleChange} required />
            {/* in the future import html duration picker */}
            <label>Duration</label>
            <span className='durationPicker'>
            <input type="number" name="hours" id='duration' defaultValue={0} onChange={handleChange} min={0} max={12} required/> hrs
            <input type="number" name="minutes" id='duration' defaultValue={0} onChange={handleChange} min={0} max={59} required/> mins
            </span>
            <label>Category</label>
            {selectForm }
            <Button variant="outline-secondary" type="submit" onClick={getClasses}>Make New Class</Button>
          </form>
          <p className="error-message">&nbsp;{error}</p>
        </div>
      </div>      
    <div className='botGuidePage'>
      <h3>My Classes</h3>
      <ClassCardBox classes={classes} user={user}/>
      <h3>My Classes that were Bought</h3>
      <ClassCardBox classes={soldClasses} user={user}/>     
    </div>
 
      </>

    );
  }