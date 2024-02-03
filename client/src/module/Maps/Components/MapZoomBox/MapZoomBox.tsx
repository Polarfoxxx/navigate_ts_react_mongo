import React from "react";
import "./mapZoomBox.style.css"
import { Container } from "../../../Container";

function MapZoomBox(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo } = sideWays_DATA;
    const [mapZoomLevel, setmapZoomLevel] = React.useState<number>(0);


    React.useEffect(() => {
        setmapZoomLevel(mapsCurrentInfo.zoom)
    }, [mapsCurrentInfo.zoom])


    return (
        <div className="mapZoomBox">
            <div
                style={mapZoomLevel > 13 ?
                    { backgroundColor: "rgba(108, 255, 4, 0.675)" } : { backgroundColor: "rgb(201, 46, 15)" }}
                className="mapZoomContent">
                <div className="mapZoomContentTittle">
                    <h3>Zoom level:</h3>
                </div>
                <div className="mapZoomContentValue">
                    <h2>{mapZoomLevel}</h2>
                </div>
            </div>
        </div>
    );
};

export default MapZoomBox;