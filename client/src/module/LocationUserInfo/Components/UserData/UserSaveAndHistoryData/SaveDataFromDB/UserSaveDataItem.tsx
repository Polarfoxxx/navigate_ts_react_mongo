import React from "react";
import "./userSaveDataItem.style.css";
import { Type_UserSaveDataItem } from "../HIstoryDataFromLocal/types";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import { DEFAULT_VALUE_SAVE_DATA_ITEM } from "./default_value";
import { Container } from "../../../../../Container";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faCarSide, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { useInputValue } from "foxxy_input_value";
import { SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS } from "../../../../../utils";
import { AUTHENTICATION_API } from "../../../../../API";




function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, intermediatePoints } = location_DATA;
    const { handleSubmit, reset } = useInputValue();
    const [saveDATA, setSaveDATA] = React.useState<Type_saveRoute>(DEFAULT_VALUE_SAVE_DATA_ITEM);
    const [emailSendMessage, setEmailSendMessage] = React.useState("Send to email")

    /* nastavenie hodnout itemu */
    React.useEffect(() => {
        if (props.item.routeName || props.item.startCoord.latLng[0]) {
            setSaveDATA(props.item);
        }
    }, [props.item]);
    

    /* send to email */
    const submit = (v: TypeForInputsObject["v"]): void => {
        const ENAIL_NAME_FROM_ITEM = v[0].inputValues.toString();
        sendEmail(ENAIL_NAME_FROM_ITEM);
        reset();
    };

    async function sendEmail(ENAIL_NAME_FROM_ITEM: string) {
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_LOGIN_NAME = USER_DATA.user_Name;
            const EMAIL_NAME = ENAIL_NAME_FROM_ITEM ? ENAIL_NAME_FROM_ITEM : USER_LOGIN_NAME;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            const ROUTE_INFO = props.item;

            try {
                const SEND_EMAIL = await AUTHENTICATION_API.sendEmail_API({ EMAIL_NAME, ROUTE_INFO, USER_JWT_TOKEN });
                if (SEND_EMAIL) {
                    setEmailSendMessage(SEND_EMAIL?.message);
                    setTimeout(() => {
                        setEmailSendMessage("Send to email");
                    }, 5000)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    /* kliknutie na item ulozenej cesty */
    const handleClickSelect = (route: Type_saveRoute) => {
        const UPDATE_DATA = {
            ...location_DATA,
            startPoints: route.startCoord,
            endPoints: route.endCoord,
            intermediatePoints: route.allCoord
        };
        updateContext_DATA([
            { newData: UPDATE_DATA, key: "location_DATA" }
        ]);
        props.setSelectRoute(props.keyItem);
    };


    /* nastavenie nazvu pre najdenie trasy pre vymazanie */
    const handleClickDelete = (routeName: string) => {
        props.setDeleteNameRoute(routeName)
    };



    return (
        <div className="saveDataItemBox">
            <div className="saveDataHeader">
                <div className="routeItemKeys">
                    <div className="routeKeyboxs">
                        <div className="keyItems">
                            <h4>{props.keyItem + 1}</h4>
                        </div>
                    </div>
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
                <div className="saveBodyPositionBox masterBox">
                    <div className="bodyPositionName">
                        <p>{saveDATA.startCoord.address.label}</p>
                    </div>
                    <div className="bodyPositionCoord">
                        <div className="bodyPositionCoord_titte">
                            <p className="posCoordTittle">Latitude:</p>
                            <p className="posCoordValue">{saveDATA.startCoord.latLng[0]}</p>
                        </div>
                        <div className="bodyPositionCoord_titte">
                            <p className="posCoordTittle">Longitude:</p>
                            <p className="posCoordValue">{saveDATA.startCoord.latLng[1]}</p>
                        </div>
                    </div>
                </div>
                <div className="saveBodyArrow">
                    <FontAwesomeIcon icon={faCircleRight} />
                </div>
                {
                    saveDATA.allCoord.length > 0 ?
                        saveDATA.allCoord.map((item, key) =>
                            <>
                                <div
                                    className="saveBodyPositionBox addPoints"
                                    key={key}>
                                    <div className="bodyPositionKey">
                                        <p>{key + 1}</p>
                                    </div>
                                    <div className="bodyPositionName">
                                        <p>{item.address.label}</p>
                                    </div>
                                    <div className="bodyPositionCoord">
                                        <div className="bodyPosiAddCoord_titte">
                                            <p className="posCoordAddTittle">Lat:</p>
                                            <p className="posCoordAddValue">{item.latLng[0]}</p>
                                        </div>
                                        <div className="bodyPosiAddCoord_titte">
                                            <p className="posCoordAddTittle">Long:</p>
                                            <p className="posCoordAddValue">{item.latLng[1]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="saveBodyArrow">
                                    <FontAwesomeIcon icon={faCircleRight} />
                                </div>
                            </>
                        ) : null
                }
                {
                    saveDATA.allCoord.length < 0 ?
                        <div className="saveBodyArrow">
                            <FontAwesomeIcon icon={faCircleRight} />
                        </div> : null
                }

                <div className="saveBodyPositionBox masterBox">
                    <div className="bodyPositionName">
                        <p>{saveDATA.endCoord.address.label}</p>
                    </div>
                    <div className="bodyPositionCoord">
                        <div className="bodyPositionCoord_titte">
                            <p className="posCoordTittle">Latitude:</p>
                            <p className="posCoordValue">{saveDATA.endCoord.latLng[0]}</p>
                        </div>
                        <div className="bodyPositionCoord_titte">
                            <p className="posCoordTittle">Longitude:</p>
                            <p className="posCoordValue">{saveDATA.endCoord.latLng[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="saveDataFooter">
                <div className="saveFooterImage">
                    <FontAwesomeIcon className="faa" icon={faCarSide} />
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <FontAwesomeIcon className="faa" icon={faBullseye} />
                </div>
                <div className="saveFooterMasterInfo">
                    <div className="savefotterTime">
                        <div className="saveFootTimeTittle">
                            <h4>Route time:</h4>
                        </div>
                        <div className="saveFootTimeValue">
                            <h4>{CONVER_UNITS.services_conversionOfTime({ total_value: saveDATA.timeRoute, units_type: "s" })}</h4>
                        </div>
                    </div>
                    <div className="savefotterDistance">
                        <div className="saveFootDisTittle">
                            <h4>Route distance:</h4>
                        </div>
                        <div className="saveFootDisValue">
                            <h4>{CONVER_UNITS.services_conversionOfUnits({ total_value: saveDATA.distanceRoute, units_type: "m" })}</h4>
                        </div>
                    </div>
                </div>

            </div>
            <div className="saveDataEvent">
                <div className="sendEmailBox">
                    <form onSubmit={(e) => handleSubmit(e, submit)}>
                        <label
                            style={emailSendMessage === "Send to email" ? { color: "white" } : { color: "red" }}>
                            {emailSendMessage}
                        </label>
                        <div>
                            <input
                                name="email"
                                placeholder="Send email"
                                type="email" />
                            <button>Send</button>
                        </div>
                    </form>
                </div>
                <div className="selectRoute">
                    <p>Selekt route on map</p>
                    <button onClick={() => handleClickSelect(props.item)}>SELECT</button>
                </div>
                <div className="deleteRoute">
                    <p>Delete route</p>
                    <button onClick={() => handleClickDelete(props.item.officialName)}>DELETE</button>
                </div>
            </div>

        </div>
    );
};

export default UserSaveDataItem;


