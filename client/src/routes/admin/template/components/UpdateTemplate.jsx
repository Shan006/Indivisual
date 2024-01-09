import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as htmlToImage from 'html-to-image';
import toast, { Toaster } from 'react-hot-toast';
import { PositionableContainer, Position } from 're-position';
import Phone from "../../../../assets/iphone15C.png";
import DeleteIcon from '@mui/icons-material/Delete';
import "../Template.css";

const UpdateTemplate = ({ refreshList, template, Updateflag }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [customLayers, setCustomLayers] = useState([]);
    const [disableFunctionalities, setDisableFunctionalities] = useState(false);
    const [hideDeleteIcon, setHideDeleteIcon] = useState(false);

    useEffect(() => {
        if (template) {
          console.log("Template",template)
          setSelectedCategory(template.categoryId || '');
          const updatedLayers = template.dimensions.map(layer => {
            return { ...layer, features: true };
          });
          setCustomLayers(updatedLayers || []);
        }
      }, [template]);

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
      }, []);

    const handleTakeSnapshot = async () => {
        try {
            setDisableFunctionalities(true);
            setHideDeleteIcon(true); 
            
            var node = document.getElementById('preview-area');
    
            htmlToImage.toPng(node)
              .then(function (dataUrl) {
                return dataUrl;
            })
              .catch(function (error) {
                console.error('oops, something went wrong!', error);
            })
              .finally(() => {
                setDisableFunctionalities(false);
                setHideDeleteIcon(false);
              });
        } catch (error) {
          console.log(error);
        }
    };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const filePreview = e.target.result;
            const img = new Image();
            img.src = filePreview;
            img.onload = () => {
              const fileObj = {
                file: filePreview,
                left: '37.5%',
                top: '37.5%',
                width: "25%",
                height: "25%",
                rotation: '30deg',
                features:true,
              };
              setCustomLayers([...customLayers, fileObj]);
            };
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
      };    

      const handleUpdate = (newPosition, index) => {
        const updatedLayers = [...customLayers];
        updatedLayers[index] = newPosition;
        setCustomLayers(updatedLayers); 
      };

      const handleDelete = (index) => {
        const updatedLayers = customLayers.filter((_, idx) => idx !== index);
        setCustomLayers(updatedLayers);
      };

      const handleUpdateTemplate = async (e) => {
        e.preventDefault(); 
        try {
        const snapshotURL = await handleTakeSnapshot();
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/updateTemplate/${template._id}`, { category: selectedCategory , dimensions : customLayers, snapshot: snapshotURL });

        console.log('Template Updated:', response.data);

        refreshList();
        toast.success('Template Updated Successfully.')
        setSelectedCategory("");
        setCustomLayers([]);
        Updateflag(false);
        } catch (error) {
          console.error('Error Updating template:', error);
        }
      };

    return(
        <>
            <div className="update">
                <div className="inputs">
                    <h1 className="header">Update Template</h1>
                    <div className="category-input">
                    <label htmlFor="category" className="category-label">
                        Choose a category:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="category-select"
                    >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.categoryName}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className="file-input">
                    <label htmlFor="file-upload" className="file-label">
                        Customize:
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange}
                    />
                    </div>
                    <button onClick={handleUpdateTemplate}>Update Template</button>
                </div>
                <div className="preview" id="preview-area">
                    <img src={Phone} alt="Phone" className="preview-image" />
                    {customLayers.map((layer, index) => {
                        return(
                            <>
                                <PositionableContainer
                                className="position-container"
                                movable={!disableFunctionalities && layer.features}
                                resizable={!disableFunctionalities && layer.features}
                                rotatable={!disableFunctionalities && layer.features}
                                position={layer}
                                onUpdate={handleUpdate}
                                >
                                <img src={layer.file ? layer.file : layer.url} alt="Sticker" className="sticker" />
                                {!hideDeleteIcon && (
                                    <DeleteIcon onClick={() => handleDelete(index)} className="btn" />
                                )}
                                </PositionableContainer>
                            </>
                        )
                    })}
                </div>
                <Toaster 
                position="top-right"
                />
            </div>
        </>
    )
}

export default UpdateTemplate;