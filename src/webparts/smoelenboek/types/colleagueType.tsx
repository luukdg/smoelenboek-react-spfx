export interface IColleague {
  Role: string;
  Skills: string[];
  Location: string;
  Name: {
    Title: string;
    EMail: string;
    JobTitle?: string;
  };
  Personalnote: string;
  ProfileId?: number | undefined;
  Profilephoto?: string;
}
