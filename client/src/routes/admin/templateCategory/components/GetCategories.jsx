import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../Category.css';

const GetCategories = ({ key }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCategories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, [key]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deleteCategory/${id}`);
      toast.success('Category Deleted Successfully.')
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'categoryName', headerName: 'Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Template Category List</h2>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        components={{ Toolbar: GridToolbar }}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default GetCategories;
