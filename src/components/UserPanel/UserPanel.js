import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import UserOrders from "../UserOrders/UserOrders";
import AddressSelection from "../AddressSelection/AddressSelection";
import CardPanel from "../CardPanel/CardPanel";

function UserPanel({stripePromise}){
    return(
        <>
            <Tabs>
                <Tab eventKey="Addresses" title="Address Information">
                    <Row>
                        <AddressSelection />
                    </Row>
                </Tab>
                <Tab eventKey="Cards" title="Payment Cards">
                    <CardPanel stripePromise={stripePromise}/>
                </Tab>
            </Tabs>
        </>
    )

}

export default UserPanel