import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormLabel, FormSelect, Button, Row, ButtonGroup } from "react-bootstrap";
import { authenticate } from "../../slices/User";
import AddressForm from "../AddressForm/AddressForm";

function AddressSelection({shipping, billing, setShipping, setBilling}){
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)
    const [showEdit, setShowEdit] = useState(false)
    const [addressMode, setAddressMode] = useState('')
    const [editShipping, setEditShipping] = useState(0)
    const [addrToEdit, setAddrToEdit] = useState(0)
    const blank = {
        address_line1: '',
        address_line2: '',
        city: '',
        state: 0,
        postal_code: '',
        country: '',
        shipping: false,
        billing: false
    }

    const addressOptions = user.addresses.map((address, index) => {
        if(address.shipping && shipping === null){
            setShipping(index)
        }
        else if(address.billing && billing === null){
            setBilling(index)
        }
        return <option key={address.id} value={index}>{`${address.address_line1}`}</option>
    })

    function updateAddresses(address){
        const addrData = new FormData()
        addrData.append('address_line1', address.address_line1)
        addrData.append('address_line2', address.address_line2)
        addrData.append('city', address.city)
        addrData.append('state', address.state)
        addrData.append('country', address.country)
        addrData.append('postal_code', address.postal_code)
        addrData.append('shipping', addrData.shipping)
        addrData.append('billing', address.billing)
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${address.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            },
            body: addrData
        })
        .then((data)=> data.json())
        .then((ret)=>{    
            console.log(ret)
            dispatch(authenticate({...user, addresses: [...user.addresses, ret]
        }))
        })
    }

    function deleteAddress(address){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${address.id}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then(()=>{
            dispatch(authenticate({...user, addresses: user.addresses.filter((addr)=>{
                return address.id !== addr.id
            })}))
        })
    }

    function deleteShipping(e){
        e.preventDefault()
        const removeAddress = user.addresses.find((address) => address.id === user.addresses[shipping].id)
        deleteAddress(removeAddress)
    }

    function deleteBilling(e){
        e.preventDefault()
        const removeAddress = user.addresses.find((address) => address.id === user.addresses[billing].id)
        deleteAddress(removeAddress)
    }

    function defaultShipping(e){
        e.preventDefault()
        const activeAddress = user.addresses.find((address) => address.id === user.addresses[shipping].id)
        updateAddresses({...activeAddress, shipping: true})
    }

    function defaultBilling(e){
        e.preventDefault()
        const activeAddress = user.addresses.find((address) => address.id === user.addresses[billing].id)
        updateAddresses({...activeAddress, billing: true})
    }

    function expandEdit(e){
        e.preventDefault()
        setAddressMode('edit')
        setEditShipping(e.target.id === 'shippingEdit'? 1 : 2)
        if(editShipping === 1){
            setAddrToEdit(user.addresses[shipping])
        }
        else if(editShipping === 2){
            setAddrToEdit(user.addresses[billing])
        }
        setShowEdit(!showEdit)
    }

    function expandNew(e){
        e.preventDefault()
        setAddrToEdit(blank)
        setAddressMode('new')
        setEditShipping(0)
        setShowEdit(!showEdit)
    }

    return(
        <>
            <FormLabel htmlFor="shipping">Shipping Address:</FormLabel>
            <Row>
                <FormSelect id="shipping" defaultValue={shipping} onChange={(e)=>setShipping(e.target.value)}>
                    {addressOptions}
                </FormSelect>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button id="shippingEdit" onClick={expandEdit} variant="primary">Edit</Button>
                    <Button onClick={deleteShipping} variant="danger">Remove</Button>
                    <Button onClick={defaultShipping} variant="primary">Make Default</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Button onClick={expandNew} variant="primary">New Address</Button>
            </Row>
            {
                showEdit && addrToEdit?
                    <AddressForm 
                        mode={addressMode}
                        address={addrToEdit}
                        updateAddress={updateAddresses}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                    />
                :
                null
            }
        </>
    )
}

export default AddressSelection