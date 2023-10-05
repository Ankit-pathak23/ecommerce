import React from 'react'
import { useDispatch } from 'react-redux'
import { googleregister } from '../redux/Slice/UserSlice';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function Googelogin() {
    const dispatch = useDispatch()

    return (
        <div>
            
            <GoogleLogin
                onSuccess={credentialResponse => {
                const credentialResponseDeode = jwt_decode(
                    credentialResponse.credential
                )
                console.log(credentialResponseDeode);
                dispatch(googleregister({'name': credentialResponseDeode.name, 'email': credentialResponseDeode.email,'image': credentialResponseDeode.picture}))
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    )
}

export default Googelogin