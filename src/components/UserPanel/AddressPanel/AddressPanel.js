import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import AddressForm from "./AddressForm/AddressForm";
import AddressPanelButtons from "./AddressForm/AddressPanelButtons/AddressPanelButtons";
import AddressSelection from "./AddressSelection/AddressSelection";

function AddressPanel(){
    const {REACT_APP_BACKEND_URL} = process.env
    const [addresses, setAddresses] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)

    useEffect(() => {
        fetch(`${REACT_APP_BACKEND_URL}/addresses`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((ret) => ret.json())
        .then((data) => setAddresses(data))
    }, [REACT_APP_BACKEND_URL])

    return(
        !!addresses?
            <Row>
                <Col>
                    <AddressSelection 
                        addresses={addresses} 
                        setSelectedAddress={setSelectedAddress}
                        selectedAddress={selectedAddress}
                    />
                </Col>
                <Col>
                    <>
                        <AddressForm 
                            address={selectedAddress} 
                            setAddress={setSelectedAddress}
                        />
                        <AddressPanelButtons 
                            address={selectedAddress} 
                            setAddress={setSelectedAddress}
                            setAddresses={setAddresses} 
                            addresses={addresses}
                        />
                    </>
                </Col>
            </Row>
        :
            <TailSpin />
    )
}

export default AddressPanel