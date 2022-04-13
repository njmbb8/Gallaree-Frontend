import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import UserOrders from "../UserOrders/UserOrders";
import AddressSelection from "../AddressSelection/AddressSelection";

function UserPanel(){
    const activeOrder = useSelector(state => state.order)
    const [orders, setOrders] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env 
    const [shipping, setShipping] = useState(activeOrder.address)
    
    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/orders`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accepts': 'application/json'
            }
        })
        .then((data) => data.json())
        .then((ret)=> setOrders(ret))
    }, [])

    return(
        <>
            <Col>
                <AddressSelection 
                    shipping={shipping} 
                    setShipping={setShipping}
                />
            </Col>
            <Col>
                <UserOrders orders={orders}/>
            </Col>
        </>
    )

}

export default UserPanel