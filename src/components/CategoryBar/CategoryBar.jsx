import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import * as userService from '../../utilities/usersService'
import './CategoryBar.css'
export default function CatBar({categories}) {
    let categoryList = categories.map(category => (
        <>
            <div>{category}</div> 
            &nbsp; | &nbsp;  
        </>
    )
        
        )
    return (
        <>
            <nav className='catList'>
            {categoryList}           
            </nav>
        </>

    );
}