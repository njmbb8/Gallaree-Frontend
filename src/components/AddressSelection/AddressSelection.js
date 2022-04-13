import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormLabel, FormSelect, Button, Row, ButtonGroup, Form } from "react-bootstrap";
import { authenticate } from "../../slices/User";
import AddressForm from "../AddressForm/AddressForm";
import { updateOrderItems } from "../../slices/Order";

function AddressSelection({shipping,setShipping}){
    const user = useSelector(state => state.user)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [addressFormMode, setAddressFormMode] = useState("")
    const [addressToEdit, setAddressToEdit] = useState({})
    const [addressOptions, setAddressOptions] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env
    const dispatch = useDispatch()

    useEffect(()=>{
         setAddressOptions(user.addresses.map((address) =>{
            if(address.shipping){
                setShipping(address)
            }
            return (
                <option key={address.id} value={address.id}>{address.address_line1}</option>
            )
        }))
    }, [])

    const blankAddress={
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        shipping: false
    }

    function updateAddress(){
        const addressData = new FormData()
        addressData.append('address_line1', shipping.address_line1)
        addressData.append('address_line2', shipping.address_line2)
        addressData.append('city', shipping.city)
        addressData.append('state', shipping.state)
        addressData.append('postal_code', shipping.zip)
        addressData.append('country', shipping.country)
        addressData.append('shipping', shipping.shipping)

        fetch(`${REACT_APP_BACKEND_URL}/address/${shipping.id}`,{
            method: 'PATCH',
            headers: {
                Accepts: 'application/json'
            },
            credentials: 'include',
            body:addressData
        })
        .then((data) => data.json)
        .then((ret)=>{
            const addresses = user.addresses.map((address) => {
                if(address.id === ret.id){
                    return ret
                }
                else{
                    return address
                }
            })
            dispatch(authenticate({...user, addresses: addresses}))
        })
    }

    function setShippingForOrder(e){
        const orderData = new FormData()
        orderData.append('shipping', e.target.value)
        fetch(`${REACT_APP_BACKEND_URL}/order/${user.active_order.id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: orderData
        })
        .then((data) => data.json())
        .then((ret) => {
            dispatch(updateOrderItems(ret))
            dispatch(authenticate({...user, active_order: ret}))
        })
    }

    function removeAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${shipping.id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(()=>{
            const addresses = user.addresses.filter((address) => address.id !== shipping.id)
            dispatch(authenticate({...user, addresses: addresses}))
        })
    }

    function displayAddressForm(e){
        setAddressFormMode(e.target.id)
        if(addressFormMode === "new"){
            setAddressToEdit(blankAddress)
        }
        else if(addressFormMode === "update"){
            setAddressToEdit(shipping)
        }
        setShowAddressForm(true)

    }

    return(
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Shipping Address:</Form.Label>
                    <Form.Select 
                        onChange={setShippingForOrder}
                        defaultValue={shipping.id}
                    >{addressOptions}</Form.Select>
                </Form.Group>
                <ButtonGroup>
                    <Button id="edit" onClick={displayAddressForm}>Edit Address</Button>
                    <Button variant="danger" onClick={removeAddress}>Delete Address</Button>
                    {shipping.shipping ? null : <Button>Make Default</Button>}
                </ButtonGroup>
                <Button id="new" onClick={displayAddressForm}>New Address</Button>
            </Form>
            {showAddressForm ? 
                <AddressForm 
                    mode={addressFormMode}
                    address={addressToEdit}
                    updateAddress={updateAddress}
                    showEdit={showAddressForm}
                    setShowEdit={setShowAddressForm}
                />
            : 
                null}
        </>

    )
}

export default AddressSelection