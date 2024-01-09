import React, { useState } from "react";
import "./Category.css";
import AddCategory from "./components/AddCategory";
import GetCategories from "./components/GetCategories";
import Navbar from "../Navbar";

const Category = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <>
    <div className="main">
      <Navbar/>
      <AddCategory refreshList={handleRefresh} />
      <GetCategories key={refreshList} />
    </div>
    </>
  );
};

export default Category;
