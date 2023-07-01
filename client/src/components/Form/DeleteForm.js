import React from "react"
const DeleteForm = ({handleSubmit}) => {
  return (
    <>
      <form onSubmit = {handleSubmit}>
        <div className="form-group">
          <h3>Are you sure you want to Delete ?</h3>
        </div>
        <div style={{marginTop:"10px"}}>
        <button type="submit" className="btn btn-primary ">
          Delete
        </button>
        </div>
      </form>
    </>
  );
};

export default DeleteForm;