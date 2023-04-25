import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import * as userService from '../../utilities/usersService'
import './CategoryBar.css'
export default function CatBar({categories, switchClassesByCat, getAllClasses}) {
    let categoryList = categories.map(category => (
        <>
            <div onClick={()=>switchClassesByCat(category)}>{category}</div> 
            &nbsp; | &nbsp;  
        </>
    )
        
        )
    return (
        <>
            <nav className='catList'>
            <div onClick={getAllClasses}>All</div> 
            &nbsp; | &nbsp;  
            {categoryList}           
            </nav>
        </>

    );
}