export default function CreateAccountButton({ onCreateAccountButton }) {
    return (
        <button className="create-account-button" onClick={() => onCreateAccountButton()}>Create account</button>
    );
    }