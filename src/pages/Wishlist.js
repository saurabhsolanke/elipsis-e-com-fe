import React, { useEffect, useState } from 'react';
import { getAllWishlist, deleteWishlistItem } from '../api';

const Wishlist = () => {
  const [wishlistItems, setwishlistItems] = useState([]);
  const [wishlistItemid, setWishlistid1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchwishlistItems = async () => {
      try {
        const response = await getAllWishlist(userid, token); // Ensure you are getting the response
        const items = response.data.results; // Access the results array
        setWishlistid1(items.map(i => i.id));
        setwishlistItems(items.map(item => item.productId)); // Assuming you want to set productId for each item
        console.log(items); // Log the entire items array for debugging
      } catch (err) {
        setError('Failed to fetch wishlist items');
      } finally {
        setLoading(false);
      }
    };

    fetchwishlistItems();
  }, [token]);

  const handleDeleteProduct = async (wishlistId, token) => {
    try {
      console.log(token);

      await deleteWishlistItem(wishlistId, token);
      setwishlistItems(wishlistItems.filter(wishlistItems => wishlistItems.id !== wishlistId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="wishlist-page">
      <h1 className='m-8 text-gray-700 dark:text-gray-500 text-3xl'>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item flex flex-col md:flex-row justify-between items-center mx-4 md:mx-64 border-b py-4">
              <div className="w-full">
                <div className="flex">
                  <div className="item-details">
                    <img src={item.thumbnail} className="h-48 object-cover" />
                    <p className="hidden">id = {item.id}</p>
                  </div>
                  <div className='w-3/4 mt-5 ml-5'>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-lg font-medium">${item.price}</p>
                  </div>
                  <div className='justify-end'>
                    <button className="remove-button text-red-500 hover:text-red-700 mt-4 md:mt-0"
                      onClick={() => handleDeleteProduct(item.id)}>
                        <img src='/assets/trash.svg' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;