
import React from "react";
import "./onClickMapContent.style.css"
import { Container } from "../../../../Container";
import services_onClick_setStartEnd from "./services/services_onClick_setStartEnd";
import { Type_ButtonName } from "./types";
import { UseChangeContextDATA } from "../../../../hooks";

type Type_forControlMapCLcontent = {
    click?: string
}

function OnClickMapContent(props: Type_forControlMapCLcontent): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA, { clickOnMap } = sideWays_DATA
    const [locationName, setLocationName] = React.useState("");
    const [buttonName, setButtonName] = React.useState<Type_ButtonName>("Start of your route");

    React.useEffect(() => {
        let buttonName: Type_ButtonName;
        switch (true) {
            case !startPoints.address:
                buttonName = "Start of your route";
                break;
            case !endPoints.address:
                buttonName = "End of your route";
                break;
            default:
                buttonName = "Add between a point";
                break;
        };
        setButtonName(buttonName);
    }, [startPoints.address, endPoints.address, arrayALL_coordinate]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */

        updateContext_DATA([
            { newData: services_onClick_setStartEnd(location_DATA, sideWays_DATA), key: "location_DATA" },
            { newData: false, key: "popup_event" },
        ]);
    };


    React.useEffect(() => {
        setLocationName(clickOnMap.address)
    }, [clickOnMap]);

    return (
        <div className="popup">
            <div className="coordinateBox">
                {
                    clickOnMap.latLng &&
                    clickOnMap.latLng.map((cord: number, key: number) =>
                        <div
                            className="coordoante-item"
                            key={key}>
                            <span>
                                {key === 0 ? "Latitude: " : "Longitude: "}
                            </span>
                            <h4>
                                {cord}
                            </h4>
                        </div>
                    )
                }
            </div>
            <div className="locationBox">
                <div className="locationHeader">
                    <h4>Position set:</h4>
                </div>
                <div className="locationContent">
                    {
                        locationName
                    }
                </div>
            </div>
            <div className="buttonBox">
                <button
                    onClick={handleClick}>
                    {buttonName}
                </button>
            </div>
            <div>
                {
                    props.click && <div>{props.click}</div>
                }
            </div>
        </div>
    )
};
export default OnClickMapContent;