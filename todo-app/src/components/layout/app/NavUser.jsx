/* eslint-disable react/prop-types */
import {stringExtensions} from "../../../utils/string-extensions.js";

export default function NavUser({ user }) {
  const formattedUsername = stringExtensions.sliceWithDots(user.username, 15);

  return (
    <div style={styles.main}>
      <img src={user.avatar} style={styles.image}></img>
      <div style={styles.info}>
        <p style={styles.username}>{formattedUsername}</p>
        <p style={styles.account}>{user.accountType} Account</p>
      </div>
    </div>
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
};
