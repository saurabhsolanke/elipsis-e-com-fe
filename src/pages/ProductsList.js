import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { fetchProducts, getAllWishlist } from '../api';
import Cart from './Cart';

const limit = 10;
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [wishlists, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  useEffect(() => {
    const loadProducts = async () => {
      console.log('userid:', userid);
      try {
        const productsData = await fetchProducts(currentPage, limit,userid, token);
        setProducts(productsData);
        // Assuming totalResults is available in the response
        // setTotalProducts(response.data.totalResults); // Adjust this if needed
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    const loadWishlist = async (userid) => {
      try {
        const wishlistData = await getAllWishlist(userid); // Assuming getAllWishlist is defined
        setWishlist(wishlistData);
        console.log(wishlistData);
        
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };

    loadProducts();
    // loadWishlist();
  }, [currentPage]);

  return (
    <div className='div'>
      <div className="justify-start text-gray-700 dark:text-gray-500 text-3xl">
        <h1 className='m-8'>Products</h1>
      </div>
      <div className="mx-5 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} images={product.productImages.map(image => image.link)} thumbnail={product.thumbnail} />
        ))}
         {/* {wishlists.map((wishlistItem) => (
          <ProductCard key={wishlistItem.id} product={wishlistItem} images={wishlistItem.productImages.map(image => image.link)} thumbnail={wishlistItem.thumbnail} />
        ))} */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalProducts}
        itemsPerPage={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductsList;