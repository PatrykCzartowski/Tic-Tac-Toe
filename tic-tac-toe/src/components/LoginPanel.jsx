export default function LoginPanel({ onLoginCancelButton }) {
    return (
        <div id="login-panel-backgournd" style={loginPanelBackgroundStyle}>
        <div id="login-panel">
            <h2>Log in</h2>
            <form id="login-form">
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

const loginPanelBackgroundStyle = {
    position: 'fixed', 
    top: '0', 
    left: '0', 
    width: '100%', 
    height: '100%', 
    background: 'rgba(0,0,0,0.5)', 
    zIndex: '1000'
};