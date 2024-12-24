import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCartproduct, getAllWishlist, addToWishlistproduct, deleteWishlistItem } from '../api';
import { ToastContainer, toast } from 'react-toastify';


const ProductCard = ({ product, images, addToCart }) => {
  const token = localStorage.getItem('token');
  const [wishlists, setWishlist] = useState([]);

  const notify = () => toast("Added to cart!");
  const notify1 = () => toast("Item Already in cart!");
  const [isHeartClicked, setIsHeartClicked] = useState(false); // Add state to track heart click


  useEffect(() => {
    const loadWishlist = async (id) => {
      try {
        const wishlistData = await getAllWishlist(id); // Assuming getAllWishlist is defined
        setWishlist(wishlistData);
        console.log(wishlistData);

      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    // loadWishlist();
  })

  const handleHeartClick = async (item) => {
    if (!item || !item.productId) {
      console.error('Item or productId is undefined');
      return; // Exit the function if item is not valid
    }
    setIsHeartClicked(!isHeartClicked); // Toggle heart click state
    const payload = {
      productId: item.productId.id, // Assuming item is accessible here
    };

    try {
      if (!isHeartClicked) {
        // If heart is clicked (red), add to wishlist
        const response = await addToWishlistproduct(payload, token);
        if (response.ok) {
          notify(); // Notify on success
        } else {
          const errorData = await response.text();
          console.error('Error adding to wishlist:', errorData);
        }
      } else {
        // If heart is unclicked (white), remove from wishlist
        const response = await deleteWishlistItem(payload.productId, token);
        if (response.ok) {
          notify1();
        } else {
          const errorData = await response.text();
          console.error('Error removing from wishlist:', errorData);
        }
      }
    } catch (error) {
      console.error('Error handling wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    const payload = {
      productId: product.id,
      quantity: 1,
    };
    console.log('Payload:', payload);
    console.log('Token', token);
    try {
      const response = await addToCartproduct(payload, token);
      console.log('Response:', response);
      if (!response.ok) {
        notify();
        const errorData = await response.text();
        console.error('Error details:', errorData);
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      console.log('Product added to cart:', data);
    }
    catch (error) {
      console.error('Error adding product to cart:', error);
      notify1();
    }
  };

  return (
    <div className="product-card shadow-2xl rounded-xl p-5">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ height: '300px' }}>
          {images.length > 0 ? (
            <img key={0} src={images[0]} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={product.thumbnail} alt="Thumbnail" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </Link>
      <h3 className="mt-4 text-md text-gray-700">{product.brand}</h3>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-sm font-medium text-gray-900">{product.description}</p>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
      <div className='flex justify-between'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddToCart}>
          <ToastContainer />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </button>
        <button className='' onClick={handleHeartClick}> {/* Add onClick handler */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isHeartClicked ? "red" : "black"} className={isHeartClicked ? "bi bi-heart-fill" : "bi bi-heart"} viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;