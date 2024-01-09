import React, { useState } from "react";
import "./Phone.css";
import Navbar from "../Navbar";
import AddPhone from "./components/AddPhone";
import GetPhones from "./components/GetPhones";
import UpdatePhone from "./components/UpdatePhone";

const Phone = () => {
  const [refreshList, setRefreshList] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updatePhone, setUpdatePhone] = useState();

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <>
    <div className="main">
    <Navbar/>
      {
        updateFlag ? <UpdatePhone refreshList={handleRefresh} phone={updatePhone} Updateflag={setUpdateFlag}  /> : <AddPhone refreshList={handleRefresh} />
      }
      <GetPhones key={refreshList} Updateflag={setUpdateFlag} Record={setUpdatePhone} />
    </div>
    </>  
  );
};

export default Phone;
