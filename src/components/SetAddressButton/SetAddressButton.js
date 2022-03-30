import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderItems } from "../../slices/Order";

function SetAddressButton({shipping, billing}){
    const order = useSelector(state => state.order)
    const {REACT_APP_BACKEND_URL} = process.env
    const dispatch = useDispatch()

    function setAddresses(e){
        e.preventDefault()

        fetch(`${REACT_APP_BACKEND_URL}/order/${order.id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify({...order, shipping_id: shipping, billing_id: billing})
        })
        .then((data)=>data.json())
        .then((ret)=>{
            dispatch(updateOrderItems(ret))
        })
    }

    return(
        <Button onClick={setAddresses}>Set Order Addresses</Button>
    )
}

export default SetAddressButton