import L from 'leaflet';

const SERVICES_MARKER_ICON = {
    startIcon,
    endIcon,
    addPointIcon,
    moveIcon,
    bussinesIcon
};
export default SERVICES_MARKER_ICON;

const SIZE_MAIN_ICON = [43, 50] as L.PointExpression;
const SIZE_ADDPOINT_ICON = [40, 47] as L.PointExpression;

function startIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/marker-start.png",
        iconSize: SIZE_MAIN_ICON, // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed
    });
};

function endIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/marker-end.png",
        iconSize: SIZE_MAIN_ICON, // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed

    });
};

function addPointIcon(numberPosition: number) {
    return L.icon({
        iconUrl: `https://assets.mapquestapi.com/icon/v2/marker-${numberPosition}.png`,
        iconSize: SIZE_ADDPOINT_ICON, // Adjust the icon size as needed
        iconAnchor: [20, 45], // Adjust the anchor point as needed
    });
};
function moveIcon() {
    return L.icon({
        iconUrl: "https://assets.mapquestapi.com/icon/v2/via-FFFFFF.png",
        iconSize: [28, 28],
        iconAnchor: [15, 15],
    });
};

function bussinesIcon() {
    return L.icon({
        iconUrl: `https://assets.mapquestapi.com/icon/v2/marker-000000-1c8899.png`,
        iconSize: [38, 45],
        iconAnchor: [19, 35],
    });
};





