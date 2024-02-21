import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';

function CategorySelectList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId); // Pass the selected category ID to the parent component
  };

  const renderCategories = (categories, depth = 0) => {
    return categories.map(category => (
      <React.Fragment key={category.id}>
        <option value={category.id} style={{ paddingLeft: `${depth * 20}px` }}>
          {category.name}
        </option>
        {category.childCategories && renderCategories(category.childCategories, depth + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div>
     <select
        id="categories"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedCategory}
        onChange={handleCategorySelect}
      >
                {renderCategories(categories)}
      </select>
    </div>
  );
}

export default CategorySelectList;
