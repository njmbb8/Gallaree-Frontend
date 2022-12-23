import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import BioForm from "./BioForm/BioForm";
import ArtForm from "./ArtForm/ArtForm";
import UserOrders from "../UserPanel/UserOrders/UserOrders";
import BlogForm from "./BlogForm/BlogForm";
import Conversations from "./Conversations/Conversations";
import { useNavigate, useParams } from "react-router-dom";

function AdminPanel(){
    const nav = useNavigate()
    const params = useParams()
    const activeKey = !!params['key'] ? params['key'].toLowerCase() : 'orders'

    return(
        <Tabs 
            defaultActiveKey={activeKey}
            onSelect={(key)=>nav(`/adminpanel/${key}`)}
            justify
            className="fixed-top"
        >
            <Tab eventKey="orders" title="Orders">
                <UserOrders />
            </Tab>
            <Tab eventKey="bioInfo" title="Bio">
                <BioForm />
            </Tab>
            <Tab eventKey="art" title="Art">
                <ArtForm mode="upload"/>
            </Tab>
            <Tab eventKey="blog" title="Blog">
                <BlogForm mode="upload" />
            </Tab>
            <Tab eventKey="message" title="Messages">
                <Conversations />
            </Tab>
        </Tabs>
    )
}

export default AdminPanel