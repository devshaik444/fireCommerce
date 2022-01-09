import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

//to send user order data to firebase
import {addDoc,collection} from 'firebase/firestore'
import fireDB from '../fireConfig';
import { toast } from 'react-toastify';

function Cartpage() {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cartReducer)
    const [totalAmount, setTotalAmount] = useState(0)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name,setName]=useState('')
    const [adress,setAdress]=useState('')
    const [phone,setPhone]=useState('')
    const [pincode,setPincode]=useState('')

    const[loading,setLoading]=useState(false)

    //whenever cartItems changes local storage too,page refresh korleo jeno cart ar added product na haray
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    //product deleted from cart
    const deleteFromCart = (product) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: product })
    }

    //Amount of products
    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp = temp + cartItem.price
        })
        setTotalAmount(temp)
    }, [cartItems])

    const placeorder=async()=>{
        const useradressInfo={
            name,
            adress,
            pincode,
            phone
        }
        console.log(useradressInfo)

        const orderInfo={
            cartItems,
            useradressInfo,
            //userid and email will be fetched from local storage
            userid: JSON.parse(localStorage.getItem('currentUser')).user.uid,
            email: JSON.parse(localStorage.getItem('currentUser')).user.email
        }
        try{
            setLoading(true)
            const result=await addDoc(collection(fireDB,'orders'),orderInfo) //User order info will be saved in orders DB
            setLoading(false)
            toast.success("order placed successfully")
            handleClose()
        }catch(error){
            setLoading(false)
            toast.error("order failed");
        }
    }

    return (
        <Layout loading={loading}>
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
                        cartItems.map((item) => {
                            return <tr>
                                <td><img src={item.imageURL} alt="" height='80px' width='80px' /></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><FaTrash onClick={() => deleteFromCart(item)} /></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <div className='d-flex justify-content-end m-3'>
                <h1 className='total-amount'>Total Amont: ${totalAmount}</h1>
            </div>
            <div className='d-flex justify-content-end m-3'>
                <button className='total-amount' onClick={handleShow}>PLACE ORDER</button>
            </div>

            {/*react-bootstrap modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your adress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='register-form'>

                        <h2>User Adress</h2>

                        <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        <textarea rows="5" cols="5" type='text' className='form-control' placeholder='adress' value={adress} onChange={(e) => { setAdress(e.target.value) }}></textarea>
                        <input type='number' className='form-control' placeholder='pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }}></input>
                        <input type='number' className='form-control' placeholder='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }}></input>
                        <br />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={placeorder}>
                        Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Cartpage