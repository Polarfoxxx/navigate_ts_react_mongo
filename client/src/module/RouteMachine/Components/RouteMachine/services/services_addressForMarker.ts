import { Type_Addrress, Type_location_DATA } from "../../../../Container";

type Type_forServices_addressForMarker = {
    allLocation: Type_location_DATA,
    markerIdent: string
};

function services_addressForMarker(props: Type_forServices_addressForMarker): Type_Addrress | undefined {
    console.log(props.markerIdent);

if(props.markerIdent === "start_points") {
    console.log(props.allLocation.startPoints.address);
    
    return(props.allLocation.startPoints.address)
}

    return undefined
};




export default services_addressForMarker;