import { useEffect, useState } from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IColleague } from "../types/colleagueType";
import { IProfile } from "../types/profileTypes";
import { getColleagueList } from "../functions/getColleagueList";
import { getProfileList } from "../functions/getProfileList";
import { getAvailableSkills } from "../functions/getAvailableSkills";

export const useSmoelenboek = (props: ISmoelenboekProps) => {
  const [colleagues, setColleagues] = useState<IColleague[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getColleagueList(props, setColleagues),
      getProfileList(props, setProfiles),
      getAvailableSkills(props).then(setAvailableSkills),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const combined = colleagues.map((colleague) => {
    const profile = profiles.find((p) => p.Email === colleague.Name?.EMail);
    return {
      ...colleague,
      Personalnote: profile?.Personalnote || "",
      Skills: profile?.Skills || [],
      ProfileId: profile?.Id,
      Profilephoto: profile?.Profilephoto || "",
    };
  });

  const skills = [
    ...new Set(combined.flatMap((c) => c.Skills).filter(Boolean)),
  ];
  const roles = [
    ...new Set(
      combined.map((c) => c.Name?.JobTitle).filter((r): r is string => !!r),
    ),
  ];

  const filtered = combined
    .filter((c) => {
      const matchesName =
        search === "" ||
        c.Name?.Title?.toLowerCase().includes(search.toLowerCase());
      const matchesRole =
        selectedRoles.length === 0 ||
        selectedRoles.includes(c.Name?.JobTitle || "");
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => c.Skills.includes(skill));
      return matchesName && matchesRole && matchesSkills;
    })
    .sort((a, b) => (a.Name?.Title ?? "").localeCompare(b.Name?.Title ?? ""));

  const currentUserEmail = props.context.pageContext.user.email;
  const myProfile = combined.find(
    (c) => c.Name?.EMail?.toLowerCase() === currentUserEmail?.toLowerCase(),
  );

  const isInDirectory = !!myProfile;

  const refreshProfiles = (): void => {
    getProfileList(props, setProfiles).catch(console.error);
  };

  const filterKey = `${selectedRoles.join(",")}|${selectedSkills.join(",")}`;

  return {
    loading,
    search,
    setSearch,
    selectedRoles,
    setSelectedRoles,
    selectedSkills,
    setSelectedSkills,
    availableSkills,
    roles,
    skills,
    filtered,
    currentUserEmail,
    myProfile,
    refreshProfiles,
    filterKey,
    isInDirectory,
  };
};
