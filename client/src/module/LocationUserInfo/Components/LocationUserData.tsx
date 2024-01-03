import React from "react"
import "./locationUserData.style.css";
import { Route, Routes, Link } from 'react-router-dom';
import { UserDATA, LocationInfoBox } from ".";
import { useNavigate } from "react-router-dom";

function LocationUserData(): JSX.Element {
    const NAVIGATE = useNavigate();

    React.useEffect(() => {
        NAVIGATE("UserDATA")
    }, [])


    return (
        <div className="locationUserData">
            <div className="locationUserDataNavigate">
                <Link className="link " to="UserDATA">Your data</Link>
                <Link className="link " to="LocationInfoBox">Location suggestions</Link>
            </div>
            <div className="locationUserDataContent">
                <Routes>
                    <Route path="UserDATA/*" element={<UserDATA />} />
                    <Route path="LocationInfoBox" element={<LocationInfoBox />} />
                </Routes>
            </div>
        </div>
    );
};


export default LocationUserData;