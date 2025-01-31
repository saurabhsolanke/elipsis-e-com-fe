import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchProductById, updateProductSizes, uploadImage } from '../api';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AddProduct = ({ }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const notify = () => toast("Added Product!");
    const notify1 = () => toast("Updated Product!");
    
    const [product, setProduct] = useState({
        name: '',
        description: '',
        brand: '',
        price: '',
        category: '',
        sku: '',
        barcode: '',
        vendor: '',
        stock: '',
        reserved: '',
        taxPercent: '',
        thumbnail: '',
        active: true,
        productImages: [],
        sizes: [
            { size: 'XS', availableStock: 0 },
            { size: 'S', availableStock: 0 },
            { size: 'M', availableStock: 0 },
            { size: 'L', availableStock: 0 },
            { size: 'XL', availableStock: 0 },
            { size: 'XXL', availableStock: 0 },
            { size: 'XXXL', availableStock: 0 }
        ]
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    setIsLoading(true);
                    const productData = await fetchProductById(productId, token);
                    // Ensure all form fields have at least an empty string
                    const sanitizedData = {
                        name: productData.data.product.name || '',
                        description: productData.data.product.description || '',
                        brand: productData.data.product.brand || '',
                        price: productData.data.product.price || '',
                        category: productData.data.product.category || '',
                        sku: productData.data.product.sku || '',
                        barcode: productData.data.product.barcode || '',
                        vendor: productData.data.product.vendor || '',
                        stock: productData.data.product.stock || '',
                        reserved: productData.data.product.reserved || '',
                        taxPercent: productData.data.product.taxPercent || '',
                        thumbnail: productData.data.product.thumbnail || '',
                        active: productData.data.product.active ?? true,
                        productImages: productData.data.product.productImages || [],
                        sizes: productData.data.product.sizes || [
                            { size: 'XS', availableStock: 0 },
                            { size: 'S', availableStock: 0 },
                            { size: 'M', availableStock: 0 },
                            { size: 'L', availableStock: 0 },
                            { size: 'XL', availableStock: 0 },
                            { size: 'XXL', availableStock: 0 },
                            { size: 'XXXL', availableStock: 0 }
                        ]
                    };
                    setProduct(sanitizedData);
                    console.log(sanitizedData);
                } catch (error) {
                    console.error('Error fetching product:', error);
                    toast.error('Error fetching product details');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        setIsLoading(true);

        try {
            const uploadPromises = files.map(async (file) => {
                const response = await uploadImage(file, token);
                return {
                    name: file.name,
                    link: response.imageUrl // Adjust based on your API response
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setProduct(prev => ({
                ...prev,
                productImages: [...prev.productImages, ...uploadedImages]
            }));
            toast.success('Images uploaded successfully');
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Failed to upload images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = (index) => {
        setProduct(prev => ({
            ...prev,
            productImages: prev.productImages.filter((_, i) => i !== index)
        }));
    };

    const handleSizeChange = async (index, field, value) => {
        const newSizes = [...product.sizes];
        newSizes[index] = {
            ...newSizes[index],
            [field]: field === 'availableStock' ? parseInt(value) : value
        };
        setProduct({ ...product, sizes: newSizes });

        // If we're editing an existing product, update sizes immediately
        if (productId) {
            try {
                await updateProductSizes(productId, newSizes, token);
                toast.success('Sizes updated successfully');
            } catch (error) {
                console.error('Error updating sizes:', error);
                toast.error('Failed to update sizes');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                const { sizes, ...productWithoutSizes } = product;
                const response = await updateProduct(productWithoutSizes, productId, token);
                console.log('Product updated successfully:', response);
                navigate('/admindashboard/products');
                notify1();
            } else {
                const response = await addProduct({ ...product }, userId, token);
                console.log('Product added successfully:', response);
                notify();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleSaveSize = async () => {
        if (!productId) {
            toast.error('Please save the product first before updating sizes');
            return;
        }

        try {
            await updateProductSizes(productId, product.sizes, token);
            toast.success('Sizes updated successfully');
        } catch (error) {
            console.error('Error updating sizes:', error);
            toast.error('Failed to update sizes');
        }
    };

    return (
        <div className="container mx-16 mt-8">
            <button className='bg-blue-500 text-white p-2 rounded'><a href='/admindashboard/products'>  To Dashboard</a></button>
            <div className="flex m-4 w-full items-center justify-center space-x-2 text-sm font-normal text-gray-900 dark:text-gray-200">
                <div className="text-sky-600 dark:text-sky-400">Admin</div><span>/</span>
                <div className="text-sky-600 dark:text-sky-400">Products</div><span>/</span>
                <div className="text-sky-600 dark:text-sky-400"> <a href='/admindashboard/products'>Products Dashboard</a></div><span>/</span>
            </div>
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
                    {/* <div className=''>
                        <input type="file" multiple onChange={handleImageChange} className="border p-2 w-full" />
                    </div> */}
                    <div className="col-span-3">
                        <h3 className="font-bold mb-2">Product Images</h3>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="border p-2 w-full mb-4"
                            accept="image/*"
                        />

                        {/* Display uploaded images */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.productImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image.link}
                                        alt={image.name}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required className="border p-2 w-full" />
                    </div>

                    <div className="col-span-3">
                        <h3 className="font-bold mb-2">Size Management</h3>
                        <button
                            type="button" // Important: type="button" prevents form submission
                            onClick={handleSaveSize}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Sizes
                        </button>
                        <div className="grid grid-cols-4 gap-4"> {/* Changed to 4 columns for better layout */}
                            {product.sizes.map((sizeObj, index) => (
                                <div key={index} className="border p-4 rounded">
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            value={sizeObj.size}
                                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                            className="border p-2 w-full mb-2"
                                            placeholder="Size"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={sizeObj.availableStock}
                                            onChange={(e) => handleSizeChange(index, 'availableStock', e.target.value)}
                                            className="border p-2 w-full"
                                            placeholder="Available Stock"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
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