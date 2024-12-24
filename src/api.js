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

export const fetchProducts = async (currentPage, limit,userid, token) => {
  try {
    const response = await axios.get(`${API_URL}/products/getAllProducts/${userid}`, {
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
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateProduct = async (productData) => {
  try {
    const { id, ...data } = productData;
    const response = await axios.patch(`${API_URL}products/${id}`, data);
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

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Cart

export const addToCartproduct = async (payload, token) => {
  try {
    const response = await axios.post(`${API_URL}cart`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
};

export const getAllCartItems = async (token) => {
  try {
    const response = await axios.get(`${API_URL}cart/getAllCarts`, {
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

export const addToWishlistproduct = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}wishlist`, { payload });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist', error);
    throw error;
  }
};

export const deleteWishlistItem = async (cartItemId, token) => {
  try {
    const response = await axios.delete(`${API_URL}wishlist/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

// Function to fetch all items in the wishlist
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
