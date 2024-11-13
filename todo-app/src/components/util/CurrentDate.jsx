export default function CurrentDate() {
  const currentDate = new Date();
  const options = { day: "numeric", month: "long" };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return <span style={styles.label}>{formattedDate}</span>;
}

const styles = {
  label: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};
