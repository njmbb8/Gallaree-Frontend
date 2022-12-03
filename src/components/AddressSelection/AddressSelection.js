import React from "react";
import AddressCard from "../AddressPanel/AddressCard/AddressCard";

function AddressSelection({addresses, setSelectedAddress, selectedAddress}){
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