import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
import "./root.css";
import * as htmlToImage from 'html-to-image';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { PositionableContainer, Position } from 're-position';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import AccordionItem from "./components/AccordianItem";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Root = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activePhone, setActivePhone] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState({});
  const [phones, setPhones] = useState([]);
  const [phoneImages, setPhoneImages] = useState([]);
  const [customLayers, setCustomLayers] = useState([]);
  const [disableFunctionalities, setDisableFunctionalities] = useState(false);
  const [hideDeleteIcon, setHideDeleteIcon] = useState(false);
  const [printedCase, setPrintedCase] = useState('');
  const [editedText, setEditedText] = useState('');
  const [showTextEditorModal, setShowTextEditorModal] = useState(false)
  const [stickers, setStickers] = useState([]);
  const [showStickerModal, setShowStickerModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);
  const printModalRef = useRef(null);

  const  toolbarOptions  = {
      toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3] }],
          ["bold", "italic", "underline","strike"],
          [{ color: [] }, { background: [] }],
          [{ script:  "sub" }, { script:  "super" }],
          ["blockquote", "code-block"],
          [{ list:  "ordered" }, { list:  "bullet" }],
          [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
      ],
  };

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCompanies`);
        console.log("All Companies",response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }
    async function fetchCategories() {
      try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCategories`);
          console.log("All Categories",response.data);
          setCategories(response.data);
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
      }
      async function fetchStickers() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/stickers`);
            console.log("All Stickers",response.data);
            setStickers(response.data);
        } catch (error) {
            console.error('Error fetching cases:', error);
        }
      }
    fetchCompanies();
    fetchCategories();
    fetchStickers();
  }, []);

  const handleTakeSnapshot = () => {
    return new Promise((resolve, reject) => {
      try {
        setDisableFunctionalities(true);
        setHideDeleteIcon(true);
  
        var node = document.getElementById('preview-area');

        node.style.border = "none";
  
        htmlToImage.toPng(node)
          .then(function (dataUrl) {
            setDisableFunctionalities(false);
            setHideDeleteIcon(false);
  
            resolve(dataUrl);
          })
          .catch(function (error) {
            setDisableFunctionalities(false);
            setHideDeleteIcon(false);
  
            console.error('Oops, something went wrong!', error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };  

  const ShowStickers = () => {
    setShowStickerModal(true);
  }

  const handleSelectActivation = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSecondModal = () => {
    setSecondModalOpen(false);
  }

  const openTextEditorModal = () => {
    setShowTextEditorModal(true);
  };

  const closeTextEditorModal = () => {
    setShowTextEditorModal(false);
  };

  const closePrintModal = () => {
    setShowPrintModal(false);
  }

  const closeStickerModal = () => {
    setShowStickerModal(false);
  }

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const handleCompanyClick = async (companyName,companyId) => {
    const activeTabs = document.getElementsByClassName("activeCompany");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activeCompany");
      });
    }
    document.getElementById(companyName).classList.add("activeCompany");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getPhoneByCompany/${companyId}`);
      console.log("All Phones",response.data)
      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
      setPhones([]);
      setPhoneImages([]);
    }
  };

  const fetchCasesByPhone = async (phoneId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getPhoneCase/${phoneId}`);
        console.log("All Cases",response.data);
        setCases(response.data.cases);
    } catch (error) {
        console.error('Error fetching cases:', error);
    }
  }

  const handlePhoneClick = async (phoneName,phoneId) => {
    const activeTabs = document.getElementsByClassName("activePhone");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activePhone");
      });
    }
    document.getElementById(phoneName).classList.add("activePhone");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getImages/${phoneId}`);
      console.log("All Phone Images",response.data)
      setPhoneImages(response.data);
      fetchCasesByPhone(phoneId);
    } catch (error) {
      console.error('Error fetching phones:', error);
      setPhoneImages([]);
    }
  };

  const handleImageClick = (imgPublicId,imgUrl) => {
    const activeTabs = document.getElementsByClassName("activeImage");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activeImage");
      });
    }
    document.getElementById(imgPublicId).classList.add("activeImage");
    setActivePhone(imgUrl)
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

  const handleUpdate = (newPosition, index) => {
    const updatedLayers = [...customLayers];
    updatedLayers[index] = newPosition;
    setCustomLayers(updatedLayers); 
  };

  const handleDelete = (index) => {
    const updatedLayers = customLayers.filter((_, idx) => idx !== index);
    setCustomLayers(updatedLayers);
  };

  const HandleCardClick = (Case) => {
    setSelectedCase(Case);
    setActiveImage(Case.image.url);
    handleCloseSecondModal();
  }

  const PrintCase = async () => {
    handleTakeSnapshot()
      .then(async (snapshotURL) => {
        setPrintedCase(snapshotURL);
        setShowPrintModal(true);
      })
      .catch((error) => {
        console.error('Error adding template:', error);
      });
  };

  const StyleFont = () => {
    openTextEditorModal();
  }

  const AddEditedText = () => {
    const fileObj = {
      textDesc: editedText.toString(),
      left: '37.5%',
      top: '37.5%',
      width: "15%",
      height: "15%",
      rotation: '30deg',
      features:true,
    };
    setCustomLayers([...customLayers, fileObj]);
    closeTextEditorModal();
  }

  const AddSticker = (fileName) => {
    const fileObj = {
      file: `${import.meta.env.VITE_STICKERS_URI}/${fileName}`,
      left: '37.5%',
      top: '37.5%',
      width: "25%",
      height: "25%",
      rotation: '30deg',
      features:true,
    };
    setCustomLayers([...customLayers, fileObj]);
    closeStickerModal();
  }

  const ConfirmCase = () => {
    closePrintModal();
    openCartModal();
  }

  const NextStep = () => {
    handleCloseModal();
    setSecondModalOpen(true);
    setPhones([]);
    setPhoneImages([]);
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const handleOutsideClickSecondModal = (event) => {
    if (secondModalRef.current && !secondModalRef.current.contains(event.target)) {
      setSecondModalOpen(false);
    }
  };

  const handleOutsideClickPrintModal = (event) => {
    if (printModalRef.current && !printModalRef.current.contains(event.target)) {
      setShowPrintModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClickSecondModal);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickSecondModal);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClickPrintModal);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickPrintModal);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="main">
          <h2>Indivisual</h2>
          {
            customLayers.map((layer)=>{
              return(
                <>
                {layer.file ? (
                      <img src={layer.file} alt="Sticker" className="layer-imgs" />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: layer.textDesc }}
                        className="layer-text"
                      />
                    )}
                </>
              )
            })
          }
        </div>
        <div className="customize">
          <div className="select-print-btn">
            <div className="custom-select" onClick={handleSelectActivation} style={{cursor:"pointer"}}>
                <span>Select an option</span>
                <ArrowDropDownIcon />
            </div>
            <button onClick={PrintCase} className="print-btn">Print</button>
          </div>
          {modalOpen && (
            <div className="modal" ref={modalRef}>
            <div className="brand">
              <p>Brand</p>
                <div className="tab">
                  {
                    companies.map((company)=>{
                      return(
                        <>
                            <button
                              key={company._id}
                              id={company.name}
                              onClick={() => handleCompanyClick(company.name,company._id)}
                              style={{cursor:"pointer"}}
                            >
                              {company.name}
                            </button>
                        </>
                      )
                    })
                  }
                </div>
              </div>
              <div className="model">
                <p>Model</p>
                  <div>
                    {
                      phones.map((phone)=>{
                        return(
                          <>
                          <button
                          key={phone._id}
                          id={phone.name}
                          onClick={() => handlePhoneClick(phone.name,phone._id)}
                          style={{ cursor: "pointer" }}
                          >{phone.name}</button>
                          </>
                        )
                      })
                    }
                  </div>
              </div>
              <div className="color">
                <p>Color</p>
                <div className="images">
                {
                  phoneImages.map((img)=>{
                    return(
                      <>
                      <img
                      src={img.url}
                      key={img._id}
                      id={img.publicId}
                      onClick={() => handleImageClick(img.publicId,img.url)}
                      style={{ cursor: "pointer" }}
                      />
                      </> 
                    )
                  })
                }
                </div>
                <button className="nextStep" onClick={NextStep}>Next Step</button>
              </div>
            </div>
          )}
          {secondModalOpen && (
          <div className="second-modal" ref={secondModalRef}>
            {
              cases.map((Case)=>{
                return(
                  <>
                  <Card sx={{ maxWidth: 345 }} className="card" onClick={()=>HandleCardClick(Case)}>
                    <CardMedia
                      className="case-img"
                      sx={{ height: 200 }}
                      image={Case.image.url}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {Case.name}-{Case.color}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Case.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">{Case.price}.00 USD</Button>
                    </CardActions>
                  </Card>
                  </>
                )
              })
            }
          </div>
          )}
          {showPrintModal && (
            <div className="print-modal" ref={printModalRef}>
              <img src={printedCase} alt="Case" className="exported-img" />
              <button className="confirm-btn" onClick={ConfirmCase}>Confirm</button>
            </div>
          )}
          {showTextEditorModal && (
              <div className="text-editor-modal">
                <ReactQuill modules={toolbarOptions} theme="snow" onChange={setEditedText}/>
                  <button className="btns" onClick={AddEditedText}>Add Text</button>
                  <button className="btns" onClick={closeTextEditorModal}>Close</button>
              </div>
          )}
          {showStickerModal && (
              <div className="sticker-modal">
                <div className="sticker-item">
                  {stickers.map((sticker) => (
                    <img src={`${import.meta.env.VITE_STICKERS_URI}/${sticker.fileName}`} alt={sticker.fileName} onClick={()=> AddSticker(sticker.fileName)}/>
                  ))}
                </div>
                <button className="btns" onClick={closeStickerModal}>Close</button>
              </div>
          )}
          {showCartModal && (
              <div className="cart-modal">
                <h3>Selected Case Information</h3>
                <p>Image :</p>
                <img src={selectedCase.image.url} alt="SelectedCase" className="selected-case"/>
                <p>Name : {selectedCase.name}</p>
                <p>Phone : {selectedCase.phoneId.name}</p>
                <p>Color : {selectedCase.color}</p>
                <p>Price: {selectedCase.price}.00 USD</p>
                <button onClick={closeCartModal} className="btns">Close</button>
              </div>
          )}
          {
            activeImage && activePhone &&
            <div className="preview" id="preview-area">
              <img src={activePhone} alt="Phone" className="base-image" />
              <img src={activeImage} alt="Phone" className="overlay-image" />
              {
                customLayers.map((layer, index) => (
                  <PositionableContainer
                    key={index}
                    className="position-container"
                    movable={!disableFunctionalities && layer.features}
                    resizable={!disableFunctionalities && layer.features}
                    rotatable={!disableFunctionalities && layer.features}
                    position={layer}
                    onUpdate={(newPosition) => handleUpdate(newPosition, index)}
                  >
                    {layer.file ? (
                      <img src={layer.file} alt="Sticker" className="sticker" />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: layer.textDesc }}
                        className="text"
                      />
                    )}
                    {!hideDeleteIcon && (
                      <DeleteIcon onClick={() => handleDelete(index)} className="btn" />
                    )}
                  </PositionableContainer>
                ))
              }
            </div>
          }
         <div className="footer">
          <div className="custom-file-input">
              <label htmlFor="file-upload" className="file-label">
                <span>Image</span>
                <ImageIcon className="icon"/>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="custom-file-input">
              <label className="file-label" onClick={StyleFont}>
                <span>Font</span>
                <TextFieldsIcon className="icon"/>
              </label>
            </div>
            <div className="custom-file-input">
              <label className="file-label" onClick={ShowStickers}>
                <span>Sticker</span>
                <AttachFileIcon className="icon"/>
              </label>
            </div>
         </div>
         </div>
        <div className="template">
          <h2>Template</h2>
          {
            categories.map((category)=>{
              return(
                <>
                  <AccordionItem
                    title= {category.categoryName}
                    id={category._id}
                    setTemplate={setCustomLayers}
                  />
                </>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Root;
