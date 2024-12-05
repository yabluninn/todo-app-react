class StringExtensions {
  sliceWithDots = (content, length) => {
    if (content.length >= length) {
      return content.slice(0, length) + " ...";
    } else {
      return content;
    }
  };
}

export const stringExtensions = new StringExtensions();
