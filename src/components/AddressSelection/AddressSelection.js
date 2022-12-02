import React from "react";
import AddressCard from "../AddressPanel/AddressCard/AddressCard";
import { useEffect } from "react";

function AddressSelection({addresses, setSelectedAddress, selectedAddress}){

    useEffect(()=>{
        setSelectedAddress(addresses.find((addr)=>addr.shipping))
    }, [addresses])

    const addressCards = addresses.map((address) => <AddressCard 
                                                        address={address} 
                                                        addresses={addresses}
                                                        setSelectedAddress={setSelectedAddress}
                                                        selectedAddress={selectedAddress}
                                                        key={address.id}
                                                    />
                                        )

    return(
        <>
            {addressCards}
        </>
    )
}

export default AddressSelection