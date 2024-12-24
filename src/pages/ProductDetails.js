import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import { fetchProductById } from '../api';


const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userRole = localStorage.getItem('role');

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < product.productImages.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : product.productImages.length - 1
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(productId); // Use the imported function
        setProduct(productData.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p className="flex w-full space-x-5 pagination">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline h-16 w-16 animate-spin fill-gray-600 text-gray-300 dark:fill-gray-400 dark:text-gray-600">
      <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" />
      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentFill" />
    </svg>
  </p>;

  return (
    <div className=''>
      <div className='container'>
        <a className='' href="/"><svg xmlns="http://www.w3.org/2000/svg" width="46" height="36" fill="grey" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg></a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5 border">
        <div className="col-span-1 lg:col-span-1 flex justify-center items-center bg-gray-100 p-5 rounded-lg border">
          <div className="product-details">
            {product.productImages && product.productImages.length > 0 ? (
              <div className="image-container">
                <img className="object-contain h-64 w-full rounded-lg" src={product.productImages[currentIndex].link} alt={`Product Image ${currentIndex + 1}`} />
                <div className="flex justify-center mt-4 space-x-4">
                  <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"> Previous </button>
                  <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"> Next </button>
                </div>
              </div>
            ) : (
              <p>No image to display</p>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 p-5 bg-white rounded-lg shadow-md">
          {/* <div className="product-details space-y-4">
            <h2 className="font-bold text-3xl text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-base">{product.description}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>

            <div className="flex items-center">
              <p className="text-sm text-gray-800">{product.rating}</p>
              <StarRating rating={Math.round(product.rating)} />
            </div>
            <p className="text-2xl font-semibold text-gray-800">Price: ${product.price}</p>
            {product.discountPercentage && (
              <p className="text-green-500 font-semibold">
                Discount: {product.discountPercentage}%
              </p>
            )}
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div> */}

          <div className="product-details space-y-4">
            <h2 className="font-bold text-3xl text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-base">{product.description}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>

            {/* New condition for rendering input or label based on user role */}
            {userRole === 'admin' ? (
              <input type="text" value={product.brand} className="text-sm text-gray-500" />
            ) : (
              <label className="text-sm text-gray-500">Brand: {product.brand}</label>
            )}

            <div className="flex items-center">
              <p className="text-sm text-gray-800">{product.rating}</p>
              <StarRating rating={Math.round(product.rating)} />
            </div>
            <p className="text-2xl font-semibold text-gray-800">Price: ${product.price}</p>
            {product.discountPercentage && (
              <p className="text-green-500 font-semibold">
                Discount: {product.discountPercentage}%
              </p>
            )}
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
