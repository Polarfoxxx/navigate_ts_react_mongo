import React from "react"
import { Container } from "../../../../Container";
import "./locationSearchControl.style.css";
import ControlnputsSearche from "./ControlnputsSearche";
import services_defaultInputValue from "./services/services_defaultInputValue";


function LocationSearcheControl(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context)
    const { endPoints, startPoints, arrayALL_coordinate } = location_DATA;


    return (
        <div className="controlInput">
            {/* start input */}
            <div className="strart_input_box stEnd">
                <ControlnputsSearche
                    input_ident="start_point"
                    input_value={startPoints.address.label} />
            </div>

            {/* medzi input */}
            <div className="sideways_box">
                {
                    endPoints.address.label && <ControlnputsSearche
                        input_ident={0}
                        input_value={services_defaultInputValue(0, arrayALL_coordinate)} />
                }
                {

                    arrayALL_coordinate.length > 0 && arrayALL_coordinate.map((coordinate, key) => (
                        <ControlnputsSearche
                            key={key}
                            input_ident={key + 1}
                            input_value={services_defaultInputValue(key + 1, arrayALL_coordinate)}
                        />
                    ))}
            </div>

            {/* end input */}
            <div className="end_input_box stEnd">
                {startPoints.address.label && <ControlnputsSearche
                    input_ident="end_point"
                    input_value={endPoints.address.label} />
                }
            </div>

        </div>
    );
};

export default LocationSearcheControl;