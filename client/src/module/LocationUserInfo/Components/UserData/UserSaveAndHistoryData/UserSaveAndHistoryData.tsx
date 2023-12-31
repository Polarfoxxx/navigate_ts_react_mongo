import { Route, Link, Routes } from "react-router-dom";
import { UserHistoryData, UserSaveData } from "../..";
import "./userSaveAndHistoryData.style.css";


function UserSaveAndHistoryData(): JSX.Element {


    return (
        <div className="userSaveAndHisData">
            <div className="userSaveAndHisData_nav">
                <Link className="link " to="UserHistoryData">History search</Link>
                <Link className="link " to="UserSaveData">Save route</Link>
            </div>
            <div className="userSaveAndHisData_content">
                <Routes>
                    <Route path="UserHistoryData" element={<UserHistoryData />} />
                    <Route path="UserSaveData" element={<UserSaveData />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserSaveAndHistoryData;