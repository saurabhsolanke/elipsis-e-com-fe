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

    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2) // Calculate total price
        : '0.00';

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
        const fetchprofile = async () => {
            try {
                const response = await getProfile(userid, token);
                setProfile(response.data);
                setName(response.data.name);
                console.log(response.data);
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
        <div className='m-16'>
            <div className='mx-24 justify-center'>

                <h1>Checkout</h1>
                {/* Leftside */}
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                    <div className="col-span-2 border p-6 m-6">
                        <h1>My Information</h1>
                        <p>{name1}</p>
                        <p>{email}</p>
                    </div>

                    <div className="border m-6 p-6 col-span-2">
                        {profile && profile.addresses && profile.addresses.length > 0 ? (
                            <>
                                <h1>Billing Address</h1>
                                {/* {profile.addresses.map((address, index) => ( */}
                                <div key={profile.addresses[0]._id} className="col-span-2">
                                    <p>{profile.addresses[0].label}</p>
                                    <p>{profile.addresses[0].street}, {profile.addresses[0].city}, {profile.addresses[0].state} - {profile.addresses[0].postalCode}</p>
                                    <p>{profile.addresses[0].country}</p>
                                    <p>Phone: {profile.addresses[0].phoneNumber}</p>
                                </div>
                                {/* ))} */}
                            </>
                        ) : (
                            <p>No addresses available</p>
                        )}
                    </div>
                    <div className="col-span-2 border m-6 p-6">
                        {profile && profile.addresses && profile.addresses.length > 0 ? (
                            <>
                                <h1>Delivery Address</h1>
                                {profile.addresses
                                    .filter((address) => address.isDefault) // Filter addresses where isDefault is true
                                    .map((address) => (
                                        <div key={address._id} className="col-span-2">
                                            <p>{address.label}</p>
                                            <p>{address.street}, {address.city}, {address.state} - {address.postalCode}</p>
                                            <p>{address.country}</p>
                                            <p>Phone: {address.phoneNumber}</p>
                                        </div>
                                    ))}
                            </>
                        ) : (
                            <p>No addresses available</p>
                        )}

                    </div>
                    <div className="col-span-2 border m-6 p-6">
                        <div className="">
                            <h1>Order Details</h1>
                            <p> Order</p>
                        </div>
                    </div>


                    {/* <h1>View Order Details</h1> */}

                    {/* Right Side */}
                    <div className="row-span-3 p-6">
                        <div className="row-span-2 border bg-white">
                            <div className='flex justify-between m-6'>
                                <div className=''>
                                    <p>Discounts</p>
                                </div>
                                <div className=''>
                                    <p><u>Apply Discounts</u> </p>
                                </div>
                            </div>
                            <div className='flex justify-between m-6'>
                                <div className=''>
                                    <p>Order value</p>
                                    <p>Delivery</p>
                                </div>
                                <div className=''>
                                    <p>Rs. {totalPrice}</p>
                                    <p>Rs.{totalPrice > 1999 ? 'Free' : 149}</p>
                                </div>
                            </div>
                            <div className='border-2 border-white border-t-slate-400 flex justify-between m-5'>
                                <div className="mt-3">
                                    <p className="font-bold">Total</p>
                                </div>
                                <div className="mt-3">
                                    <p className="font-bold">Rs.{(parseFloat(totalPrice) + (totalPrice > 1999 ? 0 : 149)).toFixed(2)} </p>
                                </div>
                            </div>
                            <div className="flex justify-end m-5">
                                <button onClick={() => handleAddToOrders()} className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white hover:cursor-pointer">Complete Purchase</button>
                            </div>
                        </div>
                        <div className="col-span-2 border my-6 p-6">
                            <div className="">
                                <h1>Payment</h1>
                                <p>Rupay, Visa, Mastercard, AmazonPay</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkout;