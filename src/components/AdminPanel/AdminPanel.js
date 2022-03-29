import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AdminOrders from "../AdminOrders/AdminOrders";
import BioForm from "../BioForm/BioForm";
import ArtForm from "../ArtForm/ArtForm";

function AdminPanel({statuses}){
    return(
        <Tabs defaultActiveKey="orders">
            <Tab eventKey="orders" title="Orders">
                <AdminOrders/>
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