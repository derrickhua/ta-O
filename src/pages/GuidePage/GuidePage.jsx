import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import './GuidePage.css'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';

export default function GuidePage({ categories, user, setUser }) {
    const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    city: '',
    duration: '',
    category: 'Sports',
    price: 0,
    images: '',
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
      try {
        const theClass = await classAPI.makeClass(newClass);
        console.log(theClass)
      } catch {
        setError('New Class Making Failed - Try Again');
      }
    }


    // const [status, setStatus] = useState(null)
    const [photo, setPhoto] = useState(null)
    async function handleImgChange(evt){
        setPhoto(evt.target.files[0])
    }

    async function handleImageUpload(evt){
        evt.preventDefault()
        const data = new FormData()
        data.append('file', photo)
        classAPI.uploadImage(data).then(res => {
          setNewClass({ ...newClass, images: res.data });
          setError('');
        })
    }
  
    return (
      <>
      <div>

        <div className="form-container">
        <form onSubmit={handleImageUpload}>
                  <div>
                      <input type="file" name="image" id="image" accept="image/*" onChange={handleImgChange} />
                      <button type="submit" >Upload</button>
                  </div>
          </form>
          <form autoComplete="off" onSubmit={handleSubmit}>
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
            <input type="text" name="duration" value={newClass.duration} onChange={handleChange} required />
            <label>Category</label>
            {selectForm }
            <label>Images</label>
            <button type="submit" onClick={getClasses} >Make New Class</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>      
      
      <h1>My Classes</h1>
      <ClassCardBox classes={classes} user={user}/>
      <h1>My Classes that were Bought</h1>
      <ClassCardBox classes={soldClasses} user={user}/>
      </>

    );
  }