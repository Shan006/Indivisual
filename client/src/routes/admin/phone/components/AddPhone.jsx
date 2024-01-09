import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import Resizer from "@meghoshpritam/react-image-file-resizer";
import '../Phone.css'; 

const AddPhone = ({ refreshList }) => {
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [images, setImages] = useState([]);

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
  }, []);

  const handleAddPhone = async (e) => {
    e.preventDefault(); 
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/createPhone`, { name, companyId, images });
      console.log('Phone added:', response.data);

      refreshList();
      toast.success('Phone Added Successfully.')
      setName('');
      setCompanyId('');
      setImages([]);
    } catch (error) {
      console.error('Error adding phone:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    const imageArray = [];
  
    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const reader = new FileReader();
      const img = new Image();
  
      img.onload = () => {
        const maxWidth = 200;
        const maxHeight = 400;

        console.log("Width of Image",img.width);
        console.log("Height of Image",img.height);
  
        if (img.width !== maxWidth || img.height !== maxHeight) {
          alert('Image dimensions should be (200x400) px.');
          return;
        }
  
        imageArray.push({ file: reader.result });
        if (imageArray.length === selectedImages.length) {
          setImages(imageArray);
        }
      };
  
      reader.onload = () => {
        if (file) {
          img.src = reader.result;
        }
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };  

  return (
    <div className="form-container">
      <h2>Add Phone</h2>
      <form className="phone-form" onSubmit={handleAddPhone}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyId">Company</label>
          <select
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button className="custom-button" type="submit">
          Add Phone
        </button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default AddPhone;
