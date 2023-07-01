import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState(null);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id,setId] = useState("");
    
    // get single product
    const getSingleProduct = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
              
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    // get all categories
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/categories");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };
    useEffect(() => {
        getAllCategories();
    }, []);
    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, []);
  
    // create product function
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
        productData.append("shipping", shipping);
        const { data } = axios.put(`/api/v1/product/update-product/${id}`, productData);
        if(data?.success){
          toast.error(data?.message);
        }else{
          toast.success("product Updated successfully");
          navigate('/dashboard/admin/products');
        }
      } catch (error) {
        console.log(error);
        toast.error("cant create product currently");
      }
    };
// delete a product

    const handleDelete = async()=>{
        try {
            let answer = window.prompt("Are you sure you want to delete ?");
            if(!(answer==="yes" || answer==="YES")) return;
            const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if(data?.success){
                toast.success("Product deleted Successfully");
                navigate('/dashboard/admin/products');
            }
            
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }
    return (
      <Layout title={"Dashboard - Update Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-50">
                <form onSubmit={handleUpdate}>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-2"
                    onChange={(value) => setCategory(value)}
                    value={category}
                  >
                    {categories?.map((c) => (
                      <Option key="c._id" value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-2">
                    <label className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-2">
                    {photo?(
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product"
                          height="200px"
                          className="img img-responsive"
                        />
                      </div>
                    ):(
                        <div className="text-center">
                        <img
                          src={`/api/v1/product/product-photo/${id}`}
                          alt="product"
                          height="200px"
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={name}
                      placeholder="write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      rows="4"
                      cols="50"
                      value={description}
                      placeholder="write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      height="30px"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      value={price}
                      placeholder="write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write the Quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
  
                  <div className="mb-2">
                    <Select
                      className="form-select mb-2"
                      placeholder="Select Shipping"
                      bordered={false}
                      size="large"
                      showSearch
                      value ={shipping?'Yes':'No'}
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-2">
                    <button type="submit" className="btn btn-primary">
                      UPDATE PRODUCT
                    </button>
                  </div>
                </form>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      DELETE PRODUCT
                    </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default UpdateProduct