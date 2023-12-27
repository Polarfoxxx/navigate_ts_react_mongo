import React from "react";
import "./userSaveDataItem.style.css";
import { Container } from "../../../../Container";
import { AUTHENTICATION_API } from "../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";


type Type_UserSaveHistoryRouteObjekt = {
    startPoint: string,
    endPoint: string,
    routeName: string,
    routeTime: number,
    routeDistance: number,
};

type Type_UserSaveDataItem = {
    item: Type_UserSaveHistoryRouteObjekt
}

function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, main_atl_route } = location_DATA;
    const [save_historyRoute, setSave_historyRoute] = React.useState<Type_UserSaveHistoryRouteObjekt[]>([]);
    const { handleSubmit, reset } = useInputValue();
  
     /* odoslanie formulara */
     const submit = (v: TypeForInputsObject["v"]): void => {
        console.log(v);
        const LOAD_USER_DATA = localStorage.getItem("JWT_token");
        const START_COORD = startPoints.latLng;
        const END_COORD = endPoints.latLng;
        const ROUTE_NAME = v[0].input;

        if (LOAD_USER_DATA && START_COORD[0] && END_COORD[0]) {

            const USER_DATA = JSON.parse(LOAD_USER_DATA)
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            AUTHENTICATION_API.saveDATA_API({ USER_NAME, USER_JWT_TOKEN, ROUTE_NAME, START_COORD, END_COORD })
            reset();
        };
    };
  
  
    return(
        <div className="item">
        <div className="routeName">
            <p>{props.item.routeName}</p>
        </div>
        <div className="itemStartPoint">
            <p>{props.item.startPoint}</p>
        </div>
        <div className="itemEndPoint">
            <p>{props.item.endPoint}</p>
        </div>
        <div>
            <form onSubmit={(e) => handleSubmit(e, submit)}>
                <input
                    name="name"
                    placeholder="Route name"
                    type="text" />
                <button>save</button>
            </form>
        </div>
    </div>
    );
};

export default UserSaveDataItem;