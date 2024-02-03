import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./root.css";
import * as htmlToImage from "html-to-image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { PositionableContainer, Position } from "re-position";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import LayersIcon from "@mui/icons-material/Layers";
import CameraswitchOutlinedIcon from "@mui/icons-material/CameraswitchOutlined";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import AccordionItem from "./components/AccordianItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bestquality from "../../assets/bestQuality.webp";
import CartImg from '../../assets/cart-img.webp'
import productImg from '../../assets/valentine_spackage.webp'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Marquee from "react-fast-marquee";

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
  const [printedCase, setPrintedCase] = useState("");
  const [editedText, setEditedText] = useState("");
  const [showTextEditorModal, setShowTextEditorModal] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showEditor1, setShowEditor1] = useState(true);
  const [addToCart, setAddToCart] = useState(false);
  const [fileteredData,setFilteredData] = useState([])
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);
  const printModalRef = useRef(null);
  const [fileteredStickers,setFilteredStickers] = useState()
  const [subtotal,setSubtotal] = useState(30)
  const [quantity,setQuantity] = useState(1)
  const toolbarOptions = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const handleOnClick = (folder) => {
    console.log("Folder:", folder);
    const filteredItems = stickers.filter(item => item.fileName.startsWith(`${folder}_`));
    console.log("Filtered Items:", filteredItems);
    setFilteredStickers(filteredItems);
};


  const fetchCompanies = useMemo(() => async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCompanies`);
      console.log("All Companies", response.data);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  }, []);

  const fetchCategories = useMemo(() => async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/getCategories`);
      console.log("All Categories", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchStickers = useMemo(() => async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/stickers`);
      console.log("All Stickers", response.data);
      setStickers(response.data);
      setFilteredStickers(response.data)
    } catch (error) {
      console.error("Error fetching stickers:", error);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
    fetchCategories();
    fetchStickers();
  }, [fetchCompanies, fetchCategories, fetchStickers]);

  const handleTakeSnapshot = () => {
    return new Promise((resolve, reject) => {
      try {
        setDisableFunctionalities(true);
        setHideDeleteIcon(true);

        var node = document.getElementById("preview-area");

        node.style.border = "none";

        htmlToImage
          .toPng(node)
          .then(function (dataUrl) {
            setDisableFunctionalities(false);
            setHideDeleteIcon(false);

            resolve(dataUrl);
          })
          .catch(function (error) {
            setDisableFunctionalities(false);
            setHideDeleteIcon(false);

            console.error("Oops, something went wrong!", error);
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
  };

  const handleSelectActivation = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSecondModal = () => {
    setSecondModalOpen(false);
  };

  const openTextEditorModal = () => {
    setShowTextEditorModal(true);
  };

  const closeTextEditorModal = () => {
    setShowTextEditorModal(false);
  };

  const closePrintModal = () => {
    setShowPrintModal(false);
  };

  const closeStickerModal = () => {
    setShowStickerModal(false);
  };

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const toggleEditor = () => {
    setShowEditor1((prevShowEditor) => !prevShowEditor);
  };


  const handleAddToCart = () => {
    setAddToCart(!addToCart);
  };
  const handleCompanyClick = async (companyName, companyId) => {
    const activeTabs = document.getElementsByClassName("activeCompany");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activeCompany");
      });
    }
    document.getElementById(companyName).classList.add("activeCompany");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/getPhoneByCompany/${companyId}`
      );
      console.log("All Phones", response.data);
      setPhones(response.data);
    } catch (error) {
      console.error("Error fetching phones:", error);
      setPhones([]);
      setPhoneImages([]);
    }
  };

  const fetchCasesByPhone = async (phoneId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/getPhoneCase/${phoneId}`
      );
      console.log("All Cases", response.data);
      setCases(response.data.cases);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const handlePhoneClick = async (phoneName, phoneId) => {
    const activeTabs = document.getElementsByClassName("activePhone");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activePhone");
      });
    }
    document.getElementById(phoneName).classList.add("activePhone");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/getImages/${phoneId}`
      );
      console.log("All Phone Images", response.data);
      setPhoneImages(response.data);
      fetchCasesByPhone(phoneId);
    } catch (error) {
      console.error("Error fetching phones:", error);
      setPhoneImages([]);
    }
  };

  const handleImageClick = (imgPublicId, imgUrl) => {
    const activeTabs = document.getElementsByClassName("activeImage");
    if (activeTabs.length > 0) {
      [...activeTabs].forEach((element) => {
        element.classList.remove("activeImage");
      });
    }
    document.getElementById(imgPublicId).classList.add("activeImage");
    setActivePhone(imgUrl);
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
            left: "37.5%",
            top: "37.5%",
            width: "25%",
            height: "25%",
            rotation: "30deg",
            features: true,
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
  };

  const PrintCase = async () => {
    handleTakeSnapshot()
      .then(async (snapshotURL) => {
        setPrintedCase(snapshotURL);
        setShowPrintModal(true);
      })
      .catch((error) => {
        console.error("Error adding template:", error);
      });
  };

  const StyleFont = () => {
    openTextEditorModal();
  };

  const AddEditedText = () => {
    const fileObj = {
      textDesc: editedText.toString(),
      left: "37.5%",
      top: "37.5%",
      width: "15%",
      height: "15%",
      rotation: "30deg",
      features: true,
    };
    setCustomLayers([...customLayers, fileObj]);
    closeTextEditorModal();
  };

  const AddSticker = (fileName) => {
    const fileObj = {
      file: `${import.meta.env.VITE_STICKERS_URI}/${fileName}`,
      left: "37.5%",
      top: "37.5%",
      width: "25%",
      height: "25%",
      rotation: "30deg",
      features: true,
    };
    setCustomLayers([...customLayers, fileObj]);
    closeStickerModal();
  };

  const ConfirmCase = () => {
    closePrintModal();
    openCartModal();
  };

  const NextStep = () => {
    handleCloseModal();
    setSecondModalOpen(true);
    setActiveImage(false);
    setPhones([]);
    setPhoneImages([]);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const handleOutsideClickSecondModal = (event) => {
    if (
      secondModalRef.current &&
      !secondModalRef.current.contains(event.target)
    ) {
      setSecondModalOpen(false);
    }
  };

  const handleOutsideClickPrintModal = (event) => {
    if (
      printModalRef.current &&
      !printModalRef.current.contains(event.target)
    ) {
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

var counter=0;
useEffect(()=>{
   const getCat = () => {
    // if(!fileteredData){
      if(fileteredData.length < 1 ){

    const uniquePrefixes = new Set();
    const filteredObjects = [];
    for (const obj of stickers) {
        const fileName = obj.fileName;
        const prefix = fileName.split('_')[0]; // Assuming filenames are separated by underscores
    
        if (!uniquePrefixes.has(prefix)) {
            filteredObjects.push(obj);
            uniquePrefixes.add(prefix);
        }
    }
    
    setFilteredData(filteredObjects);
    counter++
    console.log("filteredObjects")
  // };}
  }
}
  getCat();
},[stickers])


const handleOp = (operator) =>
{
    if(operator === "-")
    setQuantity(quantity-1)
    else if(operator === "+")
    setQuantity(quantity+1)

    setSubtotal(quantity*30)
}
  return (
    <>
      <div className="container">
        <div className="main">
          <div className="logo">
            <h2>Indivisual</h2>
          </div>
          <div className="sidebar-layers">
            {customLayers.map((layer) => {
              return (
                <>
                  <div className="layers">
                    {layer.file ? (
                      <img
                        src={layer.file}
                        alt="Sticker"
                        className="layer-imgs"
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: layer.textDesc }}
                        className="layer-text"
                      />
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="customize">
          <div className="select-print-btn">
            <div
              className="custom-select"
              onClick={handleSelectActivation}
              style={{ cursor: "pointer" }}
            >
              <span>Select an option</span>
              <ArrowDropDownIcon />
            </div>
            <button onClick={PrintCase} className="print-btn">
              Print
            </button>
          </div>
          {modalOpen && (
            <div className="modal" ref={modalRef}>
              <div className="brand">
                <p>Brand</p>
                <div className="tab">
                  {companies.map((company) => {
                    return (
                      <>
                        <button
                          key={company._id}
                          id={company.name}
                          onClick={() =>
                            handleCompanyClick(company.name, company._id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {company.name}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="model">
                <p>Model</p>
                <div>
                  {phones.map((phone) => {
                    return (
                      <>
                        <button
                          key={phone._id}
                          id={phone.name}
                          onClick={() =>
                            handlePhoneClick(phone.name, phone._id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {phone.name}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="color">
                <p>Color</p>
                <div className="images">
                  {phoneImages.map((img) => {
                    return (
                      <>
                        <img
                          src={img.url}
                          key={img._id}
                          id={img.publicId}
                          onClick={() =>
                            handleImageClick(img.publicId, img.url)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    );
                  })}
                </div>
                <button className="nextStep" onClick={NextStep}>
                  Next Step
                </button>
              </div>
            </div>
          )}
          <div
            className={`${
              activeImage && activePhone
                ? "close-secondmodel"
                : "second-modal-container "
            }`}
          >
            <div
              className={` ${
                secondModalOpen ? "second-modal-active" : "second-modal"
              }`}
              ref={secondModalRef}
            >
              {secondModalOpen &&
                cases.map((Case) => (
                  <>
                    <Card
                      sx={{
                        display: "flex",
                        position: "relative",
                        height: "200px",
                        alignItems: "center",
                        background: "#f5f5f5",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                      }}
                      spacing={2}
                      onClick={() => HandleCardClick(Case)}
                    >
                      {/* <div
                        className="best-quality"
                        style={{
                          clipPath:
                            " polygon(0% 0%, 62% 0, 38% 23%, 23% 41%, 0 72%)",
                          background: "black",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 180,
                          bottom: 90,
                          padding: "10px",
                          color: "white",
                        }}
                      >
                        <p
                          style={{
                            transform: "rotate(-35deg)",
                            marginTop: "-20px",
                            marginLeft: "-20px",
                            fontSize: "12px",
                          }}
                        >
                          Best Quality
                        </p>
                      </div> */}
                      <CardMedia
                        className="case-img"
                        sx={{
                          width: 80,
                          height: 160,
                          objectFit: "contain",
                          marginLeft: "40px",
                          marginTop: "30px",
                        }}
                        image={Case.image.url}
                        title="green iguana"
                      ></CardMedia>

                      <CardContent
                        sx={{
                          flex: 1,
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {Case.name}-{Case.color}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            border: "1px solid #ccc",
                            padding: "3px",
                            borderRadius: "6px",
                            marginBottom: "60px",
                          }}
                          color="text.secondary"
                        >
                          {Case.description}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: "-20px",
                          }}
                        >
                          Price: {Case.price}.00 USD
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                ))}
            </div>
          </div>

          {showPrintModal && (
            <div className="print-modal" ref={printModalRef}>
              <img src={printedCase} alt="Case" className="exported-img" />
              <button className="confirm-btn" onClick={ConfirmCase}>
                Confirm
              </button>
            </div>
          )}
          {showTextEditorModal && (
            <div className="text-editor-modal">
              <ReactQuill
                modules={toolbarOptions}
                theme="snow"
                onChange={setEditedText}
              />
              <button className="btns" onClick={AddEditedText}>
                Add Text
              </button>
              <button className="btns" onClick={closeTextEditorModal}>
                Close
              </button>
            </div>
          )}
          {showStickerModal && (
            <div className="sticker-modal">
              
              <div className="cat" style={{display:"flex",justifyContent:"space-evenly",overflowX: "scroll"}}>
              {fileteredData.map((sticker) => (
                <div className="sticker-item">
                  <img 
                    key={sticker.id}
                    src={`${import.meta.env.VITE_STICKERS_URI}/${
                      sticker.fileName
                    }`}
                    
                    alt={sticker.fileName}
                    onClick={() => handleOnClick(sticker.fileName.split('_')[0])}
                  />
                  </div>
                ))}
              </div>
              <div className="sticker-item">
                {fileteredStickers && fileteredStickers.map((sticker) => (
                  <img
                    key={sticker.id}
                    src={`${import.meta.env.VITE_STICKERS_URI}/${
                      sticker.fileName
                    }`}
                    alt={sticker.fileName}
                    onClick={() => AddSticker(sticker.fileName)}
                  />
                ))}
              </div>
              <button className="btns" onClick={closeStickerModal}>
                Close
              </button>
            </div>
          )}
          {showCartModal && (
            // <div className="cart-modal">
            //   <h3>Selected Case Information</h3>
            //   <p>Image :</p>
            //   <img
            //     src={selectedCase.image.url}
            //     alt="SelectedCase"
            //     className="selected-case"
            //   />
            //   <p>Name : {selectedCase.name}</p>
            //   <p>Phone : {selectedCase.phoneId.name}</p>
            //   <p>Color : {selectedCase.color}</p>
            //   <p>Price: {selectedCase.price}.00 USD</p>
            //   <button onClick={closeCartModal} className="btns">
            //     Close
            //   </button>
            // </div>
            <div className="addtocart-modal">
              <div className="addtoCart">
                <div className="cart-header">
                  <a href="#">Get your own gallery of your design!</a>
                  <h2 className="cart-header-title">My Masterpiece</h2>
                  <div className="header-links"> 
                    <a href="#">Create A New One</a>
                    <a href="#" className="share-links">Share Links</a>
                  </div>
                </div>

                  <div className="cart-items">
                    <div className="cart-item">
                      <input className="checkbox" type="checkbox"></input>
                      <img src={printedCase} />

                      <div className="cart-item-details">
                        <div className="cart-item-title">
                        <div> 
                            <h3>Phone Case</h3>
                            <p>iphone 15 - Lime</p>
                          </div>
                          <h3 className="cart-item-price">30USD</h3>
                        </div>

                        <div className="cart-item-btns">
                          <a className="save-item">save image</a>
                          <a className="remove-item">remove item</a>
                        </div>

                        <div className="cart-item-counter">
                          <button onClick={()=>handleOp("-")}>-</button>
                          <p className="remove-item">{quantity}</p>
                          <button onClick={()=>handleOp("+")}>+</button>
                        </div>
                      </div>
                    </div>

                    <div className="cart-item">
                      <input className="checkbox" type="checkbox"></input>
                      <img src={CartImg} />

                      <div className="cart-item-details">
                        <div className="cart-item-title">
                        <div> 
                            <h3>Phone Case</h3>
                            <p>iphone 15 - Lime</p>
                          </div>
                          <h3 className="cart-item-price">30USD</h3>
                        </div>

                        <div className="cart-item-btns">
                          <a className="save-item">save image</a>
                          <a className="remove-item">remove item</a>
                        </div>

                        <div className="cart-item-counter">
                          <button>-</button>
                          <p className="remove-item">1</p>
                          <button>+</button>
                        </div>
                      </div>
                    </div>

                    <div className="cart-item">
                      <input className="checkbox" type="checkbox"></input>
                      <img src={CartImg} />

                      <div className="cart-item-details">
                        <div className="cart-item-title">
                        <div> 
                            <h3>Phone Case</h3>
                            <p>iphone 15 - Lime</p>
                          </div>
                          <h3 className="cart-item-price">30USD</h3>
                        </div>

                        <div className="cart-item-btns">
                          <a className="save-item">save image</a>
                          <a className="remove-item">remove item</a>
                        </div>

                        <div className="cart-item-counter">
                          <button>-</button>
                          <p className="remove-item">1</p>
                          <button>+</button>
                        </div>
                      </div>
                    </div>

                    <div className="cart-footer">
                    <div className="more"> <p>--------------</p> <a>MORE...</a> <p>--------------</p></div>
                    <button  className="create-new-btn">Create A New One</button>
                    </div>
                  </div>
                  <div className="cart-subtotals">
                    <div className="subtotal">
                      <div>
                        <h4>Subtotal</h4>
                        <h4>{subtotal}USD</h4>
                      </div>
                      <div>
                        <h4>Shipping</h4>
                        <h4>6.00 USD</h4>
                        <h4>49 USD+,</h4>
                        <h4>Free Shipping</h4>
                      </div>
                    </div>

                    <div className="estimate-total">
                      <div>
                        <h4>Estimated Total</h4>
                        <h4>30.00 USD</h4>
                      </div>

                      <div className="addtocart-btn">
                        <button onClick={handleAddToCart}>Add To Cart</button>
                        <div className="addtocart-icon"> <LocalMallOutlinedIcon/></div>
                      </div>
                    </div>

                    <div className="cart-subtotal-footer">
                      <input type="checkbox" checked className="privacy-check"/>
                      <a>our policy</a>
                      <a>conatct us</a>
                    </div>
                  </div>
              </div>

              <div className={`cartpage ${addToCart ? 'expanded' : ''}`}>
                <div className="cart-header">
                <div className="cartpage-title">
                  <h3>Your Cart</h3>
                  <p className="x-icon" onClick={handleAddToCart}><ClearOutlinedIcon/></p>
                </div>
                  <Marquee>
                    <h4 className="cartpage-marque">180-day free replacements for quality issues.</h4>
                  </Marquee>
                  <div className="cartpage-item-header"> 
                    <p href="#">Product</p>
                    <p href="#">Total</p>
                  </div>
                </div>

                <div className="cart-scroll">
                  <div className="cartpage-items">
                    <div className="cartpage-item">
                      <img src={CartImg} />
                      <div className="cartpage-item-details">
                        <div className="cartpage-item-title">
                          <div> 
                            <p>iphone 15 - Lime</p>
                            <p>$30</p>
                          </div>
                          <h3>$30</h3>
                        </div>
                        <div className="cartpage-counter">
                          <div className="cartpage-item-counter">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                          </div>
                          <div className="delete-icon">
                            <DeleteOutlineOutlinedIcon/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cartpage-item">
                      <img src={CartImg} />
                      <div className="cartpage-item-details">
                        <div className="cartpage-item-title">
                          <div> 
                            <p>iphone 15 - Lime</p>
                            <p>$30</p>
                          </div>
                          <h3>$30</h3>
                        </div>
                        <div className="cartpage-counter">
                          <div className="cartpage-item-counter">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                          </div>
                          <div className="delete-icon">
                            <DeleteOutlineOutlinedIcon/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cartpage-products">
                    <div className="product">
                      <img src={productImg}/>
                      <h3>Valentine theme</h3>
                      <div className="cartpage-prduct-price">
                        <p>$12</p>
                        <p className="old-price">$15</p>
                      </div>

                      <div className="add-btn">
                        <button>Add</button>
                      </div>
                    </div>
                    <div className="product">
                      <img src={productImg}/>
                      <h3>Valentine theme</h3>
                      <div className="cartpage-prduct-price">
                        <p>$12</p>
                        <p className="old-price">$15</p>
                      </div>

                      <div className="add-btn">
                        <button>Add</button>
                      </div>
                    </div>
                    <div className="product">
                      <img src={productImg}/>
                      <h3>Valentine theme</h3>
                      <div className="cartpage-prduct-price">
                        <p>$12</p>
                        <p className="old-price">$15</p>
                      </div>

                      <div className="add-btn">
                        <button>Add</button>
                      </div>
                    </div>
                    <div className="product">
                      <img src={productImg}/>
                      <h3>Valentine theme</h3>
                      <div className="cartpage-prduct-price">
                        <p>$12</p>
                        <p className="old-price">$15</p>
                      </div>

                      <div className="add-btn">
                        <button>Add</button>
                      </div>
                    </div>
                    </div>
                  </div>

                    <div className="cartpage-subtotals">
                      <div className="cartpage-subtotal">
                          <h4>Dsicount code /coupon</h4>
                          <input></input>
                      </div>

                      <div className="estimate-total">
                        <div>
                          <h4>Savings</h4>
                          <h4>$0 USD</h4>
                        </div>
                        <div>
                          <h4>Subtotal</h4>
                          <h4>$90 USD</h4>
                        </div>

                        <div className="cartpage-subtotal-shipping">
                        <h4>49 USD+, Free Shipping.</h4>
                        <p>Taxes and shipping calculated at chechkout.</p>
                      </div>

                        <div className="checkout-btn">
                          <button>Check out</button>
                          <div className="checkout-icon"> <HomeOutlinedIcon/></div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          )}
          {activeImage && activePhone && (
            <div className="preview" id="preview-area">
              <img src={activePhone} alt="Phone" className="base-image" />
              <img src={activeImage} alt="Phone" className="overlay-image" />
              {customLayers.map((layer, index) => (
                <PositionableContainer
                  key={index}
                  className="position-container"
                  movable={!disableFunctionalities && layer.features}
                  resizable={!disableFunctionalities && layer.features}
                  rotatable={!disableFunctionalities && layer.features}
                  position={layer}
                  onUpdate={(newPosition) => handleUpdate(newPosition, index)}
                  onClick={toggleEditor}
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
                    <DeleteIcon
                      onClick={() => handleDelete(index)}
                      className="btn"
                    />
                  )}
                </PositionableContainer>
              ))}
            </div>
          )}
          <div className="footer">
            {showEditor1 ? (
              <>
                <div className="custom-file-input">
                  <label className="file-label" onClick={ShowStickers}>
                    <AttachFileIcon className="icon" />
                    <span>Sticker</span>
                  </label>
                </div>

                <div className="custom-file-input">
                  <label className="file-label" onClick={StyleFont}>
                    <TextFieldsIcon className="icon" />
                    <span>Font</span>
                  </label>
                </div>

                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <ImageIcon className="icon" />
                    <span>Image</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <ImageIcon className="icon" />
                    <span>Image</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="custom-file-input">
                  <label className="file-label" onClick={StyleFont}>
                    <LayersIcon className="icon" />
                    <span>Layers</span>
                  </label>
                </div>

                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <CameraswitchOutlinedIcon className="icon" />
                    <span>Flip</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="custom-file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <OpenWithOutlinedIcon className="icon" />
                    <span>Move</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="template">
          <h2>Template</h2>
          {categories.map((category) => {
            return (
              <>
                <AccordionItem
                  title={category.categoryName}
                  id={category._id}
                  setTemplate={setCustomLayers}
                />
              </>
            );
          })}
        </div>

      {/* <div className="addtocart-modal">
          <div className="addtoCart">
            <div className="cart-header">
              <a href="#">Get your own gallery of your design!</a>
              <h2 className="cart-header-title">My Masterpiece</h2>
              <div className="header-links"> 
                <a href="#">Create A New One</a>
                <a href="#" className="share-links">Share Links</a>
              </div>
            </div>

              <div className="cart-items">
                <div className="cart-item">
                  <input className="checkbox" type="checkbox"></input>
                  <img src={CartImg} />

                  <div className="cart-item-details">
                    <div className="cart-item-title">
                    <div> 
                        <h3>Phone Case</h3>
                        <p>iphone 15 - Lime</p>
                      </div>
                      <h3 className="cart-item-price">30USD</h3>
                    </div>

                    <div className="cart-item-btns">
                      <a className="save-item">save image</a>
                      <a className="remove-item">remove item</a>
                    </div>

                    <div className="cart-item-counter">
                      <button>-</button>
                      <p className="remove-item">1</p>
                      <button>+</button>
                    </div>
                  </div>
                </div>

                <div className="cart-item">
                  <input className="checkbox" type="checkbox"></input>
                  <img src={CartImg} />

                  <div className="cart-item-details">
                    <div className="cart-item-title">
                    <div> 
                        <h3>Phone Case</h3>
                        <p>iphone 15 - Lime</p>
                      </div>
                      <h3 className="cart-item-price">30USD</h3>
                    </div>

                    <div className="cart-item-btns">
                      <a className="save-item">save image</a>
                      <a className="remove-item">remove item</a>
                    </div>

                    <div className="cart-item-counter">
                      <button>-</button>
                      <p className="remove-item">1</p>
                      <button>+</button>
                    </div>
                  </div>
                </div>

                <div className="cart-item">
                  <input className="checkbox" type="checkbox"></input>
                  <img src={CartImg} />

                  <div className="cart-item-details">
                    <div className="cart-item-title">
                    <div> 
                        <h3>Phone Case</h3>
                        <p>iphone 15 - Lime</p>
                      </div>
                      <h3 className="cart-item-price">30USD</h3>
                    </div>

                    <div className="cart-item-btns">
                      <a className="save-item">save image</a>
                      <a className="remove-item">remove item</a>
                    </div>

                    <div className="cart-item-counter">
                      <button>-</button>
                      <p className="remove-item">1</p>
                      <button>+</button>
                    </div>
                  </div>
                </div>

                <div className="cart-footer">
                <div className="more"> <p>--------------</p> <a>MORE...</a> <p>--------------</p></div>
                <button  className="create-new-btn">Create A New One</button>
                </div>
              </div>
              <div className="cart-subtotals">
                <div className="subtotal">
                  <div>
                    <h4>Subtotal</h4>
                    <h4>30.00 USD</h4>
                  </div>
                  <div>
                    <h4>Shipping</h4>
                    <h4>6.00 USD</h4>
                    <h4>49 USD+,</h4>
                    <h4>Free Shipping</h4>
                  </div>
                </div>

                <div className="estimate-total">
                  <div>
                    <h4>Estimated Total</h4>
                    <h4>30.00 USD</h4>
                  </div>

                  <div className="addtocart-btn">
                    <button onClick={handleAddToCart}>Add To Cart</button>
                    <div className="addtocart-icon"> <LocalMallOutlinedIcon/></div>
                  </div>
                </div>

                <div className="cart-subtotal-footer">
                  <input type="checkbox" checked className="privacy-check"/>
                  <a>our policy</a>
                  <a>conatct us</a>
                </div>
              </div>
          </div>

          <div className={`cartpage ${addToCart ? 'expanded' : ''}`}>
            <div className="cart-header">
            <div className="cartpage-title">
              <h3>Your Cart</h3>
              <p className="x-icon" onClick={handleAddToCart}><ClearOutlinedIcon/></p>
            </div>
              <Marquee>
                <h4 className="cartpage-marque">180-day free replacements for quality issues.</h4>
              </Marquee>
              <div className="cartpage-item-header"> 
                <p href="#">Product</p>
                <p href="#">Total</p>
              </div>
            </div>

            <div className="cart-scroll">
              <div className="cartpage-items">
                <div className="cartpage-item">
                  <img src={CartImg} />
                  <div className="cartpage-item-details">
                    <div className="cartpage-item-title">
                      <div> 
                        <p>iphone 15 - Lime</p>
                        <p>$30</p>
                      </div>
                      <h3>$30</h3>
                    </div>
                    <div className="cartpage-counter">
                      <div className="cartpage-item-counter">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                      </div>
                      <div className="delete-icon">
                        <DeleteOutlineOutlinedIcon/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cartpage-item">
                  <img src={CartImg} />
                  <div className="cartpage-item-details">
                    <div className="cartpage-item-title">
                      <div> 
                        <p>iphone 15 - Lime</p>
                        <p>$30</p>
                      </div>
                      <h3>$30</h3>
                    </div>
                    <div className="cartpage-counter">
                      <div className="cartpage-item-counter">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                      </div>
                      <div className="delete-icon">
                        <DeleteOutlineOutlinedIcon/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cartpage-products">
                <div className="product">
                  <img src={productImg}/>
                  <h3>Valentine theme</h3>
                  <div className="cartpage-prduct-price">
                    <p>$12</p>
                    <p className="old-price">$15</p>
                  </div>

                  <div className="add-btn">
                    <button>Add</button>
                  </div>
                </div>
                <div className="product">
                  <img src={productImg}/>
                  <h3>Valentine theme</h3>
                  <div className="cartpage-prduct-price">
                    <p>$12</p>
                    <p className="old-price">$15</p>
                  </div>

                  <div className="add-btn">
                    <button>Add</button>
                  </div>
                </div>
                <div className="product">
                  <img src={productImg}/>
                  <h3>Valentine theme</h3>
                  <div className="cartpage-prduct-price">
                    <p>$12</p>
                    <p className="old-price">$15</p>
                  </div>

                  <div className="add-btn">
                    <button>Add</button>
                  </div>
                </div>
                <div className="product">
                  <img src={productImg}/>
                  <h3>Valentine theme</h3>
                  <div className="cartpage-prduct-price">
                    <p>$12</p>
                    <p className="old-price">$15</p>
                  </div>

                  <div className="add-btn">
                    <button>Add</button>
                  </div>
                </div>
                </div>
              </div>

                <div className="cartpage-subtotals">
                  <div className="cartpage-subtotal">
                      <h4>Dsicount code /coupon</h4>
                      <input></input>
                  </div>

                  <div className="estimate-total">
                    <div>
                      <h4>Savings</h4>
                      <h4>$0 USD</h4>
                    </div>
                    <div>
                      <h4>Subtotal</h4>
                      <h4>$90 USD</h4>
                    </div>

                    <div className="cartpage-subtotal-shipping">
                    <h4>49 USD+, Free Shipping.</h4>
                    <p>Taxes and shipping calculated at chechkout.</p>
                  </div>

                    <div className="checkout-btn">
                      <button>Check out</button>
                      <div className="checkout-icon"> <HomeOutlinedIcon/></div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Root;
