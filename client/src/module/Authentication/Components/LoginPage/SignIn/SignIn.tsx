import React from "react";
import "../SignUp/signUP_IN.style.css";
import { AUTHENTICATION_API } from "../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import validator from "email-validator";
import { Type_forAuthentication_API, Type_forInputElemets } from "../..";
import { useNavigate } from "react-router-dom";

function SignIn(): JSX.Element {
    const NAVIGATE = useNavigate();
    const { handleSubmit, reset } = useInputValue();
    const [respoMessage, setRespoMessage] = React.useState("");
    const imputPassConfir = React.useRef<Type_forInputElemets>({
        emailValue: null,
        passwordValue: null,
    });

    /* priprava a kontrola hodnout pre odoslanie form */
    const submit = (v: TypeForInputsObject["v"]): void => {
        const emailValue = v[0].inputValues.toString();
        const passwordValue = v[1].inputValues.toString();

        /* valdicia dat oznacenie chybajucej hodnoty*/
        const VALIDATE_EMAIL = validator.validate(emailValue);
        if (VALIDATE_EMAIL) {
            imputPassConfir.current.emailValue!.style.border = "";
            if (passwordValue && passwordValue.length >= 4) {
                imputPassConfir.current.passwordValue!.style.border = "";
                fetchDATA({ emailValue, passwordValue })
                reset()
            } else {
                imputPassConfir.current.passwordValue!.style.border = "1px solid red";
            };
        } else {
            imputPassConfir.current.emailValue!.style.border = "1px solid red";
        };
    };

    /* odoslanie form */
    async function fetchDATA({ emailValue, passwordValue }: Type_forAuthentication_API) {
        try {
            const LOGIN_DATA = await AUTHENTICATION_API.loginUser_API({ emailValue, passwordValue });
            if (LOGIN_DATA?.status === 200) {
                localStorage.setItem("JWT_token", JSON.stringify({
                    JWT_token: LOGIN_DATA.JWT_token,
                    user_Name: LOGIN_DATA.user_name
                }));
                NAVIGATE("/Content");
            } else {
                if (LOGIN_DATA?.message) {
                    setRespoMessage(LOGIN_DATA?.message);
                    setTimeout(() => {
                        setRespoMessage("")
                    }, 8000);
                };
            };
        } catch (error) {
            console.error(error);
        };
    };


    return (
        <div className="signUP_IN">
            <div className="signContainer">
                <div className="signContainerName">
                    <h1>Sign in</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <div className="loginBoxErrorMessage">
                        <p>{respoMessage}</p>
                    </div>
                    <input
                        ref={el => (imputPassConfir.current.emailValue = el)}
                        name="emailValue"
                        placeholder="Email"
                        autoComplete="email"
                        type="email" />
                    <input
                        ref={el => (imputPassConfir.current.passwordValue = el)}
                        name="passwordValue"
                        type="password"
                        placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;