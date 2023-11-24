import L from 'leaflet';

const SERVICES_MARKER_ICON = {
    startIcon,
    endIcon,
    altIcon,
    moveIcon
};
export default SERVICES_MARKER_ICON;

function startIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/marker-start.png",
        iconSize: [45, 53], // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed
    });
};

function endIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/marker-end.png",
        iconSize: [45, 53], // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed

    });
};

function altIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/marker.png",
        iconSize: [45, 53], // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed
    });
}
function moveIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/via-FFFFFF.png",
        iconSize: [28, 28],
        iconAnchor: [15, 15],
    });
};




