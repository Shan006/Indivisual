import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../Case.css'; 

const UpdateCase = ({ refreshList, Case, Updateflag }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [phoneId, setPhoneId] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhones] = useState([]);

  useEffect(() => {
    async function fetchPhones() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getPhones`);
        setPhones(response.data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    }
    fetchPhones();
  }, []);

  useEffect(() => {
    if (Case) {
      setName(Case.name || '');
      setColor(Case.color || '');
      setPrice(Case.price || '');
      setDescription(Case.description || '');
      setPhoneId(Case.phoneId || '');
      setImage(Case.image || '');
    }
  }, [Case]);

  const handleUpdateCase = async (e) => {
    e.preventDefault(); 
    try {
      
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/updateCase/${Case._id}`, { name, color, phoneId, description, image, price });
      console.log('Case Updated:', response.data);

      refreshList();
      toast.success('Case Updated Successfully.')
      setName('');
      setColor('');
      setPrice('');
      setPhoneId('');
      setDescription('');
      setImage('');
      Updateflag(false);
    } catch (error) {
      console.error('Error updating Case:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const reader = new FileReader();
  
      reader.onload = () => {
        setImage(reader.result);
      };
  
      reader.readAsDataURL(selectedImage);
    }
  };  

  return (
    <div className="form-container">
      <h2>Update Case</h2>
      <form className="case-form" onSubmit={handleUpdateCase}>
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
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneId">Phone</label>
          <select
            id="phoneId"
            value={phoneId}
            onChange={(e) => setPhoneId(e.target.value)}
          >
            <option value="">Select Phone</option>
            {phone.map((phone) => (
              <option key={phone._id} value={phone._id}>
                {phone.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>

        <button className="custom-button" type="submit">
          Update Case
        </button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default UpdateCase;
