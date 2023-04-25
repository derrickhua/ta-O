import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import './ClassDetails.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function ClassDetails({user, categories}) {
    const [specificClass, setsSpecificClass] = useState([])
    const [changeClass, setChangeClass] = useState({});

    let {id} = useParams();

    async function getClass(id) {
      const theClass = await classAPI.getById(id);
      setsSpecificClass(theClass);
    }

    useEffect(function() {
        getClass(id);
      }, [id]);    
    
    
    const [error, setError] = useState('');

    function makeSelect(categoryArray){
        return <select name='category' onChange={handleChange}>
          {categoryArray.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
    }

    let selectForm = makeSelect(categories)

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

    const navigate = useNavigate();
    const goToUserClasses = () => navigate(`/guiding`);
    async function deleteClass(id){
        try {
            await classAPI.deleteClass(id);
            goToUserClasses()
        } catch {
            setError('Class Delete Failed - Try Again');
        }
    }
    

  
    return (
    <>
    { (user !== null && user._id === specificClass.seller) &&
    <div>
    <div className="form-container">
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
    </div>
    <button onClick={()=>deleteClass(id)}>Delete THIS CLASS</button>

    <p className="error-message">&nbsp;{error}</p>
</div>          
    }    

    <div>
        <h6>{specificClass.name}</h6>
        <h6>{specificClass.description}</h6>
        <h6>{specificClass.city}</h6>
        <h6>{specificClass.price}</h6>
        <h6>{specificClass.duration}</h6>
        <h6>{specificClass.category}</h6>
        <h6>by: {specificClass.username}</h6>
    </div>
    </>
    );
  }