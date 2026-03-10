import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";//✅ use your axios instance
import { FiSave, FiArrowLeft, FiImage, FiFolder, FiTag, FiDollarSign } from "react-icons/fi";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    supplierName: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch product data if editing
  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // ✅ FIXED API CALL
      const res = await api.get(`/api/products/${id}`);

      const productData = {
        ...res.data,
        images: res.data.images ? res.data.images.join(", ") : "",
      };

      setFormData(productData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (isEditMode) {
        // ✅ FIXED API CALL
        await api.put(`/api/products/${id}`, payload);
        setSuccess("Product updated successfully!");
      } else {
        // ✅ FIXED API CALL
        await api.post(`/api/products`, payload);
        setSuccess("Product created successfully!");

        setFormData({
          productName: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
          supplierName: "",
          thumbnail: "",
        });
      }

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl py-10">
      <div className="flex items-center mb-8 gap-4">
        <button onClick={() => navigate("/")} className="btn btn-circle btn-ghost">
          <FiArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-6">
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          className="input input-bordered w-full"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          className="input input-bordered w-full"
          value={formData.supplierName}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered w-full"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="select select-bordered w-full"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="sports">Sports</option>
          <option value="beauty">Beauty</option>
        </select>

        <input
          type="url"
          name="thumbnail"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.thumbnail}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;
