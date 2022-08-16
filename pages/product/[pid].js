import Preloader from 'components/preLoader';
import { BASE_URL } from 'helper/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const ProductDetails = (props) => {
    const [quantity, setQuantity] = useState(1);
   const routes = useRouter();
   const {details} = props;
   const modalRef = useRef(null);

   const handleChangeQuantity = (e)=>{
    const {value} = e.target;
    setQuantity(value);
   }

   const handleSubmit = (e)=>{
        e.preventDefault();
   }

   useEffect(()=>{
    M.Modal.init(modalRef.current);
   },[])

   const handleDeleteProduct = async ()=>{
        const URL = `/api/product/${details._id}`;
        try{
            console.log('the url ', URL);
            const response = await fetch(URL,{
                method:"DELETE"
            });
            const data = await response.json();
            M.toast({html: 'Success', classes:'green'});
            routes.push('/');
        } catch (error ){
            console.log({error});
        }
   }

   const handleModalClose = ()=>{
        modalRef.current?.close();
   }

   const Modal = ()=>{
    return (
        <div id="modal1" className="modal" ref={modalRef}>
            <div className="modal-content">
            <h4>{details.name}</h4>
            <p>Are you sure you want to delete this product</p>
            </div>
            <div className="modal-footer">
            <div className='row'  >
            <button className={`btn waves-effect waves-light green`} style={{marginRight:15}} type="submit" onClick={handleDeleteProduct} name="action">Yes
                <i className="material-icons right">check</i>
            </button>
            <button className={`btn waves-effect waves-light red`} type="submit" onClick={handleModalClose} name="action">No
            <i className="material-icons right">clear</i>
            </button>
            </div>
            </div>
        </div>
    )
   }

   if(routes.isFallback){
    return (
       <Preloader />
    )
   }
  return (
    <div style={{marginTop:"50px", width:"550px", margin:"50px auto"}} >
               {
                details &&  
                <div className="container center-align" >
                    <div>
                        <Image src={details.mediaUrl} blurDataURL={details.mediaUrl} height={250} width={300} fill="responsive" placeholder='blur' alt="product-image"/>
                    </div>
                    <div>
                        <b> Rs. {details.price} | {details.name}</b>
                    </div>
                    <div>
                        <p>{details.description} </p>
                    </div>
                    <div className="row" style={{
                        display: 'flex',
                        justifyContent: "space-evenly",
                        alignItems: 'center',
                        }}>
                        <div className="input-field focused" style={{width:"50%"}}>
                        <input id="quantity" value={quantity} type="number" min="1"  onChange={handleChangeQuantity} />
                        <label htmlFor="quantity" className='active'>Quantity</label>
                        </div>
                        <button className={`btn waves-effect waves-light`} type="submit" onClick={handleSubmit} name="action">Add
                        <i className="material-icons right">add</i>
                        </button>
                    </div>
                    <button data-target="modal1" className={`btn modal-trigger waves-effect waves-light red`}>Delete
                        <i className="material-icons right">delete</i>
                    </button>
                    {
                        Modal()
                    }
                    
                </div>
               }
    </div>
  )
}

export default ProductDetails;


export const getStaticPaths = ()=>{
    return {
        paths: [],
        fallback: true, 
    }
}

export const getStaticProps = async (context)=>{
    const { pid } = context.params;
    const url = BASE_URL + `/api/product/${pid}`;
    const response = await fetch(url);
    const details = await response.json();

    if(details.error){
        return {
            redirect:{
                destination:'/',
                permanent:false
            },
        }
    }

    return {
        props:{
            details: details.productDetails
        },
        revalidate:5,
    }
}