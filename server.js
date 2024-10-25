const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your own MongoDB URI)
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a Product schema
const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  image: String, // Store image path or filename
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);

// Test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// API route to handle form submission
app.post('/api/products', async (req, res) => {
  const { productName, description, price, image } = req.body;

  try {
    const newProduct = new Product({ productName, description, price, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Start the server (only once)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
