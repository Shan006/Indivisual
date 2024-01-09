import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import "../Company.css";

const AddCompany = ({ refreshList }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/createCompany`, { name });
      console.log(response.data);
      toast.success('Company Added Successfully.')
      setName('');
      refreshList();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div className="add-company-container">
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit} className="company-form">
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="company-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default AddCompany;
