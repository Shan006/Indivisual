import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import "../Category.css";

const AddCategory = ({ refreshList }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/createCategory`, { categoryName });
      console.log(response.data);
      toast.success('Category Added Successfully.')
      setCategoryName('');
      refreshList();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add Template Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="category-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default AddCategory;
