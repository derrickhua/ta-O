
import * as classAPI from '../../utilities/classesApi'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {updateUser, logOut} from '../../utilities/usersService'
import {deleteUser} from '../../utilities/usersApi'
import Button from 'react-bootstrap/Button';
import './AccountDetails.css'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function AccountDetailsPage({user, setUser}) {
    const [userUpdate, setUserUpdate] = useState(user);
    const [showEdit, setShowEdit] = useState(false)
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

    function changeShow() {
        if (showEdit) {
            setShowEdit(false)
        } else {
            setShowEdit(true)
        }
    }

    return (
        <div className='accountPage'>
            <div className='pageTitle'>
                <h2>Account Info</h2>
            </div>
            <div className='accountInfo'>   
                <div className='accountDetails'>
                    {
                        !showEdit && 
                        <>
                            <div className='name editSeparate'>
                                <div>
                                    <div>User Name</div>
                                    <div className='userInfo'>{user.name}</div>                            
                                </div>
                            </div>
                            <br/>
                            <hr />
                            <br/>
                            <div className=' email editSeparate'>
                                <div>
                                    <div>Email Address</div>
                                    <div className='userInfo'>{user.email}</div>                          
                                </div>
                            </div>
                            <br/>
                            <hr />
                            <br/>
                            <div className=' phoneNumber editSeparate'>
                                <div>
                                    <div>Phone Number</div>
                                    <div className='userInfo'>{user.phoneNumber}</div>                      
                                </div>
                            </div>
                            <br/>
                            <hr />
                            <br/>
                            <div className=' description editSeparate'>
                                <div>
                                    <div>Description</div>
                                    <div className='userInfo'>{user.description}</div>                  
                                </div>
                            </div>    
                            <br/>
                            <hr />
                            <br/>                          
                        </>
                        
                    }
                    {
                        showEdit && 
                        <>
                        <div>
                        <div>
                            <Form autoComplete="off" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={user.name} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" defaultValue={user.email} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phoneNumber" defaultValue={user.phoneNumber} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description"  as="textarea" rows={4} defaultValue={user.description} onChange={handleChange} />
                            </Form.Group>
                            <span>
                            <button className='suBtn' type="submit" >Edit Account</button>
                            </span>
                                
                            </Form>
                            </div>
                            <p className="error-message">&nbsp;{error}</p>
                            </div>
                        </>
                    }
           
                </div>
                <div className='separateSection'>
                    {
                        !showEdit && 
                        <div className='imageHolder'>
                            <img src={user.profileImg} alt='Profile' />
                            
                        </div>                       
                    }
                    {
                        showEdit && 
                        <>
                        <div className="formContainer" >
                            <div className='profileImgUpload'>
                                <div className='previewImg'>
                                    <img src={photoPrev} alt='Preview'></img>
                                </div>
                                <form onSubmit={handleImageUpload} className='imgUploadForm'>
                                        <input type="file" name="profileImg" id="image" accept="image/*" onChange={handleImgChange} />
                                        <Button variant="outline-secondary" type='submit'>Upload</Button>
                                </form>            
                            </div>
                            <p className="error-message">&nbsp;{error}</p>                        
                        </div> 
                        </>
                    }

                    <span className='crudArea'>
                        <button className='crudButton' onClick={changeShow}>Edit</button>     
                        <button className='crudButton' onClick={()=>handleDelete}>DELETE</button>     
                    </span>
           
                </div>

            </div>



           
        </div>
        );
  }