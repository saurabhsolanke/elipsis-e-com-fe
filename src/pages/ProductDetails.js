import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import { fetchProductById, addToCartproduct, getAllWishlist, addToWishlistproduct, deleteWishlistItem, updateCartItemQuantity, fetchProducts } from '../api';
import { ToastContainer, toast } from 'react-toastify';


const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedproduct, setrelatedProduct] = useState(null);
  const notify = () => toast("Added to cart!");
  const notify1 = () => toast("updated cart!");
  const notify2 = () => toast("failed to update cart!");
  const notify3 = () => toast("failed to add cart");

  const [currentIndex, setCurrentIndex] = useState(0);
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');
  const [selectedSize, setSelectedSize] = useState(null); // New state for selected size

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < product.productImages.length ? prevIndex + 1 : 0
    );
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Update selected size
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : product.productImages.length - 1
    );
  };

  const handleAddToCart = async () => {
    const payload = {
      productId: productId,
      quantity: 1,
      size: selectedSize,
    };
    console.log(payload);
    try {
      const response = await addToCartproduct(payload, token, userid);
      console.log('Response:', response);
      if (response && response.status !== 'error') {
        notify();
      } else if (response && response.message === 'Product already exists in cart') {
        // If product exists, try to update its quantity
        try {
          const updatePayload = {
            quantity: payload.quantity + 1 // Increment existing quantity by 1
          };
          const updateResponse = await updateCartItemQuantity(updatePayload, response.cartItemId, token);
          if (updateResponse) {
            notify1();
          } else {
            notify2(); // Show error notification
          }
        } catch (updateError) {
          console.error('Error updating cart quantity:', updateError);
          notify2();
        }
      } else {
        notify1();
      }
    }
    catch (error) {
      console.error('Error adding product to cart:', error);
      notify3();
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(productId, token);
        setProduct(productData.data.product);
        setrelatedProduct(productData.data.relatedProducts);
        console.log(productData.data.relatedProducts);

        console.log(productData.data);

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5 border">
        <div className="col-span-1 lg:col-span-2 p-5 bg-white rounded-lg shadow-md  ">
          <div className="product-details">
            {product.productImages && product.productImages.length > 0 ? (
              <div className="image-container">
                <img className="object-contain h-64 w-1/2 rounded-lg" src={product.productImages[currentIndex].link} alt={`Product Image ${currentIndex + 1}`} />
                <div className="flex justify-center mt-4 space-x-4">
                  <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"> Previous </button>
                  <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"> Next </button>
                </div>
              </div>
            ) : (
              <div className="image-container">
                <img className="object-contain h-1/2 w-1/2 rounded-lg" src={product.thumbnail} alt={`Product Image ${currentIndex + 1}`} />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 flex justify-center items-center bg-gray-100 rounded-lg border p-5">
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
            <p className="text-gray-600 text-base">{product.name}</p>
            {/* <p className="text-sm text-gray-500">Brand: {product.brand}</p> */}

            {userRole === 'admin' ? (
              <input type="text" value={product.brand} className="text-sm text-gray-500" />
            ) : (
              <label className="text-sm text-gray-500">Brand: {product.brand}</label>
            )}

            <div className="flex items-center">
              <p className="text-sm text-gray-800">{product.rating}</p>
              <StarRating rating={Math.round(product.rating)} />
            </div>
            <p className="text-2xl font-semibold text-gray-800">Price: Rs.{product.price}</p>
            {product.discountPercentage && (
              <p className="text-green-500 font-semibold">
                Discount: {product.discountPercentage}%
              </p>
            )}
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Available Sizes:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes.map((sizeObj) => (
                    <span
                      key={sizeObj._id}
                      className={`px-3 py-1 text-sm border rounded-md flex flex-col items-center
                        ${sizeObj.availableStock > 0
                          ? 'hover:bg-gray-100 cursor-pointer'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      onClick={sizeObj.availableStock > 0 ? () => handleSizeSelect(sizeObj.size) : null} // Handle size selection
                    >
                      <span>{sizeObj.size}</span>
                      <span className="text-xs">
                        {sizeObj.availableStock > 0
                          ? `Stock: ${sizeObj.availableStock}`
                          : 'Out of Stock'}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button className={`bg-blue-500 ${selectedSize ? 'hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded`}
              onClick={selectedSize ? handleAddToCart : null} // Only call handleAddToCart if a size is selected
              disabled={!selectedSize}>
              <ToastContainer />
              <img src='/assets/cart.svg' />
            </button>
          </div>


        </div>
      </div>
      {relatedproduct && relatedproduct.length > 0 ? (
        <div className='related-products mt-5'>
          <h1 className='p-6'>Related Products</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-5 border">
            {relatedproduct.map((item) => (
              <div key={item.id} className="related-product-item">
                <div className="hover:shadow-3xl group flex h-full w-72 flex-col overflow-hidden rounded-xl bg-white text-gray-700 shadow-lg">
                  <div className="z-20 h-1/2 w-full h-full">
                    <img src={item.thumbnail} alt={item.name} className="object-contain h-64 w-full rounded-lg" />
                  </div>
                  <div className="flex-col w-full justify-center p-5 font-semibold tracking-tight text-gray-500">
                    <h3 className="related-product-title">{item.name}</h3>
                    <p className="related-product-price">Price: Rs.{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>no related items</p>
      )}
    </div>
  );
};

export default ProductDetails;
