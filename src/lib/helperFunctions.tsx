import {
  active,
  admin,
  author,
  blocked,
  contentManager,
  hr,
  inactive,
  moderator,
  success,
  user,
} from "./constant";

export const dateString = (date: Date, details: boolean = true) => {
  const d = new Date(date);

  if (d && d.toString() === "Invalid Date") {
    return "N/A";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (details) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.hour12 = true;
  }

  const formattedDate = d.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export function serializeData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const statusColor = (status: string) => {
  switch (status) {
    case moderator:
      return "yellow-400";

    case success:
    case active:
      return "green-400";

    case blocked:
    case admin:
      return "red-400";
    case user:
      return "blue-400";
    case hr:
      return "purple-400";
    case author:
      return "cyan-400";
    case contentManager:
      return "pink-400";

    case inactive:
      return "gray-400";
    default:
      return "";
  }
};

export const toLocalDateTimeString = (utcDateString: Date) => {
  const date = new Date(utcDateString);
  const localISODate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
  return localISODate;
};

export const customSlug = (title: string, blogId: string) => {
  let slug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "")
    .replace(/-+/g, "-");
  if (slug.length > 60) {
    slug = slug.substring(0, 60);
  }

  return `${slug}-${blogId}`;
};
