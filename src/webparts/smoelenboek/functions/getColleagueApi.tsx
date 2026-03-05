import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IColleague } from "../types/colleagueType";

export const getColleaguesFromGraph = async (
  graphClient: MSGraphClientV3,
): Promise<IColleague[]> => {
  const response = await graphClient
    .api("/users")
    .version("v1.0")
    .select(
      "displayName,mail,jobTitle,department,accountEnabled,mobilePhone,id,officeLocation",
    )
    .filter("department eq 'StudioM'")
    .top(100)
    .get();

  return response.value
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
    }));
};
