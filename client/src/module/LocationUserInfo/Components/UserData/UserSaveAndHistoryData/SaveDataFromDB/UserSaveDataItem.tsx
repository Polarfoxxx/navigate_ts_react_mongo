import React from "react";
import "./userSaveDataItem.style.css";
import { Type_UserSaveDataItem } from "../HIstoryDataFromLocal/types";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";


function UserSaveDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const [saveDATA, setSaveDATA] = React.useState<Type_saveRoute>();


    React.useEffect(() => {
        if(props.item) {
            setSaveDATA(props.item)
        }
    }, [])


    return (
        <div className="saveDataItemBox">
            <div className="saveDataHeader">
                <h4>{saveDATA?.routeName}</h4>
            </div>
            <h1>{saveDATA?.startCoord.address.label}</h1>
        </div>
    );
};

export default UserSaveDataItem;