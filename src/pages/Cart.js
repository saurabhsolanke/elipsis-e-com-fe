import React, { useEffect, useState } from 'react';
import { getAllCartItems, deleteCartItem, addToWishlistproduct, deleteWishlistItem  } from '../api'; // Adjust the import path as necessary
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const notify = () => toast("Item removed from cart!"); // Define the notify function
  const notify1 = () => toast("Deleted from Wishlist!"); // Define the notify function
  const [isHeartClicked, setIsHeartClicked] = useState(false); // Add state to track heart click


  // const handleHeartClick = async (item) => {
  //   setIsHeartClicked(!isHeartClicked); // Toggle heart click state
    
  //   const payload = {
  //     productId: item.productId.id,
  //   };

  //   try {
  //     if (!isHeartClicked) {
  //       // If heart is clicked (red), add to wishlist
  //       const response = await addToWishlistproduct(payload, token);
  //       if (response.ok) {
  //         notify(); // Notify on success
  //       } else {
  //         const errorData = await response.text();
  //         console.error('Error adding to wishlist:', errorData);
  //       }
  //     } else {
  //       // If heart is unclicked (white), remove from wishlist
  //       const response = await deleteWishlistItem(payload.productId, token);
  //       if (response.ok) {
  //         notify1(); 
  //       } else {
  //         const errorData = await response.text();
  //         console.error('Error removing from wishlist:', errorData);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error handling wishlist:', error);
  //   }
  // };

  useEffect(() => {

    const fetchCartItems = async () => {
      try {
        const response = await getAllCartItems(token);
        setCartItems(response.data.results); // Ensure this is an array
      } catch (err) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  const removeFromCart = async (id) => {
    try {
      await deleteCartItem(id, token); // Call the delete function from api.js
      setCartItems(cartItems.filter(item => item.id !== id)); // Remove item from cart
      notify();
    } catch (err) {
      setError('Failed to remove item from cart'); // Handle error
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2) // Calculate total price
    : '0.00';

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div className="cart-page bg-gray-100">
      <h1 className='m-8 text-gray-700 dark:text-gray-500 text-3xl'>Cart</h1>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-2 col-span-2 border mx-16 bg-white">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item flex justify-between border-b py-4 m-6">
                <div className='flex-none'>
                  <img src={item.productId.thumbnail} className='border' alt='pic' style={{ height: '168px', width: '115px' }} />
                </div>
                <div className="item-details mx-10 w-4/5">
                  <h2 className="text-lg font-semibold">{item.productId.name}</h2> {/* Accessing product name */}
                  <p className="text-lg font-medium">${item.productId.price}</p> {/* Accessing product price */}

                  <div className='text-gray-500'>
                    <p className='text-muted'>{item.productId.description}</p>
                  </div>

                  <p className="text-sm mt-5">Quantity: {item.quantity}</p> {/* Display quantity */}
                  {/* <div className='' onClick={handleHeartClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isHeartClicked ? "red" : "black"} className="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                  </div> */}
                </div>
                {/* <div className='w-1/3'> */}
                {/* <button onClick={notify}>Notify!</button> */}
                <button className="remove-button text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
                <ToastContainer />
                {/* </div> */}
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="total-price mt-4">
            <h2 className="text-lg text-end font-bold">Total: ${totalPrice}</h2>
          </div>
        </div>
        <div className="row-span-2 border mx-6 bg-white">
          <div className='flex justify-between m-5'>
            <div className=''>
              <p>Order value</p>
            </div>
            <div className=''>
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;