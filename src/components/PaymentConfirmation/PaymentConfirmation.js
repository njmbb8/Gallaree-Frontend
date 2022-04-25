import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slices/Error"

function PaymentConfirmation(){
    const [paymentComplete, setPaymentComplete] = useState(false)
    const { REACT_APP_BACKEND_URL } = process.env
    const params = useParams()
    const user = useSelector(state => state.user)
    const order = user.active_order
    const [intervalID, setIntervalID] = useState(0)
    const dispatch = useDispatch()

    function checkForOrderUpdate(){
        fetch(`${REACT_APP_BACKEND_URL}/order/${params["id"]}`,{
            method: 'GET',
            credentials: 'include'
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
            if(ret.order_status !== order.order_status){
                setPaymentComplete(true)
            }
        })
        .catch((error) => dispatch(setError(error)))
    }

    useEffect(() => {
        setIntervalID(setInterval(checkForOrderUpdate, 1000))
    }, [])

    if(paymentComplete){
        clearInterval(intervalID)
    }

    return(
        <>
            {
                !paymentComplete?
                    <>
                        <TailSpin 
                            color="#00BFFF" 
                            height={80} 
                            width={80}
                            wrapperStyle = { {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} 
                        />
                        <h1>Completing payment, please do not leave this page</h1>
                    </>
                :
                    <>
                        <h1>Order Complete!</h1>
                    </>
            }
        </>
    )
}

export default PaymentConfirmation