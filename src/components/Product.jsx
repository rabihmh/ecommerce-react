import React from 'react';
import {useNavigate} from 'react-router-dom';

const Product = ({product}) => {
  const navigate = useNavigate();
  const addToCart = (ID) => {
    navigate(`/products/show/${ID}`);
  }
  return (
    <a href="#" className="group relative block overflow-hidden">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <img
        src={"http://localhost:5005/"+product.imagePath}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-indigo-500 px-3 py-1.5 text-xs font-medium">
          New
        </span>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1.5 text-sm text-gray-700">${product.price}</p>
        <form className="mt-4">
        <button className="block w-full rounded bg-indigo-500 p-3 text-sm font-medium transition hover:scale-105" onClick={() => addToCart(product.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Add to Cart
          </button>
        </form>
      </div>
    </a>
  );
};

export default Product;
