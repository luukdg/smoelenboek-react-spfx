import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IProfile } from "../types/profileTypes";

export const getProfile = async (
  props: ISmoelenboekProps,
  email: string,
): Promise<IProfile | undefined> => {
  const response = await props.context.spHttpClient.get(
    `${props.siteUrl}/_api/lists/getbytitle('${props.listName}')/items?$select=Id,Email,Personalnote,Skills&$filter=Email eq '${email}'`,
    SPHttpClient.configurations.v1,
  );
  const data = await response.json();
  return data.value.length > 0 ? data.value[0] : undefined;
};
