import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import AdminOrderItem from "../AdminOrderItem/AdminOrderItem";
import { setError } from "../../slices/Error"

function AdminOrders(){
    const {REACT_APP_BACKEND_URL} = process.env
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/order`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((data)=>{
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret)=>{
            setOrders(ret)
        })
        .catch((error) => dispatch(setError(error)))
    }, [REACT_APP_BACKEND_URL])
    const orderRows = orders.map((order)=><AdminOrderItem order={order} key={order.id}/>)

    return(
        <>
            {orderRows}
        </>
    )
}

export default AdminOrders