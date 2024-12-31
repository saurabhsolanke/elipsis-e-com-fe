import React, { useEffect, useState } from 'react';
import { getAllCartItems, deleteCartItem, addOrder, updateCartItemQuantity, addToWishlistproduct, deleteWishlistItem } from '../api'; // Adjust the import path as necessary
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');
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
        const response = await getAllCartItems(token, userid);
        setCartItems(response.data.results);
      } catch (err) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  const handleAddToOrders = async () => {
    const orderItems = cartItems.map(item => ({
      productId: item.productId.id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity
    }));

    const payload = {
      orderItems: orderItems,
      totalAmount: totalPrice,
      paymentMethod: "Cash_On_Delivery",
      shippingAddress: "a "
    };

    console.log('Payload:', payload);
    console.log('Token', token);
    try {
      const response = await addOrder(payload, userid, token);
      console.log('Response:', response);
      if (!response.ok) {
        notify();
        const errorData = await response.text();
        console.error('Error details:', errorData);
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      console.log('Product added to Orders:', data);
    }
    catch (error) {
      console.error('Error adding product to Orders:', error);
      notify1();
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    const payload = {
      productId: itemToUpdate.productId.id,
      quantity: newQuantity
    };
    try {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
      const response = await updateCartItemQuantity(payload, id, token);
      if (response.ok) {
      } else {
        const errorData = await response.text();
        console.error('Error updating quantity:', errorData);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await deleteCartItem(id, token);
      setCartItems(cartItems.filter(item => item.id !== id));
      notify();
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)
    : '0.00';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-page bg-gray-100">
    <h1 className='m-8 text-gray-700 dark:text-gray-500 text-3xl'>Cart</h1>
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-2 col-span-2 border sm:mx-8 md:mx-16 lg:mx-16 xl:mx-16  bg-white">
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item flex justify-between border-b py-4 m-6">
              <div className='flex-none'>
                <img src={item.productId.thumbnail} className='border' alt='pic' style={{ height: '168px', width: '115px' }} />
              </div>
              <div className="item-details ml-4 md:mx-10 lg:mx-10 xl:mx-10 w-4/5">
                <h2 className="text-lg font-semibold">{item.productId.name}</h2>
                <p className="text-lg font-medium">Rs.{item.productId.price}</p>
                <div className='text-gray-500'>
                  <p className='text-muted'>{item.productId.description}</p>
                </div>
                <div className="flex items-center">
                  <button className="text-lg font-bold mr-2" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  <input type="number" value={item.quantity} readOnly className="w-16 text-center border rounded" />
                  <button className="text-lg font-bold ml-2" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} > - </button>
                </div>
              </div>
              <button className="remove-button text-red-500 hover:text-red-700"
                onClick={() => removeFromCart(item.id)}>
                <img src='/assets/trash.svg' />
              </button>
              <ToastContainer />
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center'>
            <div className='m-5'>
            <p className='text-3xl'>Your cart is empty.</p>
              <a className='text-blue-400' href='/productlist'><u> continue shopping</u></a>
          </div>
          </div>
        )}
        <div className="total-price mt-4">
          <h2 className="text-lg text-end font-bold m-3">Total: Rs.{totalPrice}</h2>
        </div>
      </div>
      {/* Updated section to be responsive */}
      <div className="row-span-1 md:row-span-2 border mx-6 bg-white w-full">
        <div className='flex justify-between m-5'>
          <div className=''>
            <p>Order value</p>
            <p>Delivery</p>
          </div>
          <div className=''>
            <p>Rs. {totalPrice}</p>
            <p>{totalPrice === '0.00' ? 'Rs. 0' : totalPrice >= 1999 ? 'Free' : 'Rs.' + 149}</p>
          </div>
        </div>
        <div className='border-2 border-white border-t-slate-400 flex justify-between m-5'>
          <div className="mt-3">
            <p className="font-bold">Total</p>
          </div>
          <div className="mt-3">
            <p className="font-bold">Rs.{(parseFloat(totalPrice) + (totalPrice === '0.00' ? 0 : (totalPrice >= 1999 ? 0 : 149))).toFixed(2)} </p>
          </div>
        </div>
        <div className="flex justify-end">
          <a href="/checkout" className="mr-2 rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white hover:cursor-pointer"> Move to checkout</a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Cart;