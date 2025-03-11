/* eslint-disable react/prop-types */
import {stringExtensions} from "../../../utils/string-extensions.js";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function NavUser({ user }) {
  const [isHovered, setIsHovered] = useState(false);

  const DEFAULT_APP_URL = "/app";

  const formattedUsername = stringExtensions.sliceWithDots(user.username, 15);

  if (!user) {
    return null;
  }

  return (
      <Link
          to={DEFAULT_APP_URL + "/profile"}
          style={{...styles.main, cursor: isHovered ? "pointer" : "default"}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <i style={styles.userIcon} className="hgi hgi-stroke hgi-user"></i>
        <div style={styles.info}>
          <p style={styles.username}>{formattedUsername}</p>
          <p style={styles.account}>{user.accountType} Account</p>
        </div>
      </Link>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "6px",
    marginTop: "44px",
    textDecoration: "none",
  },
  image: {
    width: "50px",
    height: "50px",
    background: "lightblue",
    padding: "8px",
    borderRadius: "8px",
  },
  info: {
    marginLeft: "12px",
  },
  username: {
    fontSize: "14px",
  },
  account: {
    fontSize: "12px",
    color: "#aaa",
  },
  userIcon: {
    fontSize: "18px",
    padding: "8px",
    borderRadius: "25%",
    backgroundColor: "#f6f6f6",
  }
};
