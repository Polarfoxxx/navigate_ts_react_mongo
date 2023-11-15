import React from "react";
import { Marker, useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { search_API } from "../../../API";
import { services_zoomLevel, services_rectagleCoord_WinMap } from "..";
import L from "leaflet"




function MapSearch(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, mapBussines_Category } = sideWays_DATA, {startPoints} = location_DATA
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });



console.log(mapBussines_Category.POI_Data);


    React.useEffect(() => {
        fetchData()
    }, [mapBussines_Category.status])

    if(startPoints.latLng[0]) {
        cicrcele()
    }
 
function cicrcele() {
    var circle = L.circle([startPoints.latLng[0], startPoints.latLng[1]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 130 /* parameter sedi v metroch */
    }).addTo(MAP);
}


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