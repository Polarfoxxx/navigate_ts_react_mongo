import React from "react";
import "./control.master.style.css"
import { Container } from "../../../Container";
import GeocoderInput from "./ControlnputsSearche";
import services_defaultInputValue from "./services/services_defaultInputValue";



function ControlBox(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context)
    const { endPoints, startPoints, arrayALL_coordinate } = location_DATA;

    return (
        <div className="control-box">
            {/* start input */}
            <div className="strart_input_box stEnd">
                <GeocoderInput
                    input_ident="start_point"
                    input_value={startPoints.address} />
            </div>

            {/* medzi input */}
            <div className="sideways_box">
                {
                    endPoints.address && <GeocoderInput
                        input_ident={0}
                        input_value={services_defaultInputValue(0, arrayALL_coordinate)} />
                }
                {
                    arrayALL_coordinate.length > 0 && arrayALL_coordinate.map((coordinate, key) => (
                        <GeocoderInput
                            key={key}
                            input_ident={key + 1}
                            input_value={services_defaultInputValue(key + 1, arrayALL_coordinate)}
                        />
                    ))}
            </div>

            {/* end input */}
            <div className="end_input_box stEnd">
                {startPoints.address && <GeocoderInput
                    input_ident="end_point"
                    input_value={endPoints.address} />
                }
            </div>

        </div>
    )
};

export default ControlBox
