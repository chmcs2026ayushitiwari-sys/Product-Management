import Product from '../models/productModel.js';

// @desc    Get all products (with Search & Sort)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = {};

        // Search by Product Name
        if (search) {
            query.productName = { $regex: search, $options: 'i' }; // Case-insensitive
        }

        let productsQuery = Product.find(query);

        // Sort by Price
        if (sort === 'asc') {
            productsQuery = productsQuery.sort({ price: 1 });
        } else if (sort === 'desc') {
            productsQuery = productsQuery.sort({ price: -1 });
        } else {
            productsQuery = productsQuery.sort({ createdAt: -1 }); // Default: Newest first
        }

        const products = await productsQuery;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ id: req.params.id, message: 'Product deleted' }); // Sending ID back helps frontend
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
