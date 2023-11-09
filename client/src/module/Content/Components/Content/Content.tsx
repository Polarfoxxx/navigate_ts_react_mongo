import "./content.style.css"
import { ControlAndinfoBox } from "../../../Control";
import { MapAndHeaderBox } from "../../../Maps";
import { LocationInfoBox } from "../../../LocationInfo";
import { Header } from "../../../HeaderAndFooter/Components";




function Content() {
    return (
        <div className="appBlock" >
            <div className="container">
                <header>
                    <Header/>
                </header>
                <section>
                    <div className='mapsAndControl'>
                        <div className='controlBox'>
                            <ControlAndinfoBox />
                        </div>
                        <div className='mapsBox'>
                            <MapAndHeaderBox />
                        </div>
                    </div>
                    <div className='locationInfobox'>
                        <LocationInfoBox />
                    </div>
                </section>
                <footer>
                    fooo
                </footer>
            </div>
        </div>

    )
};


export default Content;