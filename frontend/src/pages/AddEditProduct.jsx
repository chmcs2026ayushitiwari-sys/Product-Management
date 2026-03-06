import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiSave, FiArrowLeft, FiImage, FiFolder, FiTag, FiDollarSign } from 'react-icons/fi';

const AddEditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        supplierName: '',
        thumbnail: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch product data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/products/${id}`);
            // Assuming images array stored as comma separated string for simple editing
            const productData = {
                ...res.data,
                images: res.data.images ? res.data.images.join(', ') : ''
            };
            setFormData(productData);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch product details.');
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
        setError('');
        setSuccess('');

        try {
            // Process images string back to array
            const payload = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            };

            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/products/${id}`, payload);
                setSuccess('Product updated successfully!');
            } else {
                await axios.post('http://localhost:5000/api/products', payload);
                setSuccess('Product created successfully!');
                // Reset form after create
                setFormData({
                    productName: '', description: '', category: '', price: '',
                    quantity: '', supplierName: '', thumbnail: ''
                });
            }

            // Auto redirect back to home after 1.5s
            setTimeout(() => navigate('/'), 1500);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to save product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl py-10">
            <div className="flex items-center mb-8 gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-circle btn-ghost"
                >
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <div className="card bg-base-100 shadow-2xl glass border border-base-300">
                <div className="card-body">

                    {error && (
                        <div className="alert alert-error mb-6 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success mb-6 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Basic Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Product Title *</span></label>
                                <input
                                    type="text" name="productName" required
                                    placeholder="e.g. Wireless Headphones"
                                    className="input input-bordered input-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    value={formData.productName} onChange={handleChange}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Supplier Name *</span></label>
                                <div className="relative">
                                    <FiTag className="absolute top-3.5 left-3 text-base-content/50" />
                                    <input
                                        type="text" name="supplierName" required
                                        placeholder="e.g. Sony"
                                        className="input input-bordered input-primary w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        value={formData.supplierName} onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Description</span></label>
                            <textarea
                                name="description"
                                placeholder="Detailed product description..."
                                className="textarea textarea-bordered textarea-primary h-24 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base"
                                value={formData.description} onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="divider">Pricing & Inventory</div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Price ($) *</span></label>
                                <div className="relative">
                                    <FiDollarSign className="absolute top-3.5 left-3 text-base-content/50" />
                                    <input
                                        type="number" name="price" required step="0.01" min="0"
                                        placeholder="99.99"
                                        className="input input-bordered input-secondary w-full pl-10 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                                        value={formData.price} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Quantity *</span></label>
                                <input
                                    type="number" name="quantity" required min="0"
                                    placeholder="100"
                                    className="input input-bordered input-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                                    value={formData.quantity} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="divider">Categorization & Media</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Category *</span></label>
                                <div className="relative">
                                    <FiFolder className="absolute top-3.5 left-3 text-base-content/50" />
                                    <select
                                        name="category" required
                                        className="select select-bordered select-accent w-full pl-10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                                        value={formData.category} onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="home">Home & Kitchen</option>
                                        <option value="sports">Sports</option>
                                        <option value="beauty">Beauty & Personal Care</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Image URL (Optional)</span></label>
                                <div className="relative">
                                    <FiImage className="absolute top-3.5 left-3 text-base-content/50" />
                                    <input
                                        type="url" name="thumbnail"
                                        placeholder="https://example.com/image.jpg"
                                        className="input input-bordered input-accent w-full pl-10 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                                        value={formData.thumbnail} onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-8 border-t border-base-200 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="btn btn-ghost hover:bg-base-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : <FiSave size={20} />}
                                {isEditMode ? 'Save Changes' : 'Create Product'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEditProduct;
