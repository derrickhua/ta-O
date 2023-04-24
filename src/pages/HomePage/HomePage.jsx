import { useState, useEffect } from 'react';
import * as classAPI from '../../utilities/classesApi'
import * as ordersAPI from '../../utilities/ordersApi';

import './HomePage.css'
import ClassCardBox from '../../components/ClassCardBox/ClassCardBox';
import CatBar from '../../components/CategoryBar/CategoryBar';
export default function HomePage({user, categories}) {
    const [classes, setClasses] = useState([])
    const [cart, setCart] = useState(null);
    useEffect(function() {
        async function getAllClasses() {
          const classes = await classAPI.getAll();
          setClasses(classes);
        }
        getAllClasses()
      }, [user]);

      async function handleAddToOrder(classId) {
        const cart = await ordersAPI.addItemToCart(classId);
        setCart(cart);
      }

    return (
        <>
            <CatBar categories={categories} />
            <ClassCardBox user={user} classes={classes}/>
        </>
        );
  }