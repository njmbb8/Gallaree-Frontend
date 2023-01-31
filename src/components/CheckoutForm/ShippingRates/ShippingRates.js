import React, { useState } from "react";
import { Builder } from "xml2js";

function ShippingRates({order, delivery}){
    const builder = new Builder()

    const json = {
        RateV4Request: {
            $: {
                USERID: "695GALLA6409"
            },
            Revision: 2,
            Package: []
        }
    }

    if(!!delivery){
        order.order_items.forEach((item)=>{
            json.RateV4Request.Package.push({
                $: {ID: item.id},
                Container: [''],
                Height: [`${item.height}`],
                Length: [`${item.length}`],
                Width: [`${item.width}`],
                Machinable: ['TRUE'],
                Pounds: [`${item.weight}`],
                Service: ['ONLINE'],
                ZipDestination: [`${delivery.postal_code}`],
                ZipOrigination: [`25314`]
            })
        })
    }

    const xml = builder.buildObject(json)

    return(
        !!delivery?
            <p>
                {xml}
            </p>
        :
            <p>
                "Select an address to calculate shipping"
            </p>
    )
}

export default ShippingRates