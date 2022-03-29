import React, {useState, useEffect} from "react";
import AdminOrderItem from "../AdminOrderItem/AdminOrderItem";

function AdminOrders(){
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/orders`)
        .then((data)=>data.json())
        .then((ret)=>{
            setOrders(ret)
        })
    }, [REACT_APP_BACKEND_URL])
    const orderRows = orders.map((order)=><AdminOrderItem order={order}/>)

    return(
        <>
            {orderRows}
        </>
    )
}

export default AdminOrders