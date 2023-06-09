import Button from 'react-bootstrap/Button';
import './CategoryBar.css'

export default function CatBar({categories, switchClassesByCat, getAllClasses}) {
    let categoryList = categories.map((category, idx) => (
            <Button variant="outline-secondary" 
            onClick={()=>switchClassesByCat(category)} key={idx}>
                
                {category} 
            </Button>
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