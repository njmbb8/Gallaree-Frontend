import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import CardPanel from "./CardPanel/CardPanel";
import AddressPanel from "./AddressPanel/AddressPanel";
import UserOrders from "./UserOrders/UserOrders";
import { useNavigate, useParams } from "react-router-dom";
import MessagesPanel from "./MessagesPanel/MessagesPanel";
import "./UserPanel.css"

function UserPanel({stripePromise}){
    const nav = useNavigate()
    const params = useParams()
    const activeKey = !params['key']?'addresses':params['key'].toLowerCase()

    return(
        <>
            <Tabs
                defaultActiveKey={activeKey}
                onSelect={(key)=>nav(`/user/${key}`)}
                className="fixed-top"
                justify
            >
                <Tab eventKey="addresses" title="Address Information">
                    <Row>
                        <AddressPanel />
                    </Row>
                </Tab>
                <Tab eventKey="cards" title="Payment Cards">
                    <CardPanel stripePromise={stripePromise}/>
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <UserOrders />
                </Tab>
                <Tab eventKey="messages" title="Inbox">
                    <MessagesPanel />
                </Tab>
            </Tabs>
        </>
    )

}

export default UserPanel