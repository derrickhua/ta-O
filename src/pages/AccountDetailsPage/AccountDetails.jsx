import './AccountDetails.css'
import * as classAPI from '../../utilities/classesApi'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {updateUser, logOut} from '../../utilities/usersService'
import {deleteUser} from '../../utilities/usersApi'
import Button from 'react-bootstrap/Button';


export default function AccountDetailsPage({user, setUser}) {
    const [userUpdate, setUserUpdate] = useState(user);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(evt) {
        setUserUpdate({ ...userUpdate, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
        const userUpdated = await updateUser(userUpdate)
        setUser(userUpdated)
        } catch {
        setError('User update Failed - Try Again');
        }
    }

    async function handleDelete(evt) {
        evt.preventDefault()
        try {
            deleteUser()
            logOut();
            navigate(`/`)
            setUser(null);
        } catch {
            setError('User Delete Failed - Try Again');
        }
    }

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
          setPhotoPrev(res.data)
          setUserUpdate({ ...userUpdate, profileImg: res.data });
          setError('');
        })
    }

    return (
        <div className='accountPage'>
            <div className='pageTitle'>
                <h2>Account Info</h2>
            </div>
            <div className='accountInfo'>   
                <div className='accountDetails'>
                    <div className='name editSeparate'>
                        <div>
                            <div>User Name</div>
                            <div className='userInfo'>{user.name}</div>                            
                        </div>
                        <button className='edit'>Edit</button>
                    </div>
                    <br/>
                    <hr />
                    <br/>
                    <div className=' email editSeparate'>
                        <div>
                            <div>Email Address</div>
                            <div className='userInfo'>{user.email}</div>                          
                        </div>
                        <button className='edit'>Edit</button>
                    </div>
                    <br/>
                    <hr />
                    <br/>
                    <div className=' phoneNumber editSeparate'>
                        <div>
                            <div>Phone Number</div>
                            <div className='userInfo'>{user.phoneNumber}</div>                      
                        </div>
                        <button className='edit'>Edit</button>
                    </div>
                    <br/>
                    <hr />
                    <br/>
                    <div className=' description editSeparate'>
                        <div>
                            <div>Description</div>
                            <div className='userInfo'>{user.description}</div>                  
                        </div>
                        <button className='edit'>Edit</button>
                    </div>    
                    <br/>
                    <hr />
                    <br/>             
                </div>
                <div className='imageHolder'>
                    <img src={user.profileImg} alt='Profile' />
                </div>
            </div>

            <div className="formContainer" >
                <div className='imgUpload'>
                    <div className='previewImg'>
                        <img src={photoPrev} alt='Preview'></img>
                    </div>
                    <form onSubmit={handleImageUpload} className='imgUploadForm'>
                            <input type="file" name="profileImg" id="image" accept="image/*" onChange={handleImgChange} />
                            <Button variant="outline-secondary" type='submit'>Upload</Button>
                    </form>            
                </div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                <label>User Name</label>
                <input type="text" name="name" placeholder={user.name} onChange={handleChange} />
                <label>Email Address</label>
                <input type="text" name="email" placeholder={user.email} onChange={handleChange}/>
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" placeholder={user.phoneNumber} onChange={handleChange}/>
                <label>Description</label>
                <input type="text" name="description" placeholder={user.description} onChange={handleChange}/>
                <button type="submit">Change User</button>
                </form>
                <p className="error-message">&nbsp;{error}</p>                        
            </div> 

            <div className="formContainer" >
                    <form autoComplete="off" onSubmit={handleDelete}>
                    <button type="submit">Delete User</button>
                    </form>
                    <p className="error-message">&nbsp;{error}</p>                        
            </div>  
            
           
        </div>
        );
  }