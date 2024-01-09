import React, { useState } from "react";
import "./Case.css";
import Navbar from "../Navbar";
import AddCase from "./components/AddCase";
import UpdateCase from "./components/updateCase";
import GetCases from "./components/GetCases";

const Phone = () => {
  const [refreshList, setRefreshList] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateCase, setUpdateCase] = useState();

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <>
    <div className="main">
    <Navbar/>
      {
        updateFlag ? <UpdateCase refreshList={handleRefresh} Case={updateCase} Updateflag={setUpdateFlag}  /> : <AddCase refreshList={handleRefresh} />
      }
      <GetCases key={refreshList} Updateflag={setUpdateFlag} Record={setUpdateCase} />
    </div>
    </>
  );
};

export default Phone;
