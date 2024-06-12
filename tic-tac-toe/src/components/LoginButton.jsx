import { useState } from "react";

export default function LoginButton({ onLoginButtonClicked }) {



    return (
        <button className="login-button" onClick={() => onLoginButtonClicked()}>Log in</button>
    );
    }