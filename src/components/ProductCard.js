import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCartproduct, getAllWishlist, addToWishlistproduct, deleteWishlistItem, updateCartItemQuantity, fetchProducts } from '../api';
import { ToastContainer, toast } from 'react-toastify';


const ProductCard = ({ product, images, addToCart, loadProducts }) => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');
  const [wishlists, setWishlist] = useState([]);
  const productId = product?.id || product._id;

  const notify = () => toast("Added to cart!");
  const notify1 = () => toast("removed item from wishlist");
  const notify2 = () => toast("Item deleted in Wishlist!");
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

  const handleHeartClick = async () => {
    const isWishlisted = product?.isWishlisted || false;
    setIsHeartClicked(!isHeartClicked);
    const payload = {
      productId: productId,
    };
    console.log(payload);

    try {
      if (!isWishlisted) {
        const response = await addToWishlistproduct(payload, token, userid);
        if (response) {
          console.log(response.wishlist.id);
          await loadProducts();
          notify3();
        } else {
          const errorData = await response.text();
          notify2();
          console.error('Error adding to wishlist:', errorData);
        }
      } else {
        const response = await deleteWishlistItem(product.wishlistId, token);
        if (response) {
          product.isWishlisted = !product.isWishlisted;
          notify1();
          await loadProducts();
        } else {
          const errorData = await response.text();
          console.error('Error removing from wishlist:', errorData);
        }
      }
    } catch (error) {
      notify4();
      console.error('Error handling wishlist:', error);
    }
    finally {

    }
  };

  const handleAddToCart = async () => {
    const payload = {
      productId: productId,
      quantity: 1,
    };
    console.log(payload);
    try {
      const response = await addToCartproduct(payload, token, userid);
      console.log('Response:', response);

      if (response && response.status !== 'error') {
        notify(); // Show success notification
      } else if (response && response.message === 'Product already exists in cart') {
        // If product exists, try to update its quantity
        try {
          const updatePayload = {
            quantity: payload.quantity + 1 // Increment existing quantity by 1
          };
          const updateResponse = await updateCartItemQuantity(updatePayload, response.cartItemId, token);
          if (updateResponse) {
            notify(); // Show success notification for quantity update
          } else {
            notify1(); // Show error notification
          }
        } catch (updateError) {
          console.error('Error updating cart quantity:', updateError);
          notify1();
        }
      } else {
        notify1(); // Show "Item already in cart" notification
      }
    }
    catch (error) {
      console.error('Error adding product to cart:', error);
      notify1();
    }
  };

  return (
    <div className="product-card shadow rounded-xl transition-transform duration-300 hover:shadow-lg hover:scale-105">
      <div className="relative">
        <Link to={`/products/${productId}`}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style={{ height: '300px' }} >
            {images.length > 0 ? (
              <img key={0} src={images[0]} data-aos="fade-up" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={product.thumbnail} data-aos="fade-up" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            )}
          </div>
        </Link>
        <button className='absolute top-2 right-2 p-2' onClick={handleHeartClick}>
          <img className="w-5 h-5" src={product?.isWishlisted ? '/assets/heart-fill.svg' : '/assets/heart.svg'} alt="Heart Icon" />
        </button>
      </div>
      <div className='px-5 py-3'>
        {/* <h3 className="text-md text-gray-700">{product.brand}</h3> */}
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        {/* <p className="text-sm font-medium text-gray-900">{product.description}</p> */}
        <p className="text-lg font-medium text-gray-900">Rs.{product.price}</p>
        <div className='flex justify-between'>
          {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
         onClick={handleAddToCart}>
         <ToastContainer />
         <img src='/assets/cart.svg' />
       </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;