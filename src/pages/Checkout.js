import React, { useEffect, useState } from 'react';
import { addOrder, getAllCartItems, getProfile } from '../api';

const Checkout = () => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    const name1 = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);
    const [name, setName] = useState(""); // For the user's name
    const [orders, setOrders] = useState([]);

    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)
        : '0.00';

    useEffect(() => {

        const fetchCartItems = async () => {
            try {
                const response = await getAllCartItems(userid, token);
                setCartItems(response.data.results);
            } catch (err) {
                setError('Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };
        const fetchprofile = async () => {
            try {
                const response = await getProfile(userid, token);
                setProfile(response.data);
                setName(response.data.name);
                setOrders(response.data.orders);
            } catch (err) {
                setError('Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchprofile();
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
                const errorData = await response.text();
                console.error('Error details:', errorData);
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            console.log('Product added to Orders:', data);
        }
        catch (error) {
            console.error('Error adding product to Orders:', error);
        }
    };

    return (
        // ... existing code ...
        <div className='m-4 md:m-16'> {/* Adjust margin for mobile */}
            <div className='mx-2 md:mx-24 justify-center'> {/* Adjust margin for mobile */}
                <h1 className="text-lg md:text-2xl font-bold">Checkout</h1>
                {/* Leftside */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 md:p-6 m-2 md:m-6">
                        <h1 className="text-lg font-semibold">My Information</h1>
                        <p>{name1}</p>
                        <p>{email}</p>
                        <div className="mt-8">
                            {profile && profile.addresses && profile.addresses.length > 0 ? (
                                <>
                                    <h1 className="text-lg font-semibold">Delivery Address</h1>
                                    <div key={profile.addresses[0]._id} className="col-span-2">
                                        <p>{profile.addresses[0].label}</p>
                                        <p>{profile.addresses[0].street}, {profile.addresses[0].city}, {profile.addresses[0].state} - {profile.addresses[0].postalCode}</p>
                                        <p>{profile.addresses[0].country}</p>
                                        <p>Phone: {profile.addresses[0].phoneNumber}</p>
                                    </div>
                                </>
                            ) : (
                                <p>No addresses available</p>
                            )}
                        </div>
                    </div>

                    <div className="border bg-white p-4 md:p-6 m-2 md:m-6">
                        <div className='flex justify-between'>
                            <div className=''>
                                <p>Discounts</p>
                            </div>
                            <div className=''>
                                <p><u>Apply Discounts</u> </p>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className=''>
                                <p>Order value</p>
                                <p>Delivery</p>
                            </div>
                            <div className=''>
                                <p>Rs. {totalPrice}</p>
                                <p>Rs.{totalPrice > 1999 ? 'Free' : 149}</p>
                            </div>
                        </div>
                        <div className='border-2 border-white border-t-slate-400 flex justify-between my-5'>
                            <div className="mt-3">
                                <p className="font-bold">Total</p>
                            </div>
                            <div className="mt-3">
                                <p className="font-bold">Rs.{(parseFloat(totalPrice) + (totalPrice > 1999 ? 0 : 149)).toFixed(2)} </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => handleAddToOrders()} className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white hover:cursor-pointer">Complete Purchase</button>
                        </div>
                        <div className="border my-6 p-4 md:p-6">
                            <div className="">
                                <h1 className="text-lg font-semibold">Payment</h1>
                                <p>Rupay, Visa, Mastercard, AmazonPay</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Side */}

                <div className="border m-2 md:m-6 p-4 md:p-6">
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            <h1 className="text-lg font-semibold">Order Items</h1>
                            {cartItems.map((order) => (
                                <div key={order.productId.id} className="border rounded-lg p-4 mb-5 shadow-md">
                                    <p>{order.orderedAt}</p>
                                    <p>{order.paymentMethod}</p>
                                    <p>{order.status}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* {order.orderItems.map((item) => ( */}
                                        {/* key={item._id}  */}
                                        <div className="border p-2 rounded">
                                            <p>{order.productId.name}</p>
                                            <p>Quantity: {order.quantity}</p>
                                            <p>Size: {order.size}</p>
                                            <p>Rs. {order.productId.price}</p>
                                            <img src={order.productId.thumbnail} />
                                        </div>
                                        {/* ))} */}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No orders available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Checkout;