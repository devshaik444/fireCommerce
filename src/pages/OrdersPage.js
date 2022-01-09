import React from 'react'
import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import Layout from '../components/Layout';
function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getdata();
    }, [])

    async function getdata() {

        try {
            setLoading(true);
            const result = await getDocs(collection(fireDB, "orders"));
            //To get all users in Array format
            const ordersArray = [];
            result.forEach((doc) => { //loop through o
                ordersArray.push(doc.data());
                setLoading(false);
            });
            setOrders(ordersArray);
            console.log(ordersArray)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return <Layout loading={loading}>
        {
            orders.map((order) => {
                return <table className='table mt-3'> {/*style will be done by boostrap*/}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.cartItems.map((item) => {
                                return <tr>
                                    <td><img src={item.imageURL} alt="" height='80px' width='80px' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            })
        }
    </Layout>


}

export default OrdersPage
