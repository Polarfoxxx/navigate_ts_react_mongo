import React from "react";
import "./login_page.style.css";
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";


function LoginPage(): JSX.Element {
    const TO_LOCATION = useNavigate()
    const [hide, setHide] = React.useState(false)
    const [hideBox, setHideBox] = React.useState(false)
    const buttonBoxRef = React.useRef<HTMLDivElement | null>(null);
    const signBoxRef = React.useRef<HTMLDivElement | null>(null);


    const handleClick = () => {
        TO_LOCATION("Content")
    };



    const handleClickForm = (id: string) => {
        id === "Sign in" ? setHide(false) : setHide(true)
        setHideBox(true)
    };


    React.useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e: any) => {
        if (buttonBoxRef.current && signBoxRef.current &&
            !buttonBoxRef.current.contains(e.target) &&
            !signBoxRef.current.contains(e.target)) {
            setHideBox(false);
        };
    }


    return (
        <div className="loginPage">
            <div className="buttonSide">
                <div className="buttonSideCol">
                    <div
                        ref={buttonBoxRef}
                        className="buttonBox">
                        <div className="signButton in">
                            <div className="effectButton">
                                <button onClick={() => handleClickForm("Sign in")}> Sign in</button>
                            </div>
                        </div>
                        <div className="signButton up">
                            <div className="effectButton">
                                <button onClick={() => handleClickForm("Sign up")}> Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="textSide">
                <div
                    ref={signBoxRef}
                    style={hideBox ? { right: "-400px" } : { right: "-150%" }}
                    className="signBox">
                    <div
                        style={hide ? { left: "0px", transitionDelay: "1s" } : { left: "100%" }}
                        className="signInContainer">
                        <SignUp />
                    </div>
                    <div
                        style={hide ? { left: "100%" } : { left: "0px", transitionDelay: "1s" }}
                        className="signUpContainer">
                        <SignIn />
                    </div>
                </div>
                <div className="textBlock">
                    <div className="headTextBlock">
                        <span className="welcomeBox">Welcome</span> <span className="tomyBox">to my website!</span>
                    </div>
                    <div className="bodyTextBlock">
                        <div className="bodyTextContent">
                            <p className="first"> I'm Michal, and I'm currently learning and developing my skills as a front-end developer.</p>
                            <p>This website represents my step into the world of modern web development using React and TypeScript.</p>
                            <p>I want to share my progress and experiences with you on this journey.</p>
                            <p>Take a look at my projects, leave me feedback, and don't hesitate to reach out if you have any questions or ideas.</p>
                            <p>Thank you for being here!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};



export default LoginPage; 