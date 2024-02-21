import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios';

const Home = () => {
  const { showToast, userToken } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/products', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        showToast('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, [userToken, showToast]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Home;
