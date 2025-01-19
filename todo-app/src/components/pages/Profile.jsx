import "../../styles/Profile.css";
import ava from "../../assets/avatar.png";
import {ACCOUNT_TYPES} from "../../constants/account-types.js";

export default function Profile(){
    const accType = ACCOUNT_TYPES.FREE;
    const user = {
        username: "Artem Yablunin",
        avatar: ava,
        accountType: accType,
        email: "test@gmail.com",
    };

    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-main">
                    <img src={user.avatar} style={styles.image}></img>
                    <div style={styles.info}>
                        <p style={styles.username}>{user.username}</p>
                        <p style={styles.email}>{user.email}</p>
                        <p style={styles.account}>{user.accountType} Account</p>
                    </div>
                </div>
                <div style={styles.buttons}>
                    <button className="logout-button">
                        Log Out
                    </button>
                    <button className="delete-button" style={{marginTop: "12px"}}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    image: {
        width: "100px",
        height: "100px",
        background: "lightblue",
        padding: "8px",
        borderRadius: "8px",
    },
    info: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "16px",
    },
    username: {
        fontSize: "28px",
    },
    email: {
        fontSize: "16px",
        color: "#aaaaaa",
    },
    account: {
        fontSize: "18px",
        color: "#aaa",
        border: "1px solid #ccc",
        borderRadius: "8px",
        paddingLeft: "46px",
        paddingRight: "46px",
        paddingTop: "4px",
        paddingBottom: "4px",
        marginTop: "8px",
    },
    buttons: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "auto",
    }
}