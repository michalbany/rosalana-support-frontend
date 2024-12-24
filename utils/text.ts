export function inicials(name: string) {
  if (!name) return "";
    return name
      .split(/[.:\-_ ]/)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }
  
  export function textToLabel(text: string) {
    const exclude = [
      "to",
      "and",
      "or",
      "from",
      "with",
      "by",
      "in",
      "at",
      "for",
      "on",
      "off",
      "over",
      "under",
      "between",
      "among",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "around",
      "near",
      "beyond",
      "within",
      "without",
      "against",
      "towards",
      "upon",
      "about",
      "across",
      "behind",
      "beside",
      "beneath",
      "into",
      "onto",
      "out",
      "up",
      "down",
      "off",
      "along",
      "past",
      "since",
      "until",
      "via",
      "a",
      "the",
      "an",
      "some",
      "any",
    ];
  
    return text
      .replace(/[-._]/g, " ")
      .split(" ")
      .map((word, index, words) =>
        exclude.includes(word.toLowerCase()) && index !== 0 && index !== words.length - 1
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  
    // old implementation
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase().replace(/[-._]/g, " ");
  }
  
  export function colorViaTemp(temp: string, orange: number = 20, red: number = 50) {
    if (temp === "N/A") return "text-gray-600";
    const [value, unit] = temp.trim().split(/\s+/);
  
    if (Number(value) < orange) return "text-green-600";
    if (Number(value) < red) return "text-orange-600";
    return "text-red-600 font-semibold";
  }
  
  export function tagColor(tag: string) {
    switch (tag) {
      case "PUN-adept":
        return "green-500";
      case "EFI disk":
        return "red-400";
      case "HA":
        return "purple-400";
      case "hasGPU":
        return "yellow-400";
      case "infra":
        return "indigo-500";
      case "CloudInit":
        return "sky-500";
      case "ISO":
        return "pink-500";
      default:
        return generateRandomColor();
    }
  }
  
  function generateRandomColor() {
    const colors = [
      "red",
      "yellow",
      "green",
      "blue",
      "indigo",
      "purple",
      "pink",
      "orange",
      "sky",
      "emerald",
    ];
  
    const shaded = ["300", "400", "500", "600", "700"];
  
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    const randomShade = shaded[Math.floor(Math.random() * shaded.length)];
  
    return `${randomColor}-${randomShade}`;
  }
  
  export function importanceColor(importance?: string) {
    if (!importance) return "gray-500";
    switch (importance.toLowerCase()) {
      case "l5":
        return "red-500";
      case "l4":
        return "orange-500";
      case "l3":
        return "yellow-500";
      case "l2":
        return "purple-500";
      case "l1":
        return "indigo-500";
      default:
        return "gray-500";
    }
  }
  
  export function importanceText(importance: string) {
    switch (importance.toLowerCase()) {
      case "l5":
        return "Infra Critical";
      case "l4":
        return "Team Critical";
      case "l3":
        return "High";
      case "l2":
        return "Medium";
      case "l1":
        return "Low";
      default:
        return "Testing";
    }
  }
  
  export function ellipsis(
    text: string,
    { length = 20, breakPoint = 640 }: { length?: number; breakPoint?: number | null } = {}
  ) {
    const isSmallScreen = breakPoint ? window.innerWidth > breakPoint : false;
  
    if (isSmallScreen || text.length <= length) {
      return text;
    }
  
    return text.slice(0, length) + "...";
  }
  
  export function graphColor(percent: number) {
    if (percent < 50) return "slate-300";
    if (percent < 75) return "yellow-400";
    return "red-400";
  }
  