import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
//firebaseDb
import { getDoc, doc } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';

function Productinfo() {

    const [product, setProduct] = useState();
    const params = useParams()  //to get product id from url
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        getdata();
    }, [])

    async function getdata() {
        try {
            setLoading(true);
            const productTemp = await getDoc(doc(fireDB, 'products', params.productid));

            setLoading(false);
            setProduct(productTemp.data());
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout loading={loading}>
            {/*id product is present then do something*/}
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                {product &&
                    (<div>
                        <p><b>{product.name}</b></p>
                        <img src={product.imageURL} alt='' className='product-info-img' />
                        <hr />
                        <p>{product.description}</p>
                        <div className='d-flex justify-content-end my-4'>
                            <button>ADD TO CART</button>
                        </div>
                    </div>)}
                </div>              
              </div>
            </div>
        </Layout>
    )
}

export default Productinfo
