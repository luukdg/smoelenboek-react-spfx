import { MSGraphClientV3 } from "@microsoft/sp-http";

export const getPresenceByIds = async (
  graphClient: MSGraphClientV3,
  userIds: string[],
): Promise<Record<string, string>> => {
  const response = await graphClient
    .api("/communications/getPresencesByUserId")
    .version("v1.0")
    .post({ ids: userIds });

  const presenceMap: Record<string, string> = {};
  response.value.forEach((presence: any) => {
    presenceMap[presence.id] = presence.availability;
  });

  return presenceMap;
};
