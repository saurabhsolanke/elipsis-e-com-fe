import React, { useEffect, useState } from 'react';
import { getAllWishlist } from '../api';

const Wishlist = () => {
  const [wishlistItems, setwishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchwishlistItems = async () => {
      try {
        const response = await getAllWishlist(userid, token); // Ensure you are getting the response
        const items = response.data.results; // Access the results array
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

  const removeFromwishlist = (id) => {
    setwishlistItems(wishlistItems.filter(item => item.id !== id)); // Remove item from wishlist
  };

  return (
    <div className="wishlist-page">
      <h1 className='m-8  text-gray-700 dark:text-gray-500 text-3xl'>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item flex justify-between items-center mx-64 border-b py-4">
              <div class="grid grid-cols-3 gap-4">
                <div class="...">
                  <div className="item-details">
                    <img src={item.thumbnail} style={{ height: '300px', width: '200px' }} />
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-lg font-medium">${item.price}</p>
                  </div>
                </div>
              </div>
              <button className="remove-button text-red-500 hover:text-red-700"
                onClick={() => removeFromwishlist(item.id)}>Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;