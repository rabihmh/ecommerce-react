import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import swal from 'sweetalert';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = (categoryId) => {
    console.log(categoryId);
    navigate(`/admin/categories/${categoryId}`);
  };

  const handleAddNewCategory = () => {
    navigate('/admin/categories/add');
  };

  const handleDeleteCategory = (categoryId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this category!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axiosClient.delete(`/categories/${categoryId}`);
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          );
          swal('Poof! Your category has been deleted!', {
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting category:', error);
          swal('Oops! Something went wrong!', {
            icon: 'error',
          });
        }
      } else {
        swal('Your category is safe!');
      }
    });
  };

  const renderCategory = (category) => (
    <tr key={category.id}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">{category.name}</td>
      <td className="whitespace-nowrap px-4 py-2 text-center">
        <button
          onClick={() => handleUpdateCategory(category.id)}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 mr-1"
        >
          <PencilIcon className="h-4 w-4 inline-block mr-1" />
          Edit
        </button>
        <button
          onClick={() => handleDeleteCategory(category.id)}
          className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
        >
          <TrashIcon className="h-4 w-4 inline-block mr-1" />
          Delete
        </button>
      </td>
    </tr>
  );

  const renderCategoryWithChildren = (category) => (
    <React.Fragment key={category.id}>
      {renderCategory(category)}
      {category.childCategories &&
        category.childCategories.map((childCategory) =>
          renderCategoryWithChildren(childCategory)
        )}
    </React.Fragment>
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddNewCategory}
          className="mx-40 my-2 inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        >
          Add New Category
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto">
          <table className="min-w-full divide-x-2 divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) =>
                renderCategoryWithChildren(category)
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
