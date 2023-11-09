import { ButtonComponent, OffCanvasComponent } from 'foxxy-package/dist';
import React from 'react';
import ControlBox from './ControlBox';

function OffCanvasBoxInputsControl(): JSX.Element {
    const [show, setShow] = React.useState(false);
    const handleClick = (): void => {
        setShow(!show);
    };
    return (
        <div className="App">
            <div>
                <ButtonComponent.ButtonBox>
                    <ButtonComponent.Button text='Searche' onClick={handleClick} variant_btn='dark' round />
                </ButtonComponent.ButtonBox>
            </div>

            <OffCanvasComponent.OffCanvas show={show} setShow={setShow} position="left" variant_offCnv='white'>
                <OffCanvasComponent.OffCanvasHeader>
                Points on the map
                </OffCanvasComponent.OffCanvasHeader>
                <OffCanvasComponent.OffCanvasBody>
                    <ControlBox />
                </OffCanvasComponent.OffCanvasBody>
                <OffCanvasComponent.OffCanvasButoonBox>
                    <ButtonComponent.ButtonBox>
                        <ButtonComponent.Button text='exit' onClick={handleClick} round variant_btn='white'/>
                    </ButtonComponent.ButtonBox>
                </OffCanvasComponent.OffCanvasButoonBox>
            </OffCanvasComponent.OffCanvas>
        </div>
    );
};

export default OffCanvasBoxInputsControl;