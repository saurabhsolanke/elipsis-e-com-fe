import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCartproduct, getAllWishlist, addToWishlistproduct, deleteWishlistItem } from '../api';
import { ToastContainer, toast } from 'react-toastify';


const ProductCard = ({ product, images, addToCart }) => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');
  const [wishlists, setWishlist] = useState([]);

  const notify = () => toast("Added to cart!");
  const notify1 = () => toast("Item Already in cart!");
  const notify2 = () => toast("Item Already in Wishlist!");
  const notify3 = () => toast("Added to wishlist!");
  const notify4 = () => toast("Error adding to wishlist!");

  const [isHeartClicked, setIsHeartClicked] = useState(false);


  useEffect(() => {
    const loadWishlist = async (id) => {
      try {
        const wishlistData = await getAllWishlist(id);
        setWishlist(wishlistData);
        console.log(wishlistData);

      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    // loadWishlist();
  })

  const handleHeartClick = async (item) => {
    setIsHeartClicked(!isHeartClicked);
    const payload = {
      productId: product.id,
    };

    try {
      if (!isHeartClicked) {
        const response = await addToWishlistproduct(payload, token, userid);
        if (response) {
          console.log(response);
          notify3();
        } else {
          const errorData = await response.text();
          notify2();
          console.error('Error adding to wishlist:', errorData);
        }
      } else {
        const response = await deleteWishlistItem(payload.productId, token);
        if (response) {
          notify1();
        } else {
          const errorData = await response.text();
          console.error('Error removing from wishlist:', errorData);
        }
      }
    } catch (error) {
      notify4();
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
      const response = await addToCartproduct(payload, token, userid);
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
      <p className="mt-1 text-lg font-medium text-gray-900">Rs.{product.price}</p>
      <div className='flex justify-between'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddToCart}>
          <ToastContainer />
          <img src='/assets/cart.svg'/>
        </button>
        <button className='' onClick={handleHeartClick}>
          <img src={isHeartClicked ? '/assets/heart-fill.svg' : '/assets/heart.svg'} alt="Heart Icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;