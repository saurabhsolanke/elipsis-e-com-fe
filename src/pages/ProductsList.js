import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { fetchProducts, getAllWishlist, } from '../api';
import Cart from './Cart';

const limit = 10;
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [wishlists, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const loadProducts = async () => {
    setIsLoading(true);
    console.log('userid:', userid);
    try {
      const productsData = await fetchProducts(currentPage, limit, userid, token);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    const loadWishlist = async (userid) => {
      try {
        const wishlistData = await getAllWishlist(userid); // Assuming getAllWishlist is defined
        setWishlist(wishlistData);
        console.log(wishlistData);

      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    // loadWishlist();
  }, [currentPage]);

  return (
    <div className=''>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="justify-start text-gray-700 dark:text-gray-500 text-3xl">
            <h1 className='mx-8 my-3'>Products</h1>
          </div>
          <div className="md:mx-5 lg:mx-5 xl:mx-5 grid gap-x-2 gap-y-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            {products.map((product, index) => (
              <ProductCard
                key={`product-${product.id || index}`}
                loadProducts={loadProducts}
                product={product}
                images={product.productImages?.map(image => image.link)}
                thumbnail={product.thumbnail}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default ProductsList;