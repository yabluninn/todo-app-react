class HeaderService {
  getGreeting() {
    const nowTime = new Date();
    const hours = nowTime.getHours();

    if (hours >= 0 && hours < 7) return { text: "Good Night", emoji: "🌙" };
    if (hours >= 7 && hours < 11) return { text: "Good Morning", emoji: "🌅" };
    if (hours >= 11 && hours < 18) return { text: "Good Day", emoji: "☀️" };
    return { text: "Good Evening", emoji: "🌆" };
  }
}

export const headerService = new HeaderService();
