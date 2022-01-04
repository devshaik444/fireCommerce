import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';

function Cartpage() {
    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cartReducer)
    const [totalAmount,setTotalAmount]=useState(0)

    //whenever cartItems changes local storage too,page refresh korleo jeno cart ar added product na haray
    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])

    //product deleted from cart
    const deleteFromCart=(product)=>{
        dispatch({type:'DELETE_FROM_CART',payload:product})
    }

    //Amount of products
    useEffect(()=>{
        let temp=0;
        cartItems.forEach((cartItem)=>{
            temp=temp+cartItem.price
        })
        setTotalAmount(temp)
    },[cartItems])
    
    return (
        <Layout>
            <table className='table mt-3'> {/*style will be done by boostrap*/}
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item)=>{
                            return <tr>
                                <td><img src={item.imageURL} alt="" height='80px' width='80px'/></td>      
                                <td>{item.name}</td>    
                                <td>{item.price}</td>   
                                <td><FaTrash onClick={()=>deleteFromCart(item)}/></td>                     
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <div className='d-flex justify-content-end m-3'>
                <h1 className='total-amount'>Total Amont: ${totalAmount}</h1>
            </div>
            <div className='d-flex justify-content-end m-3'>
                <button className='total-amount'>PLACE ORDER</button>
            </div>
        </Layout>
    )
}

export default Cartpage