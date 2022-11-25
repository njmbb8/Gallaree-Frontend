import React from "react";
import { Row, Button } from "react-bootstrap";

function AddressPanelButtons({address, setAddress, setAddresses, addresses, editMode, setEditMode}){

    const {REACT_APP_BACKEND_URL} = process.env

    function removeAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${address.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setAddresses(
                addresses.reduce((result, addr) => {
                    data.forEach((updatedAddr)=>{
                        if(updatedAddr.id === addr.id &&
                            addr.id !== address.id
                        ){
                            result.push(updatedAddr)
                        } 
                    })
    
                    return result
                }, [])
            )
            clearForm()
        })
    }

    function updateAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${address.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address: address})
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setAddresses(
                addresses.map((addr)=>{
                    if(data.id === addr.id){
                        return data
                    }
                    else{
                        return addr
                    }
                })
            )
        })
    }

    function createNewAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setEditMode(!editMode)
            setAddresses([data, ...addresses])
        })
    }

    function clearForm(){
        setAddress({
            line1: '',
            line2: '',
            city: '',
            state: 'AL',
            postal_code: ''
        })
        setEditMode(false)
    }

    return(
        <>
            {
                editMode ?
                <Row>
                    <Button onClick={updateAddress}>Update</Button>
                    <Button onClick={removeAddress} variant="danger">Remove</Button>
                    <Button onClick={clearForm} variant="success">Clear Form</Button>
                </Row>
                :
                <Row>
                    <Button onClick={createNewAddress}>Create New</Button>
                </Row>
            }
        </>
    )
}

export default AddressPanelButtons