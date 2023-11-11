import React from "react";
import { Marker, useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { search_API } from "../../../API";
import { services_zoomLevel, services_rectagleCoord_WinMap } from "..";





function MapSearch(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, mapPOI_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });


console.log(mapPOI_Category.type);
console.log(mapPOI_Category.status);


    React.useEffect(() => {
        fetchData()
    }, [mapPOI_Category.status])

    async function fetchData() {
        if (false) {
            const ALL_INCIDENTS_WIN = services_rectagleCoord_WinMap(mapsCurrentInfo.mapsRectangle);
            try {
               const DATA_API = await search_API( ALL_INCIDENTS_WIN )
                    console.log(DATA_API);
                    
 
            } catch  (error) {
                console.error(error);
            };
        }

    }






    return (
        <>

        </>
    );
};
export default MapSearch;