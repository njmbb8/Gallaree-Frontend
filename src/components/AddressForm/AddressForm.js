import React, {useEffect, useState} from "react";
import { Offcanvas, Form, Row, Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { States } from "../../States";
import { authenticate } from "../../slices/User";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderItems } from "../../slices/Order";

function AddressForm({mode, address, setAddress, showEdit, setMode}){
    const [form, setForm] = useState(address)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)
    const order = useSelector(state => state.order)

    const stateOptions = States.map((state, index) => {
        return <option key={index} value={state["alpha-2"]}>{state["alpha-2"]}</option>
    })

    function setField(field, value){
        setForm({
            ...form,
            [field]: value
        })

        if( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    function findErrors(){
        const { address_line1, city, state, postal_code } = form

        if(!address_line1 || address_line1 === ''){
            errors.address_line1 = "Must not be empty"
        }

        if(!city || city === ''){
            errors.city = "Must not be empty"
        }

        if(!state || state === '' || state === 0){
            errors.state = "Pick a state"
        }

        if(!postal_code || postal_code === ''){
            errors.postal_code = "ZIP can not be empty"
        }
        else if(postal_code.length !== 5){
            errors.postal_code = "ZIP must be 5 digits"
        }
        else if(isNaN(postal_code)){
            errors.postal_code = "ZIP must be numerical"
        }

        Object.keys(errors).forEach(key =>{
            if(errors[key]){
                delete errors[key]
            }
        })

        return errors
    }

    function createAddress(){
        const addressData = new FormData()
        addressData.append('address_line1', form.address_line1)
        addressData.append('address_line2', form.address_line2)
        addressData.append('city', form.city)
        addressData.append('postal_code', form.postal_code)
        addressData.append('state', form.state)
        addressData.append('country', form.country)
        addressData.append('shipping', form.shipping)
        addressData.append('billing', form.billing)

        fetch(`${REACT_APP_BACKEND_URL}/addresses`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": 'application/json'
            },
            body: addressData
        })
        .then((data) => data.json())
        .then((ret) => {
            dispatch(authenticate({...user, addresses: [...user.addresses, ret]}))
            dispatch(updateOrderItems({...order, shipping_id: ret.id}))
            setAddress(ret)
        })
    }

    function updateAddress(){
        const addressData = new FormData()
        addressData.append('address_line1', form.address_line1)
        addressData.append('address_line2', form.address_line2)
        addressData.append('city', form.city)
        addressData.append('state', form.state)
        addressData.append('postal_code', form.postal_code)
        addressData.append('country', form.country)
        addressData.append('shipping', form.shipping)

        fetch(`${REACT_APP_BACKEND_URL}/addresses/${form.id}`,{
            method: 'PATCH',
            headers: {
                Accepts: 'application/json'
            },
            credentials: 'include',
            body:addressData
        })
        .then((data) => data.json())
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

    function handleSubmit(e){
        e.preventDefault()
        const foundErrors = findErrors()
        if(Object.entries(foundErrors).length > 0){
            setErrors(foundErrors)
        }
        else{
            if(mode === "new"){
                createAddress()
            }
            else if(mode === "edit"){
                updateAddress()
            }
        }
    }

    return(
        <Offcanvas show={showEdit} onHide={()=>setMode("")} placement="end">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={e => setField('address_line1', e.target.value)}
                            value={form.address_line1}
                            isInvalid={!!errors.address_line1}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address_line1}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={e => setField('address_line2', e.target.value)}
                            value={form.address_line2}
                            isInvalid={!!errors.address_line2}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address_line2}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={e => setField('city', e.target.value)}
                            value={form.city}
                            isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            defaultValue={form.state}
                            onChange={e => setField('state', e.target.value)}
                            isInvalid={!!errors.state}
                        >
                            {stateOptions}
                        </Form.Select>
                        <Form.Control.Feedback>
                            {errors.state}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>ZIP</Form.Label>
                        <Form.Control
                            type="text"
                            value={form.postal_code}
                            onChange={e => setField('postal_code', e.target.value)}
                            isInvalid={!!errors.postal_code}
                        />
                        <Form.Control.Feedback>
                            {errors.postal_code}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            value={form.country}
                            onChange={e => setField('country', e.target.value)}
                            isInvalid={!!errors.country}
                        />
                        <Form.Control.Feedback>
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <ToggleButtonGroup type="checkbox">
                        <ToggleButton
                            id="defaultAddress"
                            type="checkbox"
                            value={{label: form.shipping}}
                            checked={form.shipping}
                            onChange={(e) => {
                                setField('shipping', e.target.checked)
                            }}
                        >
                            Default  Shipping
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Row>
                <Button type="submit">Submit</Button>
            </Form>
        </Offcanvas>
    )
}

export default AddressForm