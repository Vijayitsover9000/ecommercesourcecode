import React from 'react'
import Layout from '../components/Layout/Layout'
const Policy = () => {
  return (
    <Layout>
    <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="privacy policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-4">
            Add Privacy Policy
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy