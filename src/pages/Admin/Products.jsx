import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = (productId) => {
    console.log(productId);
    navigate(`/admin/products/${productId}`);
  };

  const handleAddNewProduct = () => {
    navigate('/admin/products/add');
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddNewProduct}
          className="mx-40 my-2 inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        >
          Add New Product
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='container mx-auto'>
        <table className="min-w-full divide-x-2 divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.quantity}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.price}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.description}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleUpdateProduct(product.id)}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Products;
