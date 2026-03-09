import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISmoelenboekProps {
  listName: string;
  siteUrl: string;
  studiomFilter: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}
