import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, updateProduct, deleteProduct, fetchProductById } from '../api';

const Products = () => {

  const limit = 10;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts(currentPage, limit, userid, token);
        setProducts(productsData);
        console.log(productsData);

        // Assuming totalResults is available in the response
        // setTotalProducts(response.data.totalResults); // Adjust this if needed
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, [currentPage]);
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, token); // Call the defined delete function
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      // Call the API to update the product
      await updateProduct(productId, updatedData); // Assuming updateProduct is defined in your API
      // Optionally, you can fetch the updated products or update the state directly
      const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, ...updatedData } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <div>
      <div className="flex m-4 w-full items-center justify-center space-x-2 text-sm font-normal text-gray-900 dark:text-gray-200">
        <div className="text-sky-600 dark:text-sky-400">Admin</div><span>/</span>
        <div className="text-sky-600 dark:text-sky-400">Products</div><span>/</span>
        <div className="text-sky-600 dark:text-sky-400">Products Dashboard</div><span>/</span>
      </div>

      <div className="flex-1 border">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Products Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 shadow-xl rounded">
              <h2 className="font-semibold">Total Products</h2>
              <p></p>
            </div>
            <div className="bg-white p-4 shadow-xl rounded">
              <h2 className="font-semibold">Total Orders</h2>
              <p>75</p>
            </div>
            <div className="bg-white p-4 shadow-xl rounded">
              <h2 className="font-semibold">Total Revenue</h2>
              <p>Rs.1,200</p>
            </div>
          </div>

          <div className="py-6">
            <button className='p-4 bg-gray-300 rounded hover:bg-gray-400'> <a href="/admin/addproduct">Add Product</a> </button>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>

            <div className="relative overflow-x-auto">
            {/* {isLoading ? (
                <div>Loading...</div>
              ) : (
                <> */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-xl">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} product={product} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.name}
                      </th>
                      <td className="px-6 py-4 ">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 ">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 ">
                        {product.price}
                      </td>
                      <td className='flex px-6 py-4'>
                        <Link to={`/editproduct/${product.id}`}>
                          <img src='/assets/pencil-square.svg' className='text-white' />
                        </Link>

                        <button className='px-6' onClick={() => handleDeleteProduct(product.id)}>
                          <img src='/assets/trash.svg' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* </>
              // )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products