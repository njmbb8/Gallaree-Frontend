import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormLabel, FormSelect, Button, Row, ButtonGroup } from "react-bootstrap";
import { authenticate } from "../../slices/User";
function AddressSelection(){
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)
    const [showEdit, setShowEdit] = useState(false)
    const [addressMode, setAddressMode] = useState('')
    const [shipping, setShipping] = useState(null)
    const [billing, setBilling] = useState(null)
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
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: addrData
        })
        .then((data)=> data.json())
        .then((ret)=>{    
            dispatch(authenticate({...user, addresses: user.addresses.map((addr)=>{
                if(ret.id === addr.id){
                    return ret
                }
                else{
                    return addr
                }
            })
        }))
        })
    }

    function deleteAddress(address){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${address.id}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then(()=>{
            user.addresses = user.addresses.map((addr)=>{
                return address.id === addr.id ? null : addr
            })
            dispatch(authenticate(user))
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
        setAddressMode(addressMode !== 'edit'? 'edit':'')
        setShowEdit(!showEdit)
    }

    function expandNew(e){
        e.preventDefault()
        setAddressMode(addressMode !== 'new'? 'new':'')
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
                    <Button onClick={expandEdit} variant="primary">Edit</Button>
                    <Button onClick={deleteShipping} variant="danger">Remove</Button>
                    <Button onClick={defaultShipping} variant="primary">Make Default</Button>
                </ButtonGroup>
            </Row>
            <FormLabel htmlFor="billing">Billing Address:</FormLabel>
            <Row>
                <FormSelect id="billing" defaultValue={billing} onChange={(e)=>setBilling(e.target.value)}>
                    {addressOptions}
                </FormSelect>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button onClick={expandEdit} variant="primary">Edit</Button>
                    <Button onClick={deleteBilling} variant="danger">Remove</Button>
                    <Button onClick={defaultBilling} variant="primary">Make Default</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Button onClick={expandNew} variant="primary">New Address</Button>
            </Row>
        </>
    )
}

export default AddressSelection