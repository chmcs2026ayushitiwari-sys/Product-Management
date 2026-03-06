import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be positive']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add quantity'],
        min: [0, 'Quantity must be positive']
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    supplierName: {
        type: String,
        required: [true, 'Please add a supplier name'],
        trim: true
    },
    thumbnail: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model('Product', productSchema);
