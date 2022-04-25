import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { authenticate } from "../../slices/User";
import AddressForm from "../AddressForm/AddressForm";
import { updateOrderItems } from "../../slices/Order";
import { setError } from "../../slices/Error"

function AddressSelection({shipping,setShipping}){
    const user = useSelector(state => state.user)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [addressFormMode, setAddressFormMode] = useState("")
    const [addressToEdit, setAddressToEdit] = useState({})
    const [addressOptions, setAddressOptions] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env
    const dispatch = useDispatch()

    useEffect(()=>{
        const activeAddresses = user.addresses.filter((address)=>{
            return !address.archived
        })
         setAddressOptions(activeAddresses.map((address) =>{
            if(address.id === user.active_order.shipping_id || (address.shipping && user.active_order.shipping_id == null)){
                setShipping(address)
            }
            return (
                <option key={address.id} value={address.id}>{address.address_line1}</option>
            )
        }))
    }, [user, setShipping])

    const blankAddress={
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        shipping: false
    }

    function setShippingForOrder(e){
        const orderData = new FormData()
        orderData.append('shipping_id', e.target.value)
        fetch(`${REACT_APP_BACKEND_URL}/order/${user.active_order.id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: orderData
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret) => {
            dispatch(updateOrderItems(ret))
            dispatch(authenticate({...user, active_order: ret}))
        })
        .catch((error) => dispatch(setError(error)))
    }

    function removeAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${shipping.id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then((data)=>{
            if(data.ok){
                const addresses = user.addresses.filter((address) => address.id !== shipping.id)
                dispatch(authenticate({...user, addresses: addresses}))
            }
            else{
                dispatch(setError(data.json()))
            }
        })
    }

    function makeDefault(){
        const shippingData = new FormData()
        shippingData.append('shipping', true)
        fetch(`${REACT_APP_BACKEND_URL}/addresses/${shipping.id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: shippingData
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret)=>{
            setShipping(ret)
        })
        .catch((error) => dispatch(setError(error)))
    }

    useEffect(()=>{
        if(addressFormMode === "new"){
            setAddressToEdit(blankAddress)
        }
        else if(addressFormMode === "edit"){
            setAddressToEdit(shipping)
        }
        else if(addressFormMode === ""){
            setShowAddressForm(false)
            return
        }
        setShowAddressForm(true)
    }, [addressFormMode, shipping])

    return(
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Shipping Address:</Form.Label>
                    <Form.Select 
                        onChange={setShippingForOrder}
                        value={shipping.id}
                    >{addressOptions}</Form.Select>
                </Form.Group>
                <ButtonGroup className="w-100">
                    <Button id="edit" onClick={e => setAddressFormMode(e.target.id)}>Edit Address</Button>
                    <Button variant="danger" onClick={removeAddress}>Delete Address</Button>
                    {shipping.shipping ? null : <Button onClick={()=>makeDefault()}>Make Default</Button>}
                </ButtonGroup>
                <Button id="new" className="w-100" onClick={e => setAddressFormMode(e.target.id)}>New Address</Button>
            </Form>
            {showAddressForm ? 
                <AddressForm 
                    mode={addressFormMode}
                    address={addressToEdit}
                    showEdit={showAddressForm}
                    setShowEdit={setShowAddressForm}
                    setAddress={setShipping}
                    setMode={setAddressFormMode}
                />
            : 
                null}
        </>

    )
}

export default AddressSelection