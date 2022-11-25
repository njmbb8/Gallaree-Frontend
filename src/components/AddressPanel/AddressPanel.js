import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddressForm from "../AddressForm/AddressForm";
import AddressPanelButtons from "../AddressForm/AddressPanelButtons/AddressPanelButtons";
import AddressSelection from "../AddressSelection/AddressSelection";

function AddressPanel(){
    const {REACT_APP_BACKEND_URL} = process.env
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        fetch(`${REACT_APP_BACKEND_URL}/addresses`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((ret) => ret.json())
        .then((data) => setAddresses(data))
    }, [])

    return(
        <Row>
            <Col>
                <AddressSelection 
                    addresses={addresses} 
                    setSelectedAddress={setSelectedAddress} 
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </Col>
            <Col>
                <AddressForm 
                    address={selectedAddress} 
                    setAddress={setSelectedAddress} 
                    addresses={addresses}
                    setAddresses={setAddresses}
                    setEditMode={setEditMode} 
                    editMode={editMode}
                />
                <AddressPanelButtons 
                    address={selectedAddress} 
                    setAddress={setSelectedAddress}
                    setAddresses={setAddresses} 
                    addresses={addresses}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </Col>
        </Row>
    )
}

export default AddressPanel