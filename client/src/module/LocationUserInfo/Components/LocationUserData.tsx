import React from "react"
import "./locationUserData.style.css";
import { Route, Routes } from 'react-router-dom';
import { UserDATA, LocationInfoBox } from ".";
import { useNavigate } from "react-router-dom";

function LocationUserData(): JSX.Element {
    const NAVIGATE = useNavigate();


    function hhh() {
        NAVIGATE("UserDATA")
    }

    function hhssh() {
        NAVIGATE("LocationInfoBox")
    }

    return (
        <div className="locationUserData">
            <div>
                <button onClick={hhh}>user_DATA</button>
                <button onClick={hhssh}>Locationtabulka</button>
            </div>
            <div>
                <Routes>
                    <Route path="UserDATA" element={<UserDATA />} />
                    <Route path="LocationInfoBox" element={<LocationInfoBox />} />
                </Routes>
            </div>
        </div>

    );
};


export default LocationUserData;