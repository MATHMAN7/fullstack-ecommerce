
import "./UserCard.css";

function UserCard({ user, onLogout }) {
    return (
        <div className="user-card">
            <div className="user-avatar">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="User avatar"
                />
            </div>
            <h3>{user?.username || "Guest"}</h3>
            <p>{user?.email || "Not logged in"}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default UserCard;
