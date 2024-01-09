import React, { useState } from "react";
import "./Company.css";
import AddCompany from "./components/AddCompany";
import GetCompanies from "./components/GetCompanies";
import Navbar from "../Navbar";

const Company = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <>
    <div className="main">
      <Navbar/>
      <AddCompany refreshList={handleRefresh} />
      <GetCompanies key={refreshList} />
    </div>
    </>
  );
};

export default Company;
