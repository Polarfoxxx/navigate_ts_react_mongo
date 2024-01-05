import { jwtDecode } from "jwt-decode";
import { Type_JWTdecode } from "./types";

function servicesJWTdecodeAndValidity(JWT_FROM_STORAGE: string): boolean {

    let checkVerification = false;
    const JWT_DECODE: Type_JWTdecode = jwtDecode(JWT_FROM_STORAGE);
    const DATE = Math.floor(Date.now() / 1000);

    if (DATE < JWT_DECODE.exp) {
        checkVerification = true
    } else { 
        checkVerification = false ;
        localStorage.removeItem('JWT_token');
    }

    return checkVerification
};


export default servicesJWTdecodeAndValidity;