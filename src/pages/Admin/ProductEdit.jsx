import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import CategorySelectList from "../../components/CategoryList";
import axiosClient from '../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    categoryId: '',
    image: null
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/products/${id}`);
        setProduct(response.data);
        setFormData({
          id: id,
          name: response.data.name,
          quantity: response.data.quantity,
          price: response.data.price,
          description: response.data.description,
          categoryId: response.data.categoryId,
          image: response.data.image // Set image path when fetching product
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleCategorySelect = (categoryId) => {
    setFormData({
      ...formData,
      categoryId: categoryId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedProductData = new FormData();
      updatedProductData.append('id', id);
      updatedProductData.append('name', formData.name);
      updatedProductData.append('quantity', formData.quantity);
      updatedProductData.append('price', formData.price);
      updatedProductData.append('description', formData.description);
      updatedProductData.append('categoryId', formData.categoryId);

      if (formData.image) {
        updatedProductData.append('image', formData.image);
      }
      await axiosClient.put(`/products/${id}`, updatedProductData);

      // Update product image path after successful upload
      if (formData.image) {
        const reader = new FileReader();
        reader.onload = () => {
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: reader.result // Update image path
          }));
        };
        reader.readAsDataURL(formData.image);
      }

      setLoading(false);
      console.log('Product updated successfully');
      toast.success('Product updated successfully', {
        onClose: () => {
          navigate('/admin/products');
        }
      });

    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else {
        toast.error('An error occurred while updating the product.');
      }
    }
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-2 lg:py-12">
                <img className="rounded-full mx-auto" src={product.image ? product.image : "http://localhost:5005/" + product.imagePath} alt="" width="384" height="512" />
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <div className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Name"
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="quantity">Quantity</label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Quantity"
                        type="number"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="price">Price</label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Price"
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="description">Description</label>
                      <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Description"
                        rows="6"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div>
                      <CategorySelectList onSelectCategory={handleCategorySelect} />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ProductEdit;
