import sha256 from 'crypto-js/sha256';

export default function RegisterPanel ({ onCancelCreateAccount }) {
    
    function generateSalt() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const password = sha256(event.target[1].value).toString();
        const passwd_salt = generateSalt();
        const is_admin = false;
        fetch('http://localhost:3001/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, passwd_salt, is_admin})
        })
        .then(response => {
            if (response.status === 200) {
                onCancelCreateAccount();
            }
        });
    }
    
    return (
        <div id="register-panel-background">
        <div id="register-panel">
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>
                <button id="cancel-button" onClick={() => onCancelCreateAccount()}>Cancel</button>
            </form>
        </div>
        </div>
    );
}