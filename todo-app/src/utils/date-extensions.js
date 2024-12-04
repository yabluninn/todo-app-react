class DateExtensions {
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

  formatDate(inputDate) {
    if (!inputDate) return "";

    const date = new Date(inputDate);

    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  getFormattedDate(date) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }
}

export const dateExtensions = new DateExtensions();
