import "./controlAndInfoBox.style.css"
import { Road_DIVIDER_detail_OTR as RoadDIVIDERdetailOTR, OffCanvasBoxInputsControl } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";


function ControlAndinfoBox(): JSX.Element {

    return (
        <div className="controlAndinfoBox">
            <div className="offCanvasBox_box">
                <div className="offCanvasBoxALLContent">
                    <div className="offCanvasBoxTextContent">
                        <p>Here we can search for places using city or street names,
                            you can also search for your favorite businesses in the area
                        </p>
                        <FontAwesomeIcon className="faaa" icon={faCircleDown} size="2xl" />
                    </div>
                    <div className="offCanvasBoxCanvas">
                        <OffCanvasBoxInputsControl />
                    </div>
                </div>
            </div>

            <div className="control_detailOfTheRoad_box">
                <RoadDIVIDERdetailOTR />
            </div>
        </div>
    )
};


export default ControlAndinfoBox;
