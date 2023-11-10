import React from "react";
import { Marker, useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { search_API } from "../../../API";
import { services_zoomLevel, services_rectagleCoord_WinMap } from "..";

function MapSearch(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, incident, mapShops } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });




    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        if (mapShops) {
            const ALL_INCIDENTS_WIN = services_rectagleCoord_WinMap(mapsCurrentInfo.mapsRectangle);
            search_API( ALL_INCIDENTS_WIN )
        }

    }






    return (
        <>

        </>
    );
};
export default MapSearch;