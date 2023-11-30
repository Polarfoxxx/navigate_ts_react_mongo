import React from "react";
import "./signUP_IN.style.css";

function SignIn(): JSX.Element {
    return (
        <div className="signUP_IN">
            <div className="signContainer">
                <div className="signContainerName">
                    <h1>Sign in</h1>
                </div>
                <form action="">
                    <input
                    
                        placeholder="Email"
                        type="text" />
                    <input
                        type="text"
                        placeholder="Password" />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn