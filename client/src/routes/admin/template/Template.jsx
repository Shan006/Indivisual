import React,{ useState } from "react";
import "./Template.css";
import Navbar from "../Navbar"
import AddTemplate from "./components/AddTemplate";
import GetTemplates from "./components/GetTemplates";
import UpdateTemplate from "./components/UpdateTemplate";

const Template = () => {
    const [refreshList, setRefreshList] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [updateTemplate, setUpdateTemplate] = useState();

    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };
    return(
        <div className="main-cont">
            <Navbar/>
            <div className="components">
            {
                updateFlag ? <UpdateTemplate refreshList={handleRefresh} template={updateTemplate} Updateflag={setUpdateFlag}  /> : <AddTemplate refreshList={handleRefresh} />
            }
            <GetTemplates key={refreshList} Updateflag={setUpdateFlag} Record={setUpdateTemplate} />
            </div>
        </div>
    )
}

export default Template;