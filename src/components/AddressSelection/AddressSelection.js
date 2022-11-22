import React from "react";
import AddressCard from "../AddressPanel/AddressCard/AddressCard";

function AddressSelection({addresses, setSelectedAddress, setEditMode}){
    const addressCards = addresses.map((address) => <AddressCard 
                                                        address={address} 
                                                        setSelectedAddress={setSelectedAddress}
                                                        key={address.id}
                                                        setEditMode={setEditMode}
                                                        />
                                        )

    return(
        <>
            {addressCards}
        </>
    )
}

export default AddressSelection