import React from "react";
import "./detail_OTR_item.style.css";
import { Type_For_Direction_item } from "./type";
import { Container } from "../../../Container";
import services_navigationIcons from "./services/services_navigationIcons";
import { UseChangeContextDATA } from "../../../hooks";



function DetailOTRitem({ all_directions, all_coordinate }: Type_For_Direction_item): JSX.Element {
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });


    const handleDivMouseToogle = (event: React.MouseEvent<HTMLDivElement>, state: boolean) => {
        if (state) {
            const EVENT_INDEX = +event.currentTarget.id;
            const FIND_COORD = all_coordinate.find((item, idx) => idx === EVENT_INDEX) as L.LatLngExpression;

            if (event.target instanceof HTMLElement && event.target.closest('.item')) {
                if (FIND_COORD) {
                    updateContext_DATA([{ newData: FIND_COORD, key: "markerInTheRoute" }])
                };
            };
        } else {
            updateContext_DATA([{ newData: null, key: "markerInTheRoute" }]);
        };
    };


    return (
        <>
            {
                all_directions.map((item, key: number) =>
                    <div
                        id={`${item.index}`}
                        onMouseEnter={(event) => handleDivMouseToogle(event, true)}
                        onMouseLeave={(event) => handleDivMouseToogle(event, false)}
                        className="item route_item"
                        key={key} >
                        <div className="item direction">
                            <h5>{item.direction}</h5>
                        </div>
                        <div className="item modifier">
                            <img src={services_navigationIcons(item.modifier)} alt={item.modifier} />
                        </div>
                        <div className="item roadAndText">
                            <div className="text">
                                <p>{item.text ? item.text : "--"}</p>
                            </div>
                            <div className="road">
                                <p>{item.road ? item.road : "--"}</p>
                            </div>
                        </div>
                        <div className="item exit">
                            <p>{item.exit ? item.exit : "No exit"}</p>
                        </div>
                        <div className="item distanceAndTime">
                            <div className="time">
                                <span className="spTime">Time:</span>
                                <p>{Math.round(item.time) / 10} min</p>
                            </div>
                            <div className="distance">
                                <span className="spDis">Distance:</span>
                                <p>{Math.round((item.distance))} m</p>
                            </div>
                        </div>
                        <div className="item time">
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default DetailOTRitem;
