import React from "react";
import { Container } from "../../../Container";
import "./road_DIVIDER_detail_OTR.style.css";
import { Type_ArrayALLRoute } from "../../../Container";
import { DetailOfTheRoad } from "../index";
import { UseChangeContextDATA } from "../../../hooks";



function Road_DIVIDER_detail_OTR(): JSX.Element {
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { route, changeRoutes } = location_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const [mainAndAlternativeRoads, setMainAndAlternativeRoads] = React.useState<Type_ArrayALLRoute[]>([]);
    const [active, setActive] = React.useState(0);


    /* zmena alternatyvnej trasy zobrazenie */
    React.useEffect(() => {
        if (changeRoutes.onEvent !== "ON_CONTROL")
            setActive(changeRoutes.routeIndex)
    }, [changeRoutes.routeIndex]);

    /* prepinanie medzi trasami zobrazenie */
    const handleClick = (eventNumber: number) => {
        if (active === eventNumber) {
            return setActive(active)
        };
        setActive(eventNumber);

        const UPDATE_OBJEKT = {
            routeIndex: eventNumber,
            onEvent: "ON_CONTROL"
        };
        updateContext_DATA([{ newData: UPDATE_OBJEKT, key: "changeRoutes" }])
    };


    React.useEffect(() => {
        if (route.length > 0) {
            let allRoute: Type_ArrayALLRoute[] = [];
            route.forEach(item => {
                /* nastavenie vsetkych trias aj alt  */
                allRoute.push(item);
                setMainAndAlternativeRoads(allRoute);
            });
        };
    }, [route]);


    return (
        <div className="road_DIVIDER_detail_OTR">
            {
                mainAndAlternativeRoads.length > 0 && mainAndAlternativeRoads.map((item, key) =>

                    <div
                        className={active === key ? "direction_boxs" : "direction_box_deactive"}
                        key={key}
                        onClick={() => handleClick(key)}>
                        <DetailOfTheRoad
                            index={key}
                            active={active}
                            oneRoute={item} />

                    </div>

                )
            }
        </div>
    );
};

export default Road_DIVIDER_detail_OTR;