import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";

export const saveProfile = async (
  props: ISmoelenboekProps,
  profileId: number | undefined,
  email: string,
  personalnote: string,
  skills: string[],
): Promise<void> => {
  console.log("ProfileId received:", profileId);
  console.log("Email received:", email);

  const body = JSON.stringify({
    Email: email,
    Personalnote: personalnote,
    Skills: skills,
  });

  if (profileId) {
    // Update existing profile
    await props.context.spHttpClient.fetch(
      `${props.siteUrl}/_api/lists/getbytitle('${props.listName}')/items(${profileId})`,
      SPHttpClient.configurations.v1,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;odata=nometadata",
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE",
        },
        body,
      },
    );
    console.log("Profile updated!");
  } else {
    // Create new profile
    await props.context.spHttpClient.post(
      `${props.siteUrl}/_api/lists/getbytitle('${props.listName}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;odata=nometadata",
        },
        body,
      },
    );
    console.log("Profile created");
  }
};
