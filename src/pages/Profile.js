import React, { useEffect, useState } from 'react';
import { getProfile, deleteAddress, editToprofile } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { addressId } = useParams();
    const navigate = useNavigate();
    const notify = () => toast("Added Product!");
    const notify1 = () => toast("Updated Product!");
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    const [activeIndex, setActiveIndex] = useState(null);

    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [isOrdersOpen1, setIsOrdersOpen1] = useState(false);
    const [isOrdersOpen2, setIsOrdersOpen2] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        gender: '',
        mobile: '',
        dateOfBirth: '',
    });

    const [address, setAddress] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
    })

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

    const removeAddress = async (id) => {
        try {
            await deleteAddress(id, token);
            setAddress(address.filter(item => item.id !== id));
            notify();
        } catch (err) {
            setError('Failed to remove item from cart');
        }
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
        setEditData({
            name: profile.name,
            gender: profile.gender,
            mobile: profile.mobile,
            dateOfBirth: profile.dateOfBirth.slice(0, 10),
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validGenders = ["Male", "Female", "Other"];
        if (!validGenders.includes(editData.gender)) {
            alert("Please select a valid gender.");
            return;
        }
        const response = await editToprofile(editData, userid, token);
        console.log('Product added successfully:', response);
        setIsModalOpen(false);
        notify1();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...address, [name]: value });
    };

    const toggleOrdersAccordion = () => {
        setIsOrdersOpen(!isOrdersOpen);
    };
    const toggleOrdersAccordion1 = () => {
        setIsOrdersOpen1(!isOrdersOpen1);
    };
    const toggleOrdersAccordion2 = () => {
        setIsOrdersOpen2(!isOrdersOpen2);
    };

    return (
        <div className='m-4 md:m-16'>
            <p className='text-3xl md:text-4xl m-6 flex justify-center'>Profile</p>
            {error && <p>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : profile && Object.keys(profile).length > 0 ? (

                <div key={profile._id}>
                    <div className='w-full md:w-1/2'>
                        <figure className="flex flex-col md:flex-row bg-slate-100 rounded-xl p-4 md:p-8">
                            <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="384" height="512" />
                            <div className="pt-4 md:pt-6 md:p-8 text-center md:text-left space-y-4"> {profile.userId}
                                <blockquote>
                                    <p className="text-lg font-medium"> Name: {profile.name} </p>
                                    <p className="text-lg font-medium">Gender: {profile.gender}</p>
                                    <p className="text-lg font-medium">Mobile: {profile.mobile}</p>
                                    <p className="text-lg font-medium"> Date of Birth {profile.dateOfBirth.slice(0, 10)}</p>
                                    <button onClick={handleEditClick} className="text-sm text-sky-500">Edit</button>
                                </blockquote>
                            </div>
                        </figure>
                    </div>

                    <div className="mx-auto my-8">
                        <div className="border-b border-gray-200 last:border-none">
                            <button onClick={toggleOrdersAccordion} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left">
                                <span className="font-medium text-gray-700">Address</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform duration-300 ${isOrdersOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 011.06-.02.75.75 0 01-.02 1.06l-4 3.5a.75.75 0 01-1.06 0l-4-3.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-[max-height] duration-300 ${isOrdersOpen ? 'max-h-auto' : 'max-h-0'}`}>
                                <div className="p-4 bg-white text-gray-600">
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        <div className='w-full rounded-lg align-middle flex items-center justify-center h-full bg-gray-100 p-6 text-gray-700 shadow-lg hover:shadow-none'>
                                            <a className='text-xs mr-2 rounded-lg bg-gray-400 px-5 py-2 font-semibold text-white cursor-pointer' href="/addeditaddress">Add address</a>
                                        </div>
                                        {profile.addresses && profile.addresses.length > 0 ? (
                                            profile.addresses.map((addr, index) => (
                                                <div key={index} className="w-full rounded-lg bg-gray-100 p-6 text-gray-700 shadow-lg hover:shadow-none">
                                                    <div className="flex w-full flex-col">
                                                        {addr.isDefault && (
                                                            <span className="w-1/3 flex justify-center rounded-md bg-cyan-500 py-0.5 px-2 text-xs font-normal text-white">Default</span>
                                                        )}
                                                        <div className="text-xl font-semibold">{addr.label}</div>
                                                        <div className="py-4 text-sm font-semibold">{addr.label} </div>
                                                        <div className="mt-2 text-sm">
                                                            <p>{addr.street}</p>
                                                            <p>{addr.postalCode}</p>
                                                            <p>{addr.city}</p>
                                                            <p>{addr.state}</p>
                                                            <p>{addr.country}</p>
                                                            <p>{addr.phoneNumber}</p>
                                                        </div>
                                                        <div className="mt-6 flex items-center justify-between space-x-2">
                                                            <div>
                                                                <a href={`/addeditaddress/${addr._id}`} className="rounded-md bg-gray-700 px-5 py-2 text-sm font-medium text-gray-100">Edit</a>
                                                            </div>
                                                            <a onClick={() => removeAddress(addr._id)} className="text-sm text-sky-500">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No addresses available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 last:border-none">
                            <button onClick={toggleOrdersAccordion1} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left">
                                <span className="font-medium text-gray-700">Orders</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform duration-300 ${isOrdersOpen1 ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 011.06-.02.75.75 0 01-.02 1.06l-4 3.5a.75.75 0 01-1.06 0l-4-3.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-[max-height] duration-300 ${isOrdersOpen1 ? 'max-h-40' : 'max-h-0'}`}>
                                <div className="p-4 bg-white text-gray-600">
                                    <p>Your orders will be displayed here.</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 last:border-none">
                            <button onClick={toggleOrdersAccordion2} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left">
                                <span className="font-medium text-gray-700">Returns</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform duration-300 ${isOrdersOpen2 ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 011.06-.02.75.75 0 01-.02 1.06l-4 3.5a.75.75 0 01-1.06 0l-4-3.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-[max-height] duration-300 ${isOrdersOpen2 ? 'max-h-40' : 'max-h-0'}`}>
                                <div className="p-4 bg-white text-gray-600">
                                    <p>Your orders will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content relative">
                                <span
                                    className="close"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    &times;
                                </span>
                                <form onSubmit={handleSubmit}>
                                    <label className="block mb-2">
                                        Name:
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </label>
                                    <label>
                                        Gender:
                                        <select
                                            name="gender"
                                            value={editData.gender}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </label>

                                    <label className="block mb-2">
                                        Mobile:
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={editData.mobile}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Date of Birth:
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={editData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </label>
                                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded mt-4">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}



                    <div className="my-6">
                        <button
                            // onClick={() => setIsOrdersOpen(!isOrdersOpen)} 
                            className="w-full text-left bg-gray-200 p-4 rounded-md focus:outline-none"
                        >
                            <h2 className="text-lg font-semibold">Orders</h2>
                        </button>
                        {/* {isOrdersOpen && ( */}
                        <div className="bg-gray-100 p-4 rounded-md mt-2">
                            {/* {orders.length > 0 ? ( */}
                            {/* orders.map(order => ( */}
                            <div className="border-b py-2">
                                <p><strong>Item:</strong> </p>
                                <p><strong>Date:</strong> </p>
                                <p><strong>Status:</strong></p>
                            </div>
                            {/* )) */}
                            {/* ) : ( */}
                            <p>No orders found.</p>
                            {/* )} */}
                        </div>
                        {/* )} */}
                    </div>
                </div>
            ) : (
                <p>empty</p>
            )}
        </div>
    )
}

export default Profile;