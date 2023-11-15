import "./controlAndInfoBox.style.css"
import { Road_DIVIDER_detail_OTR as RoadDIVIDERdetailOTR, OffCanvasBoxInputsControl } from "../index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';


function ControlAndinfoBox(): JSX.Element {

    return (
        <div className="controlAndinfoBox">
            <div className="offCanvasBox_box">
                <div className="offCanvasBoxTextContent">
                    <p>All right! here we can search for places using the names of places or streets,</p>
                    <p>you can also enter the starting point and the end point to display the route</p>
                    <FontAwesomeIcon color="rgb(106, 255, 0)" icon={faCircleDown} size="2xl" />
                </div>
                <div className="offCanvasBoxCanvas">
                    <OffCanvasBoxInputsControl />
                </div>
            </div>
            <div className="control_detailOfTheRoad_box">
                <RoadDIVIDERdetailOTR />
            </div>
        </div>
    )
};


export default ControlAndinfoBox;