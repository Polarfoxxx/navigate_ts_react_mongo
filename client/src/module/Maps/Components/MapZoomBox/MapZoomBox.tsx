import React from "react";
import "./mapZoomBox.style.css"
import { Container } from "../../../Container";

function MapZoomBox(): JSX.Element {
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo } = sideWays_DATA;
    const [mapZoomLevel, setmapZoomLevel] = React.useState<number>();


    React.useEffect(() => {
        console.log(mapsCurrentInfo.zoom);
        setmapZoomLevel(mapsCurrentInfo.zoom)
    }, [mapsCurrentInfo.zoom])


    return (
        <div className="mapZoomBox">
            <div className="mapZoomContent">
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