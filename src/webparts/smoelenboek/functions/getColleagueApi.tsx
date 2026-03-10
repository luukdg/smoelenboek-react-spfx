import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IColleague } from "../types/colleagueType";

export const getColleaguesFromGraph = async (
  graphClient: MSGraphClientV3,
  studiomFilter: string,
): Promise<IColleague[]> => {
  console.log("Fetching colleagues from Graph API");
  const departments = studiomFilter
    ? studiomFilter
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : ["StudioM"];

  const requests = departments.map((department) =>
    graphClient
      .api("/users")
      .version("v1.0")
      .select(
        "displayName,mail,jobTitle,department,accountEnabled,mobilePhone,id,officeLocation",
      )
      .filter(`department eq '${department}'`)
      .top(200)
      .get(),
  );

  const results = await Promise.all(requests);

  const allUsers = results.flatMap((r) => r.value);

  return allUsers
    .filter(
      (user: any) =>
        user.officeLocation?.includes("Amsterdam") ||
        user.officeLocation?.includes("Eindhoven"),
    )
    .map((user: any) => ({
      Name: {
        Title: user.displayName,
        EMail: user.mail,
      },
      Role: user.jobTitle ?? "",
      Department: user.department ?? "",
      Phone: user.mobilePhone ?? "",
      Location: user.officeLocation.split("-")[1]?.trim() ?? "",
      GraphId: user.id,
      Presence: "",
    }));
};
