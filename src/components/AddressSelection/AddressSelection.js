import React from "react";
import AddressCard from "../AddressPanel/AddressCard/AddressCard";

function AddressSelection({addresses, setSelectedAddress, selectedAddress}){
    const addressCards = addresses.map((address) => <AddressCard 
                                                        address={address} 
                                                        setSelectedAddress={setSelectedAddress}
                                                        selectedAddress={!!selectedAddress ? selectedAddress : addresses.find((addr)=>addr.shipping)}
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