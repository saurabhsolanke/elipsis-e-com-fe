import React, { useEffect, useState } from 'react';
import { getProfile, updateAddress, addAddress, fetchAddress } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddEditAddress = () => {
    const { addressId } = useParams();
    const navigate = useNavigate();
    const notify = () => toast("Added Product!");
    const notify1 = () => toast("Updated Product!");
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');    

    const [address, setAddress] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    useEffect(() => {
        const fetchprofile = async () => {
            try {
                const response = await getProfile(userid, token);
                setProfile(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchprofile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if userid and token are defined
            if (!userid || !token) {
                console.error('User ID or Token is not defined');
                toast.error('User ID or Token is not available. Please log in again.');
                return; // Exit the function if either is not available
            }
    
            if (addressId) {
                const response = await updateAddress({ ...address}, userid, token );
                console.log('Address updated successfully:', response);
                navigate('/profile');
                notify1();
            } else {
                const response = await addAddress(address ,userid, token);
                console.log('Address added successfully:', response);
                navigate('/profile');
                notify();
            }
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };


    return (
        <div className='m-16'>
            <div className='flex justify-center text-4xl'>
                Add Address
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="">
                        <input type="text" name="label" placeholder="Name" value={address.label} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="postalCode" placeholder="Postal code" value={address.postalCode} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                    <div className="">
                        <input type="text" name="phoneNumber" placeholder="Phone" value={address.phoneNumber} onChange={handleChange} required className="border p-2 w-full" />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">{addressId ? 'Update Address' : 'Add Address'}</button>
                <ToastContainer />
            </form>
        </div>
    )
}


export default AddEditAddress;