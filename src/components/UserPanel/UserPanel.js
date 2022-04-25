import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import UserOrders from "../UserOrders/UserOrders";
import AddressSelection from "../AddressSelection/AddressSelection";
import { setError } from "../../slices/Error"

function UserPanel(){
    const activeOrder = useSelector(state => state.order)
    const [orders, setOrders] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env 
    const [shipping, setShipping] = useState(activeOrder.address)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/order`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accepts': 'application/json'
            }
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret)=> setOrders(ret))
        .catch((error) => dispatch(setError(error)))
    }, [user])

    return(
        <>
            <Row>
                <Col>
                    <AddressSelection 
                        shipping={shipping} 
                        setShipping={setShipping}
                    />
                </Col>
                <Col>
                    <UserOrders orders={orders}/>
                </Col>
            </Row>
        </>
    )

}

export default UserPanel