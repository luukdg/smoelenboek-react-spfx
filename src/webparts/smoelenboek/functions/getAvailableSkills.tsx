import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";

export const getAvailableSkills = async (
  props: ISmoelenboekProps,
): Promise<string[]> => {
  const response = await props.context.spHttpClient.get(
    `${props.siteUrl}/_api/web/lists/getbytitle('${props.listName}')/fields?$filter=InternalName eq 'Skills'&$select=Choices`,
    SPHttpClient.configurations.v1,
  );
  const data = await response.json();
  return data.value[0].Choices;
};
