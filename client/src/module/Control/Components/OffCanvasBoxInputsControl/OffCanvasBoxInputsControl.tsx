import { ButtonComponent, OffCanvasComponent } from 'foxxy-package/dist';
import React from 'react';
import ControlBox from './ControlBox';
import "./offCanvasBox.style.css";


function OffCanvasBoxInputsControl(): JSX.Element {
    const [show, setShow] = React.useState(false);
    const handleClick = (): void => {
        setShow(!show);
    };

    return (
        <div className="offCanvasBox">
            <div className='offCanvasButtonBox'>
                <button className='offCanvasButtonON' onClick={handleClick}> Search</button>
            </div>

            <OffCanvasComponent.OffCanvas show={show} setShow={setShow} position="left" variant_offCnv='dark'>
                <OffCanvasComponent.OffCanvasHeader>
                    Points on the map
                </OffCanvasComponent.OffCanvasHeader>
                <OffCanvasComponent.OffCanvasBody>
                    <ControlBox />
                </OffCanvasComponent.OffCanvasBody>
                <OffCanvasComponent.OffCanvasButoonBox>
                    <ButtonComponent.ButtonBox>
                        <button className='offCanvasButtonOFF' onClick={handleClick}>Close</button>
                    </ButtonComponent.ButtonBox>
                </OffCanvasComponent.OffCanvasButoonBox>
            </OffCanvasComponent.OffCanvas>
        </div>
    );
};

export default OffCanvasBoxInputsControl;

