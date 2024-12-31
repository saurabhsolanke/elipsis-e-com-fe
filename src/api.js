import axios from 'axios';

const API_URL = 'http://localhost:3000/main/';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

// Products

export const fetchProducts = async (currentPage, limit, userid, token) => {
  try {
    const response = await axios.get(`${API_URL}products/getAllProducts/`, {
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

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateProduct = async (productData, token) => {
  try {
    const { id, ...data } = productData;
    const response = await axios.patch(`${API_URL}products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data; // Return confirmation of deletion
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

export const getAllCartItems = async (token, userid) => {
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