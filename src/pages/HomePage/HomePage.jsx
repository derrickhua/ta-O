import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'

import './HomePage.css'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';
import CatBar from '../../components/CategoryBar/CategoryBar';
export default function HomePage({user, categories}) {
    const [classes, setClasses] = useState([])
    const [cart, setCart] = useState(null);
    
    async function getAllClasses() {
      const classes = await classAPI.getAll();
      setClasses(classes);
    }

    useEffect(function() {
        getAllClasses()
      }, [user]);

    async function switchClassesByCat(cat) {
      const klasses = await classAPI.getAll();
      let newKlasses = klasses.filter((klass) => klass.category === cat)
      console.log(newKlasses)
      setClasses(newKlasses);
    }

    return (
        <>
            <CatBar categories={categories} switchClassesByCat={switchClassesByCat} getAllClasses={getAllClasses}/>
            <ClassCardBox user={user} classes={classes} setCart={setCart}/>
        </>
        );
  }