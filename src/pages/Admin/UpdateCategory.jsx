import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios';
import { toast } from 'react-toastify';

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    parentCategoryId: ''
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosClient.get(`/categories/${id}`);
        const categoryData = response.data;
        setFormData({
          id: categoryData.id,
          name: categoryData.name,
          parentCategoryId: categoryData.parentCategoryId || ''
        });
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    const fetchParentCategories = async () => {
      try {
        const response = await axiosClient.get('/categories');
        setParentCategories(response.data.filter(category => !category.parentCategoryId));
      } catch (error) {
        console.error('Error fetching parent categories:', error);
      }
    };

    fetchCategory();
    fetchParentCategories();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.put(`/categories/${id}`, formData);
      setLoading(false);
      console.log('Category updated successfully');
      toast.success('Category updated successfully', {
        onClose: () => {
          navigate('/admin/categories');
        }
      });
    } catch (error) {
      console.error('Error updating category:', error);
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        errors.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        toast.error('An error occurred while updating the category.');
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-large leading-6 text-gray-900 text-center mt-3" style={{ margin: '50px', fontWeight: 'bold', fontSize: '32px' }}>Update Category</h3>
      <form onSubmit={handleSubmit}>
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-8 shadow-lg">
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
                <div>
                  <label className="sr-only" htmlFor="parentCategoryId">Parent Category</label>
                  <select
                    id="parentCategoryId"
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    value={formData.parentCategoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Parent Category</option>
                    {parentCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
                  >
                    Update Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default UpdateCategory;
