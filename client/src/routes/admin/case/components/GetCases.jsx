import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../Case.css'; 

const GetCases = ({ key, Updateflag, Record }) => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCases`);
        console.log(response.data)
        let updatedCases = response.data.map((Case)=>{
          return{
            _id:Case._id,
            name:Case.name,
            color:Case.color,
            price:Case.price,
            phoneId : Case?.phoneId?._id,
            phoneName : Case?.phoneId?.name,
            description:Case.description,
            image:Case.image.url,
          }
        })
        setCases(updatedCases);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
    fetchCases();
  }, [key]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deleteCase/${id}`);
      toast.success('Case Deleted Successfully.')
      setCases(cases.filter((Case) => Case._id !== id));
    } catch (error) {
      console.error('Error deleting Case:', error);
    }
  };

  const handleUpdate = async (Case) => {
    console.log(Case);
    Updateflag(true);
    Record(Case);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'phoneName', headerName: 'Phone', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
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
      <h2>List of Cases</h2>
      <DataGrid
        rows={cases}
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

export default GetCases;
