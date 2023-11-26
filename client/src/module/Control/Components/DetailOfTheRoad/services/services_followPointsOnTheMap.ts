import { useMap } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import { Container } from "../../../../Container";
import { SERVICES_MARKER_ICON } from "../../../../RouteMchine";

function ServicesFollowPointsOnTheMap(): null {
    const MAP = useMap();
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { markerInTheRoute } = sideWays_DATA;
    const [marker, setMarker] = React.useState<L.Marker | null>(null); // State pro marker

    useEffect(() => {
        if (marker) {
            marker.remove();
        };
        // Vytvoření nového markeru a přidání ho na mapu
        if (markerInTheRoute) {
            const newMarker = L.marker(markerInTheRoute,
                { icon: SERVICES_MARKER_ICON.moveIcon() }).addTo(MAP);
            setMarker(newMarker); // Uložení markeru do stavu
        };
    }, [markerInTheRoute]);

    return null;
}

export default ServicesFollowPointsOnTheMap;