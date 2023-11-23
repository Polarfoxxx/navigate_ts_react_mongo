import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet";
import "./maps.master.style.css"
import { LatLngExpression } from 'leaflet';
import PoligonXXX from '../../../IncidentsToMaps/Components/poligonXXXXX/PoligonXXX';

import { FilterMaps } from '../../../Maps/Components';
import { RouteMachine } from '../../../RouteMchine';
import { IncidentsToMap } from '../../../IncidentsToMaps';
import { MapHandler } from '../../Components';
import { ServicesFollowPointsOnTheMap } from '../../../Control';
import { MapTraffic } from '../../../IncidentsToMaps';
import { Popups } from '../../../Maps/Components';
import { MapSearche } from '../../../IncidentsToMaps';

function Maps() {
    console.log("map");
    const mapRef = React.useRef(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const CENTER_MAP: LatLngExpression = [40.72498136513723, -73.995302658492366];

    return (
        <div
            ref={containerRef}
            className='maps'>
            <MapContainer
                center={CENTER_MAP}
                zoom={14}
                maxZoom={19}
                minZoom={4}
                ref={mapRef}
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
