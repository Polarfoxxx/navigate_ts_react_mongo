import React from "react";
import "./userSaveDataItem.style.css";
import { Type_UserSaveDataItem } from "../HIstoryDataFromLocal/types";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import { DEFAULT_VALUE_SAVE_DATA_ITEM } from "./default_value";


function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const [saveDATA, setSaveDATA] = React.useState<Type_saveRoute>(DEFAULT_VALUE_SAVE_DATA_ITEM);


    React.useEffect(() => {
        if(props.item) {
            setSaveDATA(props.item)
        }
    }, [])


    return (
        <div className="saveDataItemBox">
            <div className="saveDataContent">
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            </div>
         
        </div>
    );
};

export default UserSaveDataItem;