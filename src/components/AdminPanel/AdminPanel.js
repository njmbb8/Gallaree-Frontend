import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import BioForm from "./BioForm/BioForm";
import ArtForm from "./ArtForm/ArtForm";
import UserOrders from "../UserPanel/UserOrders/UserOrders";

function AdminPanel({statuses}){
    return(
        <Tabs defaultActiveKey="orders">
            <Tab eventKey="orders" title="Orders">
                <UserOrders />
            </Tab>
            <Tab eventKey="bioInfo" title="Bio">
                <BioForm />
            </Tab>
            <Tab eventKey="Art" title="New Art">
                <ArtForm mode="upload" statuses={statuses}/>
            </Tab>
        </Tabs>
    )
}

export default AdminPanel