import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios";
import { FiArrowLeft, FiPackage } from "react-icons/fi";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost mb-6"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="bg-base-200 rounded-2xl p-6 flex items-center justify-center">

          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.productName}
              className="rounded-xl object-cover max-h-[350px]"
            />
          ) : (
            <div className="text-base-content/30">
              <FiPackage size={80} />
            </div>
          )}

        </div>

        {/* Product Info */}
        <div>

          <h1 className="text-3xl font-bold mb-3">
            {product.productName}
          </h1>

          <div className="badge badge-secondary mb-4">
            {product.category}
          </div>

          <p className="text-base-content/70 mb-6">
            {product.description || "No description available."}
          </p>

          <div className="space-y-3">

            <div>
              <span className="font-semibold">Supplier:</span>{" "}
              {product.supplierName}
            </div>

            <div>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-xl text-primary font-bold">
                ${product.price?.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="font-semibold">Quantity:</span>{" "}
              {product.quantity}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;
