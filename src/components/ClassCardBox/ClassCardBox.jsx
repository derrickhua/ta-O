import './ClassCardBox.css'
import ClassCard from '../ClassCard/ClassCard'


export default function ClassCardBox({user, classes}) {
    const classesBox = classes.map((specificClass, idx) => (
        <ClassCard
        key={idx}
        user={user}
            specificClass={specificClass}               
        />
    )
    ) 
    return (
    <main className="ClassCardBox">
        {classesBox}
    </main>
    );
  }