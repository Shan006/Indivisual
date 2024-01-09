import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import '../Phone.css'; 

const GetPhones = ({ key, Updateflag, Record }) => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getPhones`);
        console.log(response.data)
        let updatedPhones = response.data.map((phone)=>{
          return{
            _id:phone._id,
            name:phone.name,
            companyId : phone.companyId._id,
            companyName:phone.companyId.name,
            imageCount:phone.images.length,
            images:phone.images,
          }
        })
        setPhones(updatedPhones);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
    fetchPhones();
  }, [key]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deletePhone/${id}`);
      toast.success('Phone Deleted Successfully.')
      setPhones(phones.filter((phone) => phone._id !== id));
    } catch (error) {
      console.error('Error deleting phone:', error);
    }
  };

  const handleUpdate = async (phone) => {
    console.log(phone);
    Updateflag(true);
    Record(phone);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'companyName', headerName: 'Company', width: 200 },
    { field: 'imageCount', headerName: 'Image Count', width: 150 },
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
      <h2>List of Phones</h2>
      <DataGrid
        rows={phones}
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

export default GetPhones;
