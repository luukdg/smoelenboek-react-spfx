declare interface ISmoelenboekWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SharepointListLabel: string;
  StudioMFilterLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module "SmoelenboekWebPartStrings" {
  const strings: ISmoelenboekWebPartStrings;
  export = strings;
}
