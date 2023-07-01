import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import DeleteForm from "../../components/Form/DeleteForm";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedname, setUpdatedName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedname }
      );
      if(data?.success){
        toast.success(`${updatedname} is updated successfully`)
      }
      else{
        toast.error(data.message);
      }
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategories();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // handle delete
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${selected._id}`
      );
      if(data?.success){
        toast.success(`${updatedname} is deleted successfully`)
      }
      else{
        toast.error(data.message);
      }
      setSelected(null);
      setUpdatedName("");
      setDeleteModal(false);
      getAllCategories();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} category is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Submitting the form");
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3 w-80">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-80 ">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col ps-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td key={`${c._id}edit-delete`}>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"
                          onClick={() => {
                            setDeleteModal(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedname}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
            <Modal
              onCancel={() => setDeleteModal(false)}
              footer={null}
              open={deleteModal}
            >
              <DeleteForm
                handleSubmit={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
