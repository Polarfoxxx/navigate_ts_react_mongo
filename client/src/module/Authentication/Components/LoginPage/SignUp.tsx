import React from "react";
import "./signUp.style.css";
import authentication from "../../../API/authentication.API/authentication";


function SignUp(): JSX.Element {


    return (
        <div className="signUp">
            <div className="signContainer">
                <div className="signContainerName">
                    <h1>Sign Up</h1>
                </div>
                <form action="">
                    <input
                        placeholder="Email"
                        type="text" />
                    <input
                        type="text"
                        placeholder="Password" />
                           <input
                        type="text"
                        placeholder="Password" />
                           <input
                        type="text"
                        placeholder="Password" />
                      
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;