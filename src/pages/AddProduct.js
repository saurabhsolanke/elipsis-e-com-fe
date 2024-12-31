import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchProductById } from '../api';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AddProduct = ({ }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    console.log(userId, "UID", token)
    const notify = () => toast("Added Product!");
    const notify1 = () => toast("Updated Product!");
    const [product, setProduct] = useState({
        name: '', // Changed from title to name
        description: '',
        brand: '',
        price: '',
        // discountPercentage: '',
        category: '',
        sku: '', // Added SKU
        barcode: '', // Added barcode
        vendor: '', // Added vendor
        stock: '', // Added stock
        reserved: '', // Added reserved
        taxPercent: '', // Added taxPercent
        thumbnail: '', // Added thumbnail
        active: true, // Added active
        productImages: [] // This will hold the image objects
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const productData = await fetchProductById(productId); // Use the imported function
                    setProduct(productData.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageLinks = files.map(file => ({
            name: file.name, // Store the name of the file
            link: URL.createObjectURL(file) // Create a link for the image
        }));
        setProduct({ ...product, productImages: imageLinks });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                const response = await updateProduct( ...product, userId, token );
                console.log('Product updated successfully:', response);
                navigate('/admindashboard');
                notify1();
            } else {
                const response = await addProduct( product, userId, token );
                console.log('Product added successfully:', response);
                notify();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mx-16 mt-8">
            <button className='bg-blue-500 text-white p-2 rounded'><a href='/admindashboard/products'>  To Dashboard</a></button>
            <h2 className="font-bold text-3xl mt-5">{productId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="">
                        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="barcode" placeholder="Barcode" value={product.barcode} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="vendor" placeholder="Vendor" value={product.vendor} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="number" name="reserved" placeholder="Reserved" value={product.reserved} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="number" name="taxPercent" placeholder="Tax Percent" value={product.taxPercent} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="thumbnail" placeholder="Thumbnail URL" value={product.thumbnail} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className=''>
                        <input type="file" multiple onChange={handleImageChange} className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                </div>
                {/* <input type="number" name="discountPercentage" placeholder="Discount Percentage" value={product.discountPercentage} onChange={handleChange} className="border p-2 w-full" /> */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">{productId ? 'Update Product' : 'Add Product'}</button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default AddProduct;