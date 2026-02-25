import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";

export const saveProfile = async (
  props: ISmoelenboekProps,
  profileId: number | null,
  email: string,
  personalnote: string,
  skills: string[],
): Promise<void> => {
  const body = JSON.stringify({
    Email: email,
    Personalnote: personalnote,
    Skills: skills,
  });

  console.log("📤 Sending body:", body); // 👈 check what we're sending

  const response = await props.context.spHttpClient.post(
    `https://insidemedia-my.sharepoint.com/personal/luuk_de_graaf_wppmedia_com/_api/lists/getbytitle('SmoelenboekProfile')/items`,
    SPHttpClient.configurations.v1,
    {
      headers: {
        Accept: "application/json", // 👈 simplified
        "Content-Type": "application/json;odata=nometadata",
      },
      body,
    },
  );

  const result = await response.json();
  console.log("📥 Response:", result); // 👈 check what SharePoint returns
};
