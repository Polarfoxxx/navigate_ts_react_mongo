import "./controlAndInfoBox.style.css"
import { Road_DIVIDER_detail_OTR as RoadDIVIDERdetailOTR, OffCanvasBoxInputsControl } from "../index";

function ControlAndinfoBox(): JSX.Element {

    return (
        <div className="controlAndinfoBox">
            <div className="offCanvasBox_box">
                <OffCanvasBoxInputsControl />
            </div>
            <div className="control_detailOfTheRoad_box">
                <RoadDIVIDERdetailOTR />
            </div>
        </div>
    )
};


export default ControlAndinfoBox;