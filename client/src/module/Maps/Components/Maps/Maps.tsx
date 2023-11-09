import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
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

function Maps() {
    console.log("map");
    const mapRef = React.useRef(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const CENTER_MAP: LatLngExpression = [48.7144253, 17.1079803];


    return (
        <div
            ref={containerRef}
            className='maps'>
            <MapContainer
                center={CENTER_MAP}
                zoom={13}
                maxZoom={18}
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
                <Popups />
                {/*    <PoligonXXX />  */}

            </MapContainer>

        </div>
    );
};

export default Maps;
