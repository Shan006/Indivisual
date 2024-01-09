import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../Template.css';

const GetTemplates = ({ key, Updateflag, Record }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getTemplates`);
        console.log(response.data);
        let updatedTemplates = response.data.map((template)=>{
          return{
            _id:template._id,
            category:template.category.categoryName,
            categoryId:template.category._id,
            dimensions:template.dimensions
          }
        })
        setTemplates(updatedTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    fetchTemplates();
  }, [key]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deleteTemplate/${id}`);
      toast.success('Template Deleted Successfully.');
      setTemplates(templates.filter((template) => template._id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleUpdate = async (template) => {
    Updateflag(true);
    Record(template);
  };

  const columns = [
    { field: '_id', headerName: 'Id', width: 150 },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleUpdate(params.row)}>
            Update
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>List of templates</h2>
      <DataGrid
        rows={templates}
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

export default GetTemplates;
