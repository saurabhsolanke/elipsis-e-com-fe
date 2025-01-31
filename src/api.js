import axios from 'axios';

// const API_URL = 'http://localhost:3000/main/';
const API_URL = 'http://64.23.179.100:3000/main/';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

// Products
// ?sortBy=name:asc&limit=10&page=1

export const fetchProducts = async (currentPage, limit, userid, token) => {
  try {
    const response = await axios.get(`${API_URL}products/getAllProducts/${userid}?page=${currentPage}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }, userid,
      // Uncomment and use params if needed
      // params: { limit, skip: (currentPage - 1) * limit },
    });
    return response.data.data.results; // Return the products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId, token) => {
  try {
    const response = await axios.get(`${API_URL}products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateProduct = async (productData, userid, token) => {
  try {
    const { id, ...data } = productData;
    const response = await axios.patch(`${API_URL}products/${userid}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`${API_URL}products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const addProduct = async (productData, userId, token) => {
  try {
    const response = await axios.post(`${API_URL}products/${userId}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Cart

export const addToCartproduct = async (payload, token, userid) => {
  try {
    const response = await axios.post(`${API_URL}cart/${userid}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (payload, cartItemId, token) => {
  try {
    const response = await axios.patch(`${API_URL}cart/${cartItemId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const getAllCartItems = async (userid, token) => {
  try {
    const response = await axios.get(`${API_URL}cart/getAllCarts/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items', error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await axios.delete(`${API_URL}cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};



// Wishlist

export const addToWishlistproduct = async (payload, token, userid) => {
  try {
    const response = await axios.post(`${API_URL}wishlist/${userid}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist', error);
    throw error;
  }
};

export const deleteWishlistItem = async (wishlistId, token) => {
  try {
    const response = await axios.delete(`${API_URL}wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export const getAllWishlist = async (userid, token) => {
  try {
    const response = await axios.get(`${API_URL}wishlist/getAllWishlist/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist items', error);
    throw error;
  }
};

// Profile

export const addToprofile = async (payload, token) => {
  try {
    const response = await axios.post(`${API_URL}profile`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
};

export const editToprofile = async (payload, userid, token) => {
  try {
    const response = await axios.post(`${API_URL}profile/${userid}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
};

export const getProfile = async (userid, token) => {
  try {
    const response = await axios.get(`${API_URL}profile/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items', error);
    throw error;
  }
};

export const deleteAddress = async (cartItemId, token) => {
  try {
    const response = await axios.delete(`${API_URL}profile/addresses/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};


// Addresses

export const fetchAddress = async (currentPage, limit, userid, token) => {
  try {
    const response = await axios.get(`${API_URL}profile/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }, userid,
    });
    return response.data.data.results; // Return the products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addAddress = async (address, userid, token) => {
  try {
    const response = await axios.post(`${API_URL}profile/addresses/${userid}`, address, {
      headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed here
    });
    return response.data;
  } catch (error) {
    console.error('Error adding address:', error); // Updated error message for clarity
    throw error;
  }
};

export const setDefaultAddress = async (addressId, userid, token) => {
  try {
    const response = await axios.patch(`${API_URL}profile/update-default-address/${userid}`, {
      addressId: addressId,
      isDefault: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};

export const updateAddress = async (address, userid, token) => {
  try {
    const { id, ...data } = address;
    const response = await axios.patch(`${API_URL}profile/update-default-address/${userid}`, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// orders

export const fetchOrders = async (userid, token) => {
  try {
    const response = await axios.get(`${API_URL}order/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }, userid,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addOrder = async (order, userid, token) => {
  try {
    const response = await axios.post(`${API_URL}order/${userid}`, order, {
      headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed here
    });
    return response.data;
  } catch (error) {
    console.error('Error adding Order:', error); // Updated error message for clarity
    throw error;
  }
};

export const updateProductSizes = async (productId, sizes, token) => {
  try {
    const response = await axios.patch(`${API_URL}products/updateSizes/${productId}`, { sizes }, {
      headers: {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
      }
    }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(
      `${API_URL}img-upload/uploads`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data; // Should return the image URL
  } catch (error) {
    throw error;
  }
};
