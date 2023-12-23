import React from "react";
import "./signUP_IN.style.css";
import { AUTHENTICATION_API } from "../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import validator from "email-validator";
import { Type_forAuthentication_API } from "..";
import { useNavigate } from "react-router-dom";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";


type Type_forInputElemets = {
    emailValue: HTMLInputElement | null,
    passwordValue: HTMLInputElement | null,
};

function SignIn(): JSX.Element {
    const { user_DATA, setUser_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ user_DATA, setUser_DATA });
    const NAVIGATE = useNavigate();
    const { handleSubmit, reset } = useInputValue();
    const imputPassConfir = React.useRef<Type_forInputElemets>({
        emailValue: null,
        passwordValue: null,
    });


    const submit = (v: TypeForInputsObject["v"]): void => {
        const emailValue = v[0].inputValues.toString();
        const passwordValue = v[1].inputValues;

        /* valdicia dat oznacenie chybajucej hodnoty*/
        const VALIDATE_EMAIL = validator.validate(emailValue);
        if (VALIDATE_EMAIL) {
            imputPassConfir.current.emailValue!.style.backgroundColor = "";
            if (passwordValue) {
                imputPassConfir.current.passwordValue!.style.backgroundColor = "";
                fetchDATA({ emailValue, passwordValue })
                reset()
            } else {
                imputPassConfir.current.passwordValue!.style.border = "1px solid red";
            };
        } else {
            imputPassConfir.current.emailValue!.style.border = "1px solid red";
        };
    };


    async function fetchDATA({ emailValue, passwordValue }: Type_forAuthentication_API) {
        try {
            const LOGIN_DATA = await AUTHENTICATION_API.loginUser_API({ emailValue, passwordValue });
            if (LOGIN_DATA?.status === 200) {
                localStorage.setItem('JWT_token', JSON.stringify({
                    JWT_token: LOGIN_DATA.JWT_token, 
                    user_Name: LOGIN_DATA.user_name
                }));
                NAVIGATE("/Content");
                updateContext_DATA([
                    { newData: LOGIN_DATA.user_name, key: "loginName" },
                ]);
            } else {
                alert(LOGIN_DATA);
            };
        } catch (error) {
            console.error("chyba v prihlaseni");
        };
    };


    return (
        <div className="signUP_IN">
            <div className="signContainer">
                <div className="signContainerName">
                    <h1>Sign in</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <input
                        ref={el => (imputPassConfir.current.emailValue = el)}
                        name='emailValue'
                        placeholder="Email"
                        autoComplete="email"
                        type="email" />
                    <input
                        ref={el => (imputPassConfir.current.passwordValue = el)}
                        name='passwordValue'
                        type="text"
                        placeholder="Password" />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn