class HeaderService {
  getGreeting() {
    const nowTime = new Date();
    const hours = nowTime.getHours();

    if (hours >= 0 && hours < 7) return { text: "good-night", emoji: "🌙" };
    if (hours >= 7 && hours < 11) return { text: "good-morning", emoji: "🌅" };
    if (hours >= 11 && hours < 18) return { text: "good-day", emoji: "☀️" };
    return { text: "good-evening", emoji: "🌆" };
  }
}

export const headerService = new HeaderService();
