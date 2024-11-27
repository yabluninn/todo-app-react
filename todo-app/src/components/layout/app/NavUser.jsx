/* eslint-disable react/prop-types */
export default function NavUser({ user }) {
  const formatContent = (content) => {
    if (content.length >= 15) {
      return content.slice(0, 15) + "...";
    } else {
      return content;
    }
  };

  const formattedUsername = formatContent(user.username);

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
