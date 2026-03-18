import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  // Introduce the hooks
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // Declare the additional hook to manage the state of the application
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a function that will handle the submit action
  const handleSubmit = async (e) =>{
  
    // Prevent site from reloading
    e.preventDefault()

    // Set loading hook with a message(activate it)
    setLoading(true)

    try{
      // Create a form data
      const formdata = new FormData()

      // Append the details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // Interect with axios to help you use the method post
      const response = await axios.post("https://audreywangui.alwaysdata.net/api/add_products", formdata);

      // Set loading hook back to default
      setLoading(false)

      // Update the success hook with a message
      setSuccess(response.data.message)

      // Setting the hooks back to default
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error){
      // Set loading to default
      setLoading(false)

      // Update the setError with a message
      setError(error.message)

    }
  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3 className='text-primary'>Welcome to Add Products</h3>

        {/* Bind the loading hook */}
        {loading && <Loader />}

          <h3 className='text-success'> {success} </h3>
          <h4 className='text-danger'> {error} </h4>

        <form onSubmit={handleSubmit}>
          <input type="text"
          placeholder='Enter the product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)} /> <br />

          {/* {product_name} */}

          <input type="text" 
          placeholder='Enter the product description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}/> <br />

          {/* {product_description} */}

          <input type="number" 
          placeholder='Enter the product cost'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}/> <br />

          {/* {product_cost} */}

          <label className='text-primary'>Product Photo</label>
          <input type="file" 
          className='form-control'
          required
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

          <input type="submit"
          value="Add Product" 
          className='btn btn-outline-primary'/>
        </form> 
      </div>
        
    </div>
  )
}

export default Addproducts;                                                       