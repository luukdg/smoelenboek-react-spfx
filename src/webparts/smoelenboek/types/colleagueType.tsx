export interface IColleague {
  Role: string;
  Skills: string[];
  Beschikbaarheid: string;
  Name: {
    Title: string;
    EMail: string;
  };
  Personalnote: string;
  ProfileId?: number | undefined;
}
