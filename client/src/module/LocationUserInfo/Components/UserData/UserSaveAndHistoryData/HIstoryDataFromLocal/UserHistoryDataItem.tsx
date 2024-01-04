import React from "react";
import "./userHistoryDataItem.style.css";
import { Container } from "../../../../../Container";
import { AUTHENTICATION_API } from "../../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { Type_UserSaveHistoryRouteObjekt, Type_UserHistoryDataItem, Type_saveRoute, TypeforSAVE_API } from "../../..";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons'



function UserHistoryDataItem(props: Type_UserHistoryDataItem): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const { handleSubmit, reset } = useInputValue();
    const [dataFromProps, setDataFromProps] = React.useState<Type_UserSaveHistoryRouteObjekt>();
    const [respoMessage, setRespoMessage] = React.useState("")

    /* nastave dat pre zobrazenie */
    React.useEffect(() => {
        if (props.item) {
            setDataFromProps(props.item);
        };
    }, [props.item]);


    /* priprava  formulara odoslanie do funkcie na stahovanie */
    const submit = (v: TypeForInputsObject["v"]): void => {
        if (v[0].inputValues && startPoints.latLng[0] && endPoints.latLng[0]) {
            const DATA_FOR_SAVEAPI: Type_saveRoute = {
                startCoord: startPoints,
                endCoord: endPoints,
                allCoord: arrayALL_coordinate,
                routeName: v[0].inputValues.toString(),
                timeCreate: props.item.createTime,
            };
            saveDATA({ DATA_FOR_SAVEAPI })
            reset();
        };
    };

    /* async funkcia pre ulozenie dat */
    async function saveDATA(data: TypeforSAVE_API) {
        const DATA_ROUTE = data.DATA_FOR_SAVEAPI;
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;

            try {
                const SAVE_RESPO = await AUTHENTICATION_API.saveDATA_API({ DATA_ROUTE, USER_NAME, USER_JWT_TOKEN });
                if (SAVE_RESPO) {
                    setRespoMessage(SAVE_RESPO?.message)
                    setTimeout(() => {
                        setRespoMessage("")
                    }, 5000)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    /* kliknutie na item historie cesty */
    const handleClickItem = (route: Type_UserSaveHistoryRouteObjekt) => {
        const UPDATE_DATA = {
            ...location_DATA,
            startPoints: route.startPoint,
            endPoints: route.endPoint,
            arrayALL_coordinate: route.addPoint
        };
        updateContext_DATA([
            { newData: UPDATE_DATA, key: "location_DATA" },
        ]);
    };

    return (
        <div
            style={props.keyItem === props.selectItem ? { left: "40px" } : { left: "0px" }}
            key={props.keyItem}
            onClick={() => handleClickItem(props.item)}
            className="itemUserSave">
            <div className="routeNameAndLogo">
                <div className="routeItemKey">
                    <div className="routeKeybox">
                        <div className="keyItem">
                            <h4>{props.keyItem + 1}</h4>
                        </div>
                    </div>
                </div>
                <div className="routeItemName">
                    <div className="nameLogo">
                        <FontAwesomeIcon icon={faRoad} />
                    </div>
                    <div className="nameRoute">
                        <p>{dataFromProps?.routeName}</p>
                    </div>
                </div>
            </div>
            <div className="itemStartANDEndPoint">
                <div className="itemStartEndLogo">
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="itemStartEndName">
                    <p>{dataFromProps?.startPoint.address.label}</p>
                </div>
            </div>
            <div className="itemStartANDEndPoint">
                <div className="itemStartEndLogo">
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="itemStartEndName">
                    <p>{dataFromProps?.endPoint.address.label}</p>
                </div>
            </div>
            <div className="itemAddedPoint">
                {
                    dataFromProps && dataFromProps?.addPoint.length > 0 &&
                    <div className="addPointShow">
                        <div className="addPointShowNumb">
                            <p>{dataFromProps?.addPoint.length + 1}x added point </p>
                        </div>
                        <div className="addPointShowIcon">
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                    </div>
                }
            </div>
            <div className="itemStartANDEndPoint">
                <div className="itemStartEndLogo">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="itemStartEndName">
                    <p>{dataFromProps?.createTime}</p>
                </div>
            </div>
            <div className="itemEventBlock">
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <label htmlFor="">Save route to DB</label>
                    <div>
                        <input
                            name="name"
                            placeholder="Route name"
                            type="text" />
                        <button>Save</button>
                    </div>
                </form>
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
            <div className="respoMessage">
                <h4>{respoMessage}</h4>
            </div>
        </div>
    );
};

export default UserHistoryDataItem;