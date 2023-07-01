import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-light p-1 text-black text-center">ABOUT US</h1>
          <p className="text-justify mt-4">
            Welcome to our shopping app, your go-to destination for all your
            shopping needs. We are a dedicated team of enthusiasts who are here
            to make your shopping experience extraordinary. At our core, we are
            committed to providing you with a seamless and delightful shopping
            journey. Our mission is to bring you a carefully curated selection
            of products that combine quality, style, and affordability.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
