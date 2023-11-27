import {
    Type_ForUseChangeContextDATA,
    Type_ForUseChangeContextDATA_returning,
    Type_updateContext_DATA
} from "./types";


function UseChangeContextDATA({
    location_DATA,
    setLocation_DATA,
    sideWays_DATA,
    setSideWays_DATA
}: Type_ForUseChangeContextDATA): Type_ForUseChangeContextDATA_returning {


    function updateContext_DATA(props: Type_updateContext_DATA[]): void {

        props.forEach((item: Type_updateContext_DATA) => {
            if (location_DATA && setLocation_DATA && item.key === "location_DATA") {
                setLocation_DATA(item.newData);
                return
            } else if (sideWays_DATA && setSideWays_DATA && item.key === "sideWays_DATA") {
                setSideWays_DATA(item.newData);
                return
            };

            if (location_DATA && setLocation_DATA && item.key in location_DATA) {
                setLocation_DATA(prew => ({
                    ...prew,
                    [item.key]: item.newData
                }));
            } else if (sideWays_DATA && setSideWays_DATA && item.key in sideWays_DATA) {
                setSideWays_DATA(prew => ({
                    ...prew,
                    [item.key]: item.newData
                }))
            } else
                alert("bad object");
        });
    };

    return {
        updateContext_DATA
    };
};


export default UseChangeContextDATA;
