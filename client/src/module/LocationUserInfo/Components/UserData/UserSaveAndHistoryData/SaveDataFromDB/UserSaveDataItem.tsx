import React from "react";
import "./userSaveDataItem.style.css";
import { Type_UserSaveDataItem } from "../HIstoryDataFromLocal/types";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import { DEFAULT_VALUE_SAVE_DATA_ITEM } from "./default_value";
import { Container } from "../../../../../Container";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { useInputValue } from "foxxy_input_value";

function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const { handleSubmit, reset } = useInputValue();
    const [saveDATA, setSaveDATA] = React.useState<Type_saveRoute>(DEFAULT_VALUE_SAVE_DATA_ITEM);


    React.useEffect(() => {
        if (props.item.routeName || props.item.startCoord.latLng[0]) {
            setSaveDATA(props.item)
        };
    }, []);


    /* priprava  formulara odoslanie do funkcie na stahovanie */
    const submit = (v: TypeForInputsObject["v"]): void => {

    };




    return (
        <div className="saveDataItemBox">
            <div className="saveDataHeader">
                <div className="routeItemKey">
                    <div className="routeKeybox">
                        <div className="keyItem">
                            <h4>{props.keyItem + 1}</h4>
                        </div>
                    </div>
                </div>
                <div className="headerLogo">
                    <FontAwesomeIcon icon={faRoad} />
                </div>
                <div className="headerName">
                    <h4>{saveDATA.routeName}</h4>
                </div>
                <div className="headerOffName">
                    <h4>{saveDATA.officialName}</h4>
                </div>
                <div className="headerCreateRoute">
                    <h4>{saveDATA.timeCreate}</h4>
                </div>
            </div>
            <div className="saveDataBody">
                <div className="saveBodyPositionBox">
                    <div className="bodyPositionName">
                        <h4>{saveDATA.startCoord.address.label}</h4>
                    </div>
                    <div className="bodyPositionCoord">
                        <h4>{saveDATA.startCoord.latLng.toString()}</h4>
                    </div>
                </div>
                <div className="saveBodyPositionBox">
                    {
                        saveDATA.allCoord.map((item, key) =>
                            <div
                                className="savePositionItem"
                                key={key}>
                                <div>
                                    <h4>{item.address.label}</h4>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="saveBodyPositionBox">
                    <div className="bodyPositionName">
                        <h4>{saveDATA.endCoord.address.label}</h4>
                    </div>
                    <div className="bodyPositionCoord">
                        <h4>{saveDATA.endCoord.latLng.toString()}</h4>
                    </div>
                </div>
            </div>
            <div className="saveDataFooter">
                <div className="savefotterTime">
                    <h4>{saveDATA.timeRoute}</h4>
                </div>
                <div className="savefotterDistance">
                    <h4>{saveDATA.distanceRoute}</h4>
                </div>
            </div>
            <div className="saveDataEvent">
                <div className="sendEmailBox">
                    <form onSubmit={(e) => handleSubmit(e, submit)}>
                        <label htmlFor="">Send to email</label>
                        <div>
                            <input
                                name="email"
                                placeholder="Send email"
                                type="email" />
                            <button>Send</button>
                        </div>
                    </form>
                </div>
                <div className="deleteRoute">
                    <button>DELETE</button>
                </div>

            </div>

        </div>
    );
};

export default UserSaveDataItem;