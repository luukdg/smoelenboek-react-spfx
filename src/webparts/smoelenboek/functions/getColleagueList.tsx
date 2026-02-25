import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IColleague } from "../types/colleagueType";
import { SPHttpClient } from "@microsoft/sp-http";

export async function getColleagueList(
  props: ISmoelenboekProps,
  setColleagues: (colleagues: IColleague[]) => void,
) {
  props.context.spHttpClient
    .get(
      `https://insidemedia-my.sharepoint.com/personal/luuk_de_graaf_wppmedia_com/_api/lists/getbytitle('Smoelenboek')/items?$expand=Name&$select=Role,Beschikbaarheid,Name/Title,Name/EMail`,
      SPHttpClient.configurations.v1,
    )
    .then((r) => r.json())
    .then((data) => setColleagues(data.value));
}
