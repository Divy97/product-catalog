import React, { useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    image: "",
    productCategory: "Electronics", // Default category
    quantity: "",
    price: "",
    sellerName: "",
    sellerPhoneNumber: "",
    sellerAddress: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Check if the input field is for a file (image)
    const updatedValue = type === "file" ? e.target.files[0] : value;
    setProductData({
      ...productData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    // Send a POST request to the backend to handle the form data, including the image
    fetch("http://localhost:8080/addProduct", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Description:</label>
          <textarea
            name="productDescription"
            value={productData.productDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="file"
            name="image"
            // value={productData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Category:</label>
          <select
            name="productCategory"
            value={productData.productCategory}
            onChange={handleChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Seller Name:</label>
          <input
            type="text"
            name="sellerName"
            value={productData.sellerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Seller Phone Number:</label>
          <input
            type="text"
            name="sellerPhoneNumber"
            value={productData.sellerPhoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Seller Address:</label>
          <input
            type="text"
            name="sellerAddress"
            value={productData.sellerAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Discount:</label>
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
