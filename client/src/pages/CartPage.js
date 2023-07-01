import React,{useEffect, useState} from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance,setInstance] = useState("");
  const [loading,setLoading] = useState(false);
  // const Total Price
  const totalPrice = ()=>{
    let total = 0;
    cart?.map(item => {
      total = total + item.price;
    });
    return total.toLocaleString("en-IN", {
      style:"currency",
      currency: "INR"
    });
  }
  // get payment gateway  token
  const getToken = async() => {
    try {
      const {data} = await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getToken();
  } , [auth?.token])
  // handle payment 
  const handlePayment = async()=>{
    try {
      setLoading(true);
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post('/api/v1/product/braintree/payment', {
        nonce,
        cart
      })
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders')
      toast.success("payment successful");
    } catch (error) {
      console.log(error);
    }

  }

  // delete item 
  const removeCartItem = (pid)=>{
    try {
      let mykart = [...cart];
      let index = mykart.findIndex(item=>item._id ===pid);
      mykart.splice(index,1);
      localStorage.setItem('cart' , JSON.stringify(mykart));
      setCart(mykart);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    let existingItemsInCart = localStorage.getItem('cart');
    if(existingItemsInCart)
      setCart(JSON.parse(existingItemsInCart));
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1 className="text-center bg-light p-2 mb-2">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length ? `You have ${cart.length} items in your cart 
              ${(auth?.token)? "" : "please login to checkout"}`
              :
              `Your cart is Empty`}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className="col-md-8">
            <div className="row">
              {
                cart?.map( p => (
                  <div className="row mb-2 card flex-row">
                    <div className="col-md-4">
                    <img  
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width='50px'
                />
                    </div>
                    <div className="col-md-6">
                      <p>
                        {p.name}
                      </p>
                      <p>{p.description.substring(0,20)} ...</p>
                      <p>
                        Price : ₹{p.price}
                      </p>
                      <button className="btn btn-danger mb-2" onClick={()=> removeCartItem(p._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <hr/>
            <p>
            Total | Checkout | Payment
            </p>
            <h4>Total :{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className="btn btn-outline-warning" onClick={()=>{
                    navigate('/dashboard/user/profile')
                  }}> Update Address</button>
                </div>

              </>
            
            ):(
              
            <div className="mb-3">
             {
              auth?.token ? (
                <button className="btn btn-outline-warning" onClick={()=>{
                  navigate('/dashboard/user/profile')
                }}> Update Address</button>
              ):(
                <button className='btn btn-outline-warning' onClick={()=>{
                  navigate('/login', {
                    state:'/cart',
                  })}}>
                  Please Login to Checkout
                </button>
              )
             }
            </div>
            )}
            <div className="mt-2">
              {
                !clientToken || !cart?.length ? (""):(
                  <>
                   <DropIn
               options={{
                authorization: clientToken, 
                paypal: {
                  flow:'vault',
                },
              }}
              onInstance={async(instance) => setInstance(instance)}
              />
              <button className="btn btn-primary" onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
              >
                
              {loading?"processing ..." : "Make Payment"}</button>
                  </>
                )
              }
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
