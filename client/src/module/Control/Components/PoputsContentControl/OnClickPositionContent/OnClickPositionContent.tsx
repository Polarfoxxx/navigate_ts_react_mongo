import React from "react";
import { Container } from "../../../../Container";
import { UseChangeContextDATA } from "../../../../hooks";
import { Type_Addrress, DEFAULT_VALUE_ADDRESS } from "../../../../Container";


type Type_forPositon_data = {
    ident: string,
    address: Type_Addrress
}


function OnClickPositionContent(): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
   const {location_markerPopupt} = sideWays_DATA;
   const [positon_data, setPosition_data] = React.useState<Type_forPositon_data>({
    ident: "",
    address: DEFAULT_VALUE_ADDRESS
   })
   
   React.useEffect(() => {
    
    const UPDATE_DATA = {
        ident: location_markerPopupt.data.ident,
        address: location_markerPopupt.data.address
    }
    setPosition_data(UPDATE_DATA)
   },[location_markerPopupt.data.ident])
   
   
   
    return (
        <div>
            <div>
                <h3>{positon_data.address.label}</h3>
            </div>
            <div>
        <button>Delete</button>
            </div>
        </div>
    );
};

export default OnClickPositionContent;