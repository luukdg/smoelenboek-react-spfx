import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IProfile } from "../types/profileTypes";

export const getProfileList = async (
  props: ISmoelenboekProps,
  setProfiles: (profiles: IProfile[]) => void,
): Promise<void> => {
  try {
    const response = await props.context.spHttpClient.get(
      `${props.siteUrl}/_api/lists/getbytitle('${props.listName}')/items?$select=Id,Email,Personalnote,Skills,Profilephoto`,
      SPHttpClient.configurations.v1,
    );

    if (!response.ok) {
      console.error("Error fetching profiles:", response.status);
      return;
    }

    const data = await response.json();
    console.log("Fetched profiles:", data.value);
    setProfiles(data.value ?? []);
  } catch (err) {
    console.error("Error fetching profiles:", err);
  }
};
