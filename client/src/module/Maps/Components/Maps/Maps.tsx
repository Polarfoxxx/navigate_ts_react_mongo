import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet";
import "./maps.master.style.css"
import { LatLngExpression } from 'leaflet';
import PoligonXXX from '../../../IncidentsToMaps/Components/poligonXXXXX/PoligonXXX';

import { FilterMaps } from '../../../Maps/Components';
import { RouteMachine } from '../../../RouteMachine';
import { IncidentsToMap } from '../../../IncidentsToMaps';
import { MapHandler } from '../../Components';
import { ServicesFollowPointsOnTheMap } from '../../../Control';
import { MapTraffic } from '../../../IncidentsToMaps';
import { Popups } from '../../../Maps/Components';
import { MapSearche } from '../../../IncidentsToMaps';

function Maps() {
    const MAP_REF = React.useRef(null);
    const CONTAINER_FOR_MAP = React.useRef<HTMLDivElement | null>(null);
    const CENTER_MAP: LatLngExpression = [40.741105712175916, -73.9919172811947];


    return (
        <div
            ref={CONTAINER_FOR_MAP}
            className='maps'>
            <MapContainer
                center={CENTER_MAP}
                zoom={10}
                maxZoom={18}
                minZoom={4}
                ref={MAP_REF}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RouteMachine />
                <FilterMaps />
                <IncidentsToMap />
                <MapHandler />
                <ServicesFollowPointsOnTheMap />
                <MapTraffic />
                <MapSearche />
                <Popups />
                {/*    <PoligonXXX />  */}
            </MapContainer>
        </div>
    );
};

export default Maps;
