import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../Case.css'; 

const AddCase = ({ refreshList }) => {
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

  const handleAddCase = async (e) => {
    e.preventDefault(); 
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/createCase`, { name, color, phoneId, description, image, price });
      console.log('Case added:', response.data);

      refreshList();
      toast.success('Case Added Successfully.')
      setName('');
      setColor('');
      setPrice('');
      setPhoneId('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Error adding Case:', error);
    }
  };

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  
  //   if (selectedImage) {
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  
  //     reader.readAsDataURL(selectedImage);
  //   }
  // };  

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const reader = new FileReader();
      const img = new Image();
  
      img.onload = () => {
        const maxWidth = 200;
        const maxHeight = 400;
  
        console.log("Width of Image:", img.width);
        console.log("Height of Image:", img.height);
  
        if (img.width !== maxWidth || img.height !== maxHeight) {
          alert('Image dimensions should be (200x400) px.');
          e.target.value = '';
          return;
        }

        reader.onload = () => {
          setImage(reader.result);
        };
  
        reader.readAsDataURL(selectedImage);
      };
  
      img.src = URL.createObjectURL(selectedImage);
    }
  };  

  return (
    <div className="form-container">
      <h2>Add Case</h2>
      <form className="case-form" onSubmit={handleAddCase}>
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
          Add Case
        </button>
      </form>
      <Toaster 
        position="top-right"
      />
    </div>
  );
};

export default AddCase;
