import React from "react"
import L from "leaflet"
import { useMap } from "react-leaflet";
import "./filterMaps.style.css"



function FilterMaps(): null {
    const MAP = useMap();

    React.useEffect(() => {
        const GOOGLE_SATELITE = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            attribution: '© Google'
        });
        const OSM_LAYER = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        const DARK_LAYER = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            className: 'map-tiles'
       
        
        });

        const BASE_LAYERS = {
            "Google Satellite": GOOGLE_SATELITE,
            "OpenStreetMap": OSM_LAYER,
            "OpenStreetMapDark": DARK_LAYER,
        };

        // Nastavení výchozí vrstvy na "OpenStreetMapDark"
        OSM_LAYER.addTo(MAP);
        const layerControl = L.control.layers(BASE_LAYERS).addTo(MAP);

        return (() => {
            MAP.removeControl(layerControl);
        });
    }, []);

    return null;
};

export default FilterMaps;