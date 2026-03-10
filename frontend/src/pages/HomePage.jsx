import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios"; // ✅ use axios instance
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage } from "react-icons/fi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // ✅ FIXED API CALL
      const res = await api.get("/api/products");

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {

        // ✅ FIXED API CALL
        await api.delete(`/api/products/${id}`);

        setProducts(products.filter((p) => p._id !== id));
        setDeleteMessage("Product deleted successfully");

        setTimeout(() => setDeleteMessage(""), 3000);
      } catch (err) {
        console.error("Error deleting product", err);
        alert("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-7xl py-10">

      {deleteMessage && (
        <div className="alert alert-success mb-6 shadow-lg">
          <span>{deleteMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <FiPackage size={32} />
          </div>

          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Products Dashboard
            </h1>
            <p className="text-base-content/60 text-sm mt-1">
              Manage your inventory beautifully
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
              <FiSearch />
            </div>

            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link
            to="/add-product"
            className="btn btn-primary"
          >
            <FiPlus size={20} /> Add Product
          </Link>

        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200 border-dashed">

          <div className="text-base-content/20 mb-4 inline-block">
            <FiPackage size={64} />
          </div>

          <h3 className="text-xl font-bold mb-2">No products found</h3>

          <p className="text-base-content/60 mb-6">
            Looks like you don't have any matching products yet.
          </p>

          <Link to="/add-product" className="btn btn-outline btn-primary">
            Add Your First Product
          </Link>

        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200"
            >

              <figure className="px-4 pt-4 aspect-video bg-base-200 rounded-t-2xl overflow-hidden flex items-center justify-center">

                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.productName}
                    className="object-cover w-full h-full rounded-xl"
                  />
                ) : (
                  <div className="text-base-content/20">
                    <FiPackage size={48} />
                  </div>
                )}

                {product.quantity < 10 && (
                  <div className="absolute top-6 right-6 badge badge-error">
                    Low Stock: {product.quantity}
                  </div>
                )}

              </figure>

              <div className="card-body">

                <h2 className="card-title text-lg font-bold">
                  {product.productName}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-secondary badge-outline">
                    {product.category}
                  </span>

                  <span className="text-xs text-base-content/60">
                    {product.supplierName}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-end justify-between mt-4">

                  <div>
                    <span className="text-xs text-base-content/50 block">
                      Price
                    </span>

                    <span className="text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="btn btn-sm btn-circle btn-ghost text-info"
                    >
                      <FiEdit2 />
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-circle btn-ghost text-error"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      )}
    </div>
  );
};

export default Home;
