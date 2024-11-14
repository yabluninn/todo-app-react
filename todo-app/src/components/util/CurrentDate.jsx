export default function CurrentDate() {
  const currentDate = new Date();
  const options = {
    day: "numeric",
    weekday: "short",
    month: "short",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return <span style={styles.label}>{formattedDate}</span>;
}

const styles = {
  label: {
    fontSize: "16px",
    color: "#595959",
  },
};
