import { useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';

export default function LoginPanel({ onLoginCancelButton }) {

    const [accounts, setAccounts] = useState();
    const [isProvidedAccountValid, setIsProvidedAccountValid] = useState(null);
    const [isadmin, setIsAdmin] = useState(null);

    function getAccounts() {
        fetch('http://localhost:3001/accounts')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setAccounts(data);
        });
    }

    useEffect(() => {
        getAccounts();
      }, []);

    const processForm = (event) => {
        event.preventDefault();
        const providedUsername = event.target[0].value;
        const providedPassword = event.target[1].value;
        for (const account of accounts) {
            if (account.username === providedUsername && account.password === sha256(providedPassword).toString()) {
                setIsProvidedAccountValid(true);
                if(account.is_admin === true){
                    setIsAdmin(true);
                }
            }
        }
    };

    return (
        <div id="login-panel-background">
        <div id="login-panel">
            <h2>Log in</h2>
            <form id="login-form" onSubmit={processForm}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Log in</button>
                <button id="cancel-button" onClick={() => onLoginCancelButton()}>Cancel</button>
            </form>
        </div>
        </div>
    );
}
