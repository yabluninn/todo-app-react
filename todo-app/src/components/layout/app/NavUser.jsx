/* eslint-disable react/prop-types */

export default function NavUser({ user }) {
  return (
    <div style={styles.main}>
      <img src={user.avatar} style={styles.image}></img>
      <div style={styles.info}>
        <p style={styles.username}>{user.username}</p>
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
    marginTop: "38%",
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
    fontSize: "16px",
  },
  account: {
    fontSize: "14px",
    color: "#aaa",
  },
};
