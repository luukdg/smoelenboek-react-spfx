export interface IColleague {
  Name?: {
    Title: string;
    EMail: string;
  };
  Role?: string;
  Department?: string;
  Phone?: string;
  Location?: string;
  GraphId?: string;
  Personalnote?: string;
  Skills?: string[];
  ProfileId?: number;
  Profilephoto?: string;
  Presence: string;
}
