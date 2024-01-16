import { useState, useEffect } from "react";
import axios from "axios";
import "./AccordianItem.css";

const AccordionItem = ({ title, id, setTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/getTemplateByCategory/${id}`
        );
        console.log("Get Templates By Category", response.data);
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [id]);

  const handleImageClick = (template) => {
    const selectedTemplateArray = template.dimensions.map((element) => {
      return {
        file: element.url,
        left: element.left,
        top: element.top,
        width: element.width,
        height: element.height,
        rotation: element.rotation,
        features: true,
      };
    });
    setTemplate(selectedTemplateArray);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <div className={`arrow ${isOpen ? "open" : ""}`}>&#x25BC;</div>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {templates.map((template, index) => (
            <img
              key={index}
              src={template.snapshot.url}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(template)}
              className="accordion-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
