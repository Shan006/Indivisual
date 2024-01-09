import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../Phone.css'; 

const UpdatePhone = ({ refreshList, phone, Updateflag }) => {
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

  useEffect(() => {
    if (phone) {
      setName(phone.name || '');
      setCompanyId(phone.companyId || '');
      setImages(phone.images || []);
    }
  }, [phone]);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    const imageArray = [];
  
    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          imageArray.push({file : reader.result});
          if (imageArray.length === selectedImages.length) {
            // setImages(imageArray);
            setImages([...images,...imageArray])
          }
        }
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };  

  const handleUpdatePhone = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/updatePhone/${phone._id}`, { name, companyId, images: images });
      console.log('Phone Updated:', response.data);
  
      refreshList();
      toast.success('Phone Updated Successfully.')
      setName('');
      setCompanyId('');
      setImages([]);
      Updateflag(false);
    } catch (error) {
      console.error('Error updating phone:', error);
    }
  }; 
  

  return (
    <div className="form-container">
      <h2>Update Phone</h2>
      <form className="phone-form" onSubmit={handleUpdatePhone}>
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
          Update Phone
        </button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default UpdatePhone;
