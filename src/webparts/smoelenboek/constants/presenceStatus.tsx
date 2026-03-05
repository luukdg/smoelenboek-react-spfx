import { PresenceBadgeStatus } from "@fluentui/react-components";

export const toPresenceStatus = (availability: string): PresenceBadgeStatus => {
  switch (availability) {
    case "Available":
      return "available";
    case "Busy":
      return "busy";
    case "Away":
      return "away";
    case "DoNotDisturb":
      return "do-not-disturb";
    case "Offline":
      return "offline";
    case "OutOfOffice":
      return "out-of-office";
    default:
      return "unknown";
  }
};
