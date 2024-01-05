import React from "react";
import "./userSaveDataItem.style.css";
import { Type_UserSaveDataItem } from "../HIstoryDataFromLocal/types";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import { DEFAULT_VALUE_SAVE_DATA_ITEM } from "./default_value";
import { Container } from "../../../../../Container";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';


function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const [saveDATA, setSaveDATA] = React.useState<Type_saveRoute>(DEFAULT_VALUE_SAVE_DATA_ITEM);


    React.useEffect(() => {
        if (props.item.routeName || props.item.startCoord.latLng[0]) {
            setSaveDATA(props.item)
        };
    }, []);


    return (
        <div className="saveDataItemBox">
            <div className="saveDataContent">
                <div className="saveDataHeader">
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
                    <h4>{saveDATA.routeName}</h4>
                </div>
            </div>

        </div>
    );
};

export default UserSaveDataItem;