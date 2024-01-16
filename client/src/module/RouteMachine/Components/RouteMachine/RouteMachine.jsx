import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Container } from "../../../Container";
import services_markerIcon from "./services/marker_Icon_services";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import services_routeDetail from "./services/services_routeDetail";
import services_movieMarker from "./services/services_moveMarker";
import { UseChangeContextDATA } from "../../../hooks";
import { services_theMatchOfTheCreatedObject } from "../../../LocationUserInfo";


function RouteMachine() {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const { startPoints, endPoints, arrayALL_coordinate, main_atl_route } = location_DATA, { mapBussines_Category } = sideWays_DATA;
    const [routingControl, setRoutingControl] = React.useState(null);
    const [marker, setMarker] = React.useState(null);



    React.useEffect(() => {
        const START_POINT = startPoints;
        const END_POINT = endPoints;
        const ADD_CORD_POINT = arrayALL_coordinate.map((item) => item.latLng);

        /* pousun mapy na prvy marker */
        if (START_POINT.address.label && !END_POINT.address.label) {
            MAP.flyTo([START_POINT.latLng[0], START_POINT.latLng[1]]);
        };

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
                styles: [{ color: "#EC2700", opacity: 0.7, weight: 7 }],
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
                let marker_icon = null;
                let ident = null;
                if (i === 0) {
                    marker_icon = services_markerIcon.startIcon();
                    ident = "start_points";
                } else if (i === n - 1) {
                    marker_icon = services_markerIcon.endIcon();
                    ident = "end_points";
                } else {
                    marker_icon = services_markerIcon.addPointIcon(i);
                    ident = i;
                }
                var marker = L.marker(start.latLng, {
                    draggable: false,
                    bounceOnAdd: false,
                    bounceOnAddOptions: {
                        duration: 1000,
                    },
                    icon: marker_icon,
                    ident: ident,
                });
                setMarker(marker);
                return marker;
            },
        }, []).addTo(MAP);

        /* ================================================= */
        setRoutingControl(routingControl);
        /* ================================================= */

        return () => {
            MAP.removeControl(routingControl);
        };
    }, [startPoints, endPoints, JSON.stringify(arrayALL_coordinate)]);
    /* ========================================================================= */



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

    /* nastavenie novej trasy vlozenie do pola a lokalneho uloziska pre zobarazenie hidtorie*/
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
                addPoint: arrayALL_coordinate,
                routeName: main_atl_route[0].nameRoutes,
                routeTime: main_atl_route[0].totalTime,
                routeDistance: main_atl_route[0].totalDistance,
                createTime: UTC_TIME
            };

            const STORAGE_DATA = JSON.parse(localStorage.getItem('saveHistoryRoutes')) || [];
            if (STORAGE_DATA.length > 0) {
                console.log(STORAGE_DATA);
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


    // Zachyťte udalosť pohybu markera
    React.useEffect(() => {
        if (marker) {
            marker.on("dragend", function (event) {
                const markerIdent = this.options.ident;
                const currentLatLng = this.getLatLng();
                /* servisa nastavujuca novu lokalitu pri posuve */
                services_movieMarker({ location_DATA, markerIdent, currentLatLng })
                    .then((data) => {
                        console.log("machine");
                        /*      setTimeout(() => {
                                             setLocation_DATA(data);
                                         }, 1500); */
                    })
                    .catch((err) => {
                        alert("Place not found");
                        console.error(err);
                    });
            });
        };
    }, [marker]);

    return null;
};

export default RouteMachine;
