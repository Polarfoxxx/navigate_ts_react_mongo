import React from "react";
import "./login_page.style.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";


function LoginPage(): JSX.Element {
    const [hide, setHide] = React.useState(false);
    const [hideBox, setHideBox] = React.useState(false);
    const buttonBoxRef = React.useRef<HTMLDivElement | null>(null);
    const signBoxRef = React.useRef<HTMLDivElement | null>(null);

    /* zobrazenie form */
    const handleClickForm = (id: string): void => {
        id === "Sign in" ? setHide(false) : setHide(true)
        setHideBox(true)
    };


    /* pridanie a odobranie eventu po klikniti momo form */
    React.useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e: MouseEvent): void => {
        if (buttonBoxRef.current && signBoxRef.current &&
            !buttonBoxRef.current.contains(e.target as Node) &&
            !signBoxRef.current.contains(e.target as Node)) {
            setHideBox(false);
        };
    };


    return (
        <div className="loginPage">
            <div className="buttonSide">
                <div className="buttonSideCol">
                    <div
                        ref={buttonBoxRef}
                        className="buttonBox">
                        <div className="signButton in">
                            <div className="effectButton SigIn">
                                <button
                                    className="SignInButton"
                                    onClick={() => handleClickForm("Sign in")}> Sign in</button>
                            </div>
                        </div>
                        <div className="signButton up">
                            <div className="effectButton SigUp">
                                <button
                                    className="SignUpButton"
                                    onClick={() => handleClickForm("Sign up")}> Sign up</button>
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
                        <span className="welcomeBox">Welcome</span>
                        <span className="tomyBox">to my website!</span>
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
                <div className="textEmailBlock">
                    <h3>suchovsky.michal@gmail.com</h3>
                </div>
            </div>
        </div>
    );
};



export default LoginPage; 