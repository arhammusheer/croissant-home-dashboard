export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const pluralize = (num: number, label: string) => {
  if (num === 1) {
    return num + label;
  }
  return num + label + "s";
};

export const relativeTime = (time: Date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  
  const diff = Date.now()-time.getTime() 
  console.log(diff)
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  if (years > 0) {
    return rtf.format(-years, "year");
  }
  if (months > 0) {
    return rtf.format(-months, "month");
  }
  if (days > 0) {
    return rtf.format(-days, "day");
  }
  if (hours > 0) {
    return rtf.format(-hours, "hour");
  }
  if (minutes > 0) {
    return rtf.format(-minutes, "minute");
  }
  if (seconds > 0) {
    return rtf.format(-seconds, "second");
  }

  return "now";
};
