import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Container } from "../../../Container";
import services_markerIcon from "./services/marker_Icon_services";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import services_routeDetail from "./services/services_routeDetail";
import { UseChangeContextDATA } from "../../../hooks";
import { services_theMatchOfTheCreatedObject } from "../../../LocationUserInfo";
import services_addressForMarker from "./services/services_addressForMarker";

function RouteMachine() {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const { startPoints, endPoints, intermediatePoints, main_atl_route } = location_DATA
    const [routingControl, setRoutingControl] = React.useState(null);
    const timeoutReff = React.useRef(null);


    React.useEffect(() => {
        const START_POINT = startPoints;
        const END_POINT = endPoints;
        const ADD_CORD_POINT = intermediatePoints.map((item) => item.latLng);

        /* pousun mapy na prvy marker */
      /*   if (START_POINT.address.label && !END_POINT.address.label) {
            MAP.flyTo([START_POINT.latLng[0], START_POINT.latLng[1]]);
        }; */

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(START_POINT.latLng[0], START_POINT.latLng[1]),
                ...ADD_CORD_POINT,
                L.latLng(END_POINT.latLng[0], END_POINT.latLng[1]),
            ],
            routeWhileDragging: true,
            showAlternatives: true,
            show: false,
            lineOptions: {
                styles: [{ color: "red", opacity: 0.8, weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 5,
                addWaypoints: false,
            },
            altLineOptions: {
                styles: [{ color: "black", opacity: 0.7, weight: 5 }],
                extendToWaypoints: false,
                missingRouteTolerance: 5,
                addWaypoints: true,
            },

            createMarker: function (i, start, n) {
                return createMarkerAndPopups(i, start, n);
            }
        }, []).addTo(MAP);

        setRoutingControl(routingControl);

        return () => {
            MAP.removeControl(routingControl);
        };
    }, [startPoints, endPoints, JSON.stringify(intermediatePoints)]);
    /* ========================================================================= */


    /* funkcia pre vytvorenie markerov a popopup */
    function createMarkerAndPopups(i, start, n) {
        let marker_icon = undefined;
        let ident = undefined;
        let locationAddress = undefined;

        if (i === 0) {
            marker_icon = services_markerIcon.startIcon();
            ident = "startPoints";
            locationAddress = services_addressForMarker({ allLocation: location_DATA, markerIdent: "startPoints" })
        } else if (i === n - 1) {
            marker_icon = services_markerIcon.endIcon();
            ident = "endPoints";
            locationAddress = services_addressForMarker({ allLocation: location_DATA, markerIdent: "endPoints" })
        } else {
            marker_icon = services_markerIcon.addPointIcon(i);
            ident = i;
            locationAddress = services_addressForMarker({ allLocation: location_DATA, markerIdent: i })
        };

        const MARKER = L.marker(start.latLng, {
            draggable: false,
            bounceOnAdd: false,
            icon: marker_icon,
            ident: ident,
            locationAddress: locationAddress
        });

        /* hover effect pre marker na zobrazenie popup */
        MARKER.on('mouseover', function (e) {
            if (timeoutReff.current) {
                clearTimeout(timeoutReff.current);
            };
            console.log(e);
            timeoutReff.current = setTimeout(() => {
                const UPDATE_DATA = {
                    popupStatus: true,
                    data: {
                        ident: e.target.options.ident,
                        address: e.target.options.locationAddress
                    },
                    location: {
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    }
                };
                updateContext_DATA([
                    { newData: UPDATE_DATA, key: "location_markerPopupt" },
                    { newData: true, key: "popup_event" }
                ]);
            }, 1000);
            MARKER.on('mouseout', () => {
                if (timeoutReff.current) {
                    clearTimeout(timeoutReff.current);
                };
            });
        }, []);
        return MARKER;
    };

    /* route select */
    React.useEffect(() => {
        if (routingControl) {
            routingControl.on("routeselected", (e) => {
                const UPDATE_DATA = {
                    routeIndex: e.route.routesIndex,
                    onEvent: "ON_MAP",
                };
                updateContext_DATA([
                    { newData: UPDATE_DATA, key: "changeRoutes" },
                    { newData: false, key: "popup_event" }
                ]);
            });
        };
    }, [routingControl]);


    /* nastavenie detail trasy */
    React.useEffect(() => {
        if (routingControl) {
            routingControl.on("routesfound", function (e) {
                const ROUTES = e.routes;
                updateContext_DATA([{ newData: services_routeDetail(ROUTES), key: "main_atl_route" }]);

                /* posun na trasu */
                if (ROUTES.length > 0) {
                    const routeCoordinates = ROUTES[0].coordinates; // Předpokládáme, že budeme používat první trasu
                    const bounds = L.latLngBounds(routeCoordinates);
                    // Nastavení automatického přiblížení na celou trasu
                    MAP.fitBounds(bounds, { padding: [200, 200] }); // Můžete také nastavit padding podle potřeby
                };

            }, []);
        };
    }, [routingControl]);

    /* nastavenie novej trasy vlozenie do pola a lokalneho uloziska pre zobarazenie historie*/
    React.useEffect(() => {
        if (main_atl_route.length > 0) {
            const CREATE_TIME = new Date();
            const UTC_TIME = CREATE_TIME.toUTCString();

            const UPDATE_DATA = {
                startPoint: {
                    address: startPoints.address,
                    latLng: startPoints.latLng
                },
                endPoint: {
                    address: endPoints.address,
                    latLng: endPoints.latLng
                },
                addPoint: intermediatePoints,
                routeName: main_atl_route[0].nameRoutes,
                routeTime: main_atl_route[0].totalTime,
                routeDistance: main_atl_route[0].totalDistance,
                createTime: UTC_TIME
            };

            const STORAGE_DATA = JSON.parse(localStorage.getItem('saveHistoryRoutes')) || [];
            if (STORAGE_DATA.length > 0) {
                if (services_theMatchOfTheCreatedObject({ STORAGE_DATA, UPDATE_DATA }) === -1) {
                    STORAGE_DATA.push(UPDATE_DATA);
                    localStorage.setItem('saveHistoryRoutes', JSON.stringify(STORAGE_DATA))
                };
            } else {
                STORAGE_DATA.push(UPDATE_DATA);
                localStorage.setItem('saveHistoryRoutes', JSON.stringify(STORAGE_DATA))
            }
        }
    }, [JSON.stringify(location_DATA)]);

    return null;
};

export default RouteMachine;
