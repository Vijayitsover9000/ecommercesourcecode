import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi';
const Contact = () => {
  return (
    <Layout>
        <div className = "row contactus">
          <div className="col-md-6">
            <img
              src='/images/contactus.jpeg'
              alt='contactus'
              style = {{width:"100%"}}
              />
          </div>
          <div className="col-md-4">
            <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
            <p className="text-justify mt-2">
              any query and info about our products ?
              Don't feel free to call anytime we 24X7 ! available.
            </p>
            <p className="mt-3">
              <BiMailSend/> : www.help@e-commerceapp.com
            </p>
            <p className="mt-3">
              <BiPhoneCall/> : +91 3330938589
            </p>
            <p className="mt-3">
              <BiSupport/> : 1800 0000 3290 (toll-free)
            </p>
          </div>
          

        </div>
    </Layout>
  )
}

export default Contact