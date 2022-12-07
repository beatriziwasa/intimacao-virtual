import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login(props) {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/calendar",
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = (res) => {
        if (res.profileObj.email === 'beatriz.iwasa@gmail.com'
            //|| res.profileObj.email === 'dpaeroportofln@gmail.com'
            || res.profileObj.email === 'scandolara.pcsc@gmail.com'
            || res.profileObj.email === 'dpaeroporto@pc.sc.gov.br'
            || res.profileObj.email === 'beatriz-iwasa@pc.sc.gov.br') {
            props.handleUsuarioLogado(res.profileObj);
            props.handleLogin();
        } else {
            alert('Usuário sem acesso! Entre em contato com o administrador do sistema de Intimação Virtual.');
        }
    };

    const onFailure = (res) => {
        alert('Falha ao se autenticar!');
    }
    
    return (
        <div className='center'>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;