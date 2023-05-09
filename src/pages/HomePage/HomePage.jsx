import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import './HomePage.css'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';
import CatBar from '../../components/CategoryBar/CategoryBar';
export default function HomePage({user, categories, getAllClasses, classes, setClasses, searched, cart, setCart}) {

    
    useEffect(function() {
      if (searched.length === 0){
       getAllClasses()  
      }
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