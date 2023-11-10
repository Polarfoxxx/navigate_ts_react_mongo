import React from "react";
import { Marker } from "react-leaflet";
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { search_API } from "../../../API";

function MapSearch(): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, incident } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });



    React.useEffect(() => {
        fetchData()
    }, [])

   async function fetchData() {

    }






    return (
        <>

        </>
    );
};
export default MapSearch;