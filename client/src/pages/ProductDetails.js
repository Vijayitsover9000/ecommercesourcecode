import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // related-product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //initial Product details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          {product._id ? (
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top h-10 w-10"
              alt={product.name}
              width="250px"
            />
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <p>Name : {product.name}</p>
          <p>{product.description}</p>
          <p>Price : {product.price}</p>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr/>
      <div className="row container">
        <h5>Similar Products</h5>{relatedProducts.length<1 && (<p className="text-center">No Similar Product Found</p>)}
        <div className="d-flex flex-row">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  {p.description.length < 40
                    ? p.description
                    : p.description.slice(0, 40) + "..."}
                </p>
                <p className="card-text">₹ {p.price}</p>
                {/* <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`product/${p.slug}`)}
                >
                  More Details
                </button> */}
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
