import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IProfile } from "../types/profileTypes";

export const getProfileList = async (
  props: ISmoelenboekProps,
  setProfiles: (profiles: IProfile[]) => void,
): Promise<void> => {
  const response = await props.context.spHttpClient.get(
    `https://insidemedia-my.sharepoint.com/personal/luuk_de_graaf_wppmedia_com/_api/lists/getbytitle('SmoelenboekProfile')/items?$select=Id,Email,Personalnote,Skills`,
    SPHttpClient.configurations.v1,
  );
  const data = await response.json();
  setProfiles(data.value);
};
