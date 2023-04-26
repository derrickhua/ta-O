import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import * as userService from '../../utilities/usersService'
import Button from 'react-bootstrap/Button';
import './CategoryBar.css'
export default function CatBar({categories, switchClassesByCat, getAllClasses}) {
    let categoryList = categories.map(category => (
        <>
            <Button variant="outline-secondary" 
            onClick={()=>switchClassesByCat(category)}>
                {category} 
            </Button>
        </>
    )
        
        )
    return (
        <>
            <nav className='catList'>
            <Button variant="outline-secondary" 
            onClick={getAllClasses}>
                All
            </Button>
            {categoryList}           
            </nav>
        </>

    );
}