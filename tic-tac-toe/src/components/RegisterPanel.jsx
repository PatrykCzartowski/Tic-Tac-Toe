export default function RegisterPanel ({ onCancelCreateAccount }) {
    return (
        <div id="register-panel-backgroud" style={registerPanelBackgroundStyle}>
        <div id="register-panel">
            <h2>Register</h2>
            <form id="register-form">
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

const registerPanelBackgroundStyle = {
    position: 'fixed', 
    top: '0', 
    left: '0', 
    width: '100%', 
    height: '100%', 
    background: 'rgba(0,0,0,0.5)', 
    zIndex: '1000'
};