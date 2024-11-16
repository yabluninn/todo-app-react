class CurrentDate {
  getFormattedCurrentDate() {
    const currentDate = new Date();
    const options = {
      day: "numeric",
      weekday: "short",
      month: "short",
      year: "numeric",
    };

    return currentDate.toLocaleDateString("en-US", options);
  }
}

export const currentDate = new CurrentDate();
