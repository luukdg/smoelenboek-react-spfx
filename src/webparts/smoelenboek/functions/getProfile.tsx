import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IProfile } from "../types/profileTypes";

export const getProfile = async (
  props: ISmoelenboekProps,
  email: string,
): Promise<IProfile | null> => {
  const response = await props.context.spHttpClient.get(
    `https://insidemedia-my.sharepoint.com/personal/luuk_de_graaf_wppmedia_com/_api/lists/getbytitle('SmoelenboekProfile')/items?$select=Id,Email,Personalnote,Skills&$filter=Email eq '${email}'`,
    SPHttpClient.configurations.v1,
  );
  const data = await response.json();
  return data.value.length > 0 ? data.value[0] : null;
};
