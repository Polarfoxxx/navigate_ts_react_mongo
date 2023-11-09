import Maps from '../Maps/Maps';
import { HeadMaps } from '../../../Control';
import "./mapAndHeaderBox.style.css";


function MapAndHeaderBox(): JSX.Element {

    return (
        <div className='mapAndHeaderBox'>
            <div className='header_Box'>
                <HeadMaps />
            </div>
            <div className='maps_Box'>
                <Maps />
            </div>
        </div>
    );
};

export default MapAndHeaderBox;



