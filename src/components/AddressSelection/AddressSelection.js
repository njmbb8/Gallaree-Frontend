import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { authenticate } from "../../slices/User";
import AddressForm from "../AddressForm/AddressForm";
import { updateOrderItems } from "../../slices/Order";
import { setError } from "../../slices/Error"
import AddressCard from "../AddressPanel/AddressCard/AddressCard";

function AddressSelection({addresses, setSelectedAddress, setEditMode}){
    const addressCards = addresses.map((address) => <AddressCard 
                                                        address={address} 
                                                        setSelectedAddress={setSelectedAddress}
                                                        key={address.id}
                                                        setEditMode={setEditMode}
                                                        />
                                        )

    return(
        <>
            {addressCards}
        </>
    )
}

export default AddressSelection