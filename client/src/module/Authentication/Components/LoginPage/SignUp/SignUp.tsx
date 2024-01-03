import React from "react";
import "./signUP_IN.style.css";
import { AUTHENTICATION_API, Type_forRespo_objekt } from "../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import validator from "email-validator";
import { Type_forAuthentication_API,Type_forInputElemets } from "../..";
import { DEFAULT_VALUE_INPUT_PASS_CONFIR, DEFAULT_VALUE_FOR_RESPO_MESSAGE } from "./default_value";




function SignUp(): JSX.Element {
    const { handleSubmit, reset } = useInputValue();
    const [respoMessage, setRespoMessage] = React.useState(DEFAULT_VALUE_FOR_RESPO_MESSAGE);
    const imputPassConfir = React.useRef<Type_forInputElemets>(DEFAULT_VALUE_INPUT_PASS_CONFIR);

    const submit = (v: TypeForInputsObject["v"]): void => {
        const emailValue = v[0].inputValues.toString();
        const passwordValue = v[1].inputValues;
        const passwordConfrmationValue = v[2].inputValues;

        /* valdicia dat */
        const VALIDATE_EMAIL = validator.validate(emailValue);
        if (VALIDATE_EMAIL) {
            imputPassConfir.current.emailValue!.style.backgroundColor = "";
            if (passwordValue) {
                imputPassConfir.current.passwordValue!.style.backgroundColor = "";
                if (passwordConfrmationValue && passwordValue === passwordConfrmationValue) {
                    imputPassConfir.current.passwordConfrmationValue!.style.backgroundColor = "";
                    fetchDATA({ emailValue, passwordValue })
                    reset()
                } else {
                    imputPassConfir.current.passwordConfrmationValue!.style.border = "1px solid red";
                };
            } else {
                imputPassConfir.current.passwordValue!.style.border = "1px solid red";
            };
        } else {
            imputPassConfir.current.emailValue!.style.border = "1px solid red";
        };
    };


    async function fetchDATA({ emailValue, passwordValue }: Type_forAuthentication_API) {
        try {
            const REGISTER_DATA = await AUTHENTICATION_API.registerNewUser_API({ emailValue, passwordValue });
            if (REGISTER_DATA?.message) {
                setRespoMessage({
                    status: REGISTER_DATA.status,
                    message: REGISTER_DATA.message
                });

                setTimeout(() => {
                    setRespoMessage(DEFAULT_VALUE_FOR_RESPO_MESSAGE)
                }, 5000)
            };
        } catch (error) {
            console.error(error);
        };
    };


    return (
        <div className="signUP_IN">
            <div className="signContainer">
                <div className="signContainerName">
                    <h1>Sign Up</h1>
                </div>
                <div 
                style={respoMessage.status === 200 ? {color:"green"}: {color: "red"}}
                className="loginBoxErrorMessage">
                    <p>{respoMessage.message}</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <input
                        ref={el => (imputPassConfir.current.emailValue = el)}
                        name='emailValue'
                        autoComplete="email"
                        placeholder="Email"
                        type="email" />
                    <input
                        ref={el => (imputPassConfir.current.passwordValue = el)}
                        name='passwordValue'
                        type="text"
                        placeholder="Password" />
                    <input
                        ref={el => (imputPassConfir.current.passwordConfrmationValue = el)}
                        name='passwordConfrmationValue'
                        type="password"
                        placeholder="Password confirmation" />
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;