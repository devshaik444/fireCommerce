import React, { useEffect, useState } from 'react'

//Layout will be used as parent element
import Layout from '../components/Layout'
//firebaseDb
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';

import { fireproducts } from '../firecommerce-products'; //Demo Data
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function Homepage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cartReducer)
    const navigate = useNavigate()

    //for searching product
    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFiltertype] = useState('')

    useEffect(() => {
        getdata();
    }, [])

    //to get the data from firebase
    async function getdata() {

        try {
            setLoading(true);
            const users = await getDocs(collection(fireDB, "products"));
            //To get all users in Array format
            const productsArray = [];
            users.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                productsArray.push(obj);
                setLoading(false);
            });
            setProducts(productsArray);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //whenever cartItems changes local storage too,page refresh korleo jeno cart ar added product na haray
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    //Product will be added to cart
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    }



    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className='d-flex w-50 '>
                    <input type="text" value={searchkey} onChange={(e) => { setSearchkey(e.target.value) }} className="form-control" placeholder='search items' />
                    <select value={filterType} onChange={(e) => { setFiltertype(e.target.value) }} className="form-control mt-3">
                        <option value="">All</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="fine">Fine</option>
                    </select>
                </div>
                <div className='row'>
                    {products.filter((obj)=>obj.name.toLowerCase().includes(searchkey)).filter((obj)=>obj.category.includes(filterType)).map((product) => {  //after filtering product, mapping will be done
                        return <div className='col-md-4 '>
                            <div className='m-2 p-1 product position-relative'> {/*m-2= margin 2 and p-1=padding 1 power of boostrap*/}
                                <div className='product-content'>
                                    <p>{product.name}</p>
                                    <div className='text-center'>
                                        <img src={product.imageURL} alt="" className='product-img' />
                                    </div>
                                </div>
                                <div className='product-actions'>
                                    <h2>${product.price}</h2>
                                    <div className='d-flex'>
                                        <button className='mx-2' onClick={() => addToCart(product)}>ADD TO CART</button> {/*mx-2 = margin from x 2px */}
                                        <button onClick={() => {
                                            navigate(`/productinfo/${product.id}`)
                                        }}>VIEW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>

        </Layout>

    )
}

export default Homepage
