export interface IFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  selectedRoles: string[];
  setSelectedRoles: (value: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (value: string[]) => void;
  selectedLocation: string[];
  setSelectedLocation: (value: string[]) => void;
  roles: string[];
  skills: string[];
}
