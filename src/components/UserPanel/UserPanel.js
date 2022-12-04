import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import CardPanel from "./CardPanel/CardPanel";
import AddressPanel from "./AddressPanel/AddressPanel";

function UserPanel({stripePromise}){
    return(
        <>
            <Tabs>
                <Tab eventKey="Addresses" title="Address Information">
                    <Row>
                        <AddressPanel />
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