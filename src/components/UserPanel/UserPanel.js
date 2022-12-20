import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import CardPanel from "./CardPanel/CardPanel";
import AddressPanel from "./AddressPanel/AddressPanel";
import UserOrders from "./UserOrders/UserOrders";
import { useNavigate, useParams } from "react-router-dom";

function UserPanel({stripePromise}){
    const nav = useNavigate()
    const params = useParams()
    const activeKey = params['key']

    return(
        <>
            <Tabs
                defaultActiveKey={!activeKey?'Addresses':activeKey}
                onSelect={(key)=>nav(`/user/${key}`)}
            >
                <Tab eventKey="Addresses" title="Address Information">
                    <Row>
                        <AddressPanel />
                    </Row>
                </Tab>
                <Tab eventKey="Cards" title="Payment Cards">
                    <CardPanel stripePromise={stripePromise}/>
                </Tab>
                <Tab eventKey="Orders" title="Orders">
                    <UserOrders />
                </Tab>
            </Tabs>
        </>
    )

}

export default UserPanel