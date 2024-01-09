import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../Company.css';

const GetCompanies = ({ key }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCompanies`);
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }
    fetchCompanies();
  }, [key]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deleteCompany/${id}`);
      console.log(response.data);
      toast.success('Company Deleted Successfully');
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="company-table" style={{ height: 400, width: '100%' }}>
      <h2>Company List</h2>
      <DataGrid
        rows={companies}
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

export default GetCompanies;
