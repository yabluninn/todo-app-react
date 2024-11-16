import { headerService } from "../../services/HeaderService";

/* eslint-disable react/prop-types */
export default function Greetings({ username }) {
  const { text: greetingsPart, emoji: greetingEmoji } =
    headerService.getGreeting();

  return (
    <p style={styles.main}>
      {greetingsPart}, {username}! 👋 {greetingEmoji}
    </p>
  );
}

const styles = {
  main: {
    fontSize: "22px",
    fontWeight: "bold",
  },
};
