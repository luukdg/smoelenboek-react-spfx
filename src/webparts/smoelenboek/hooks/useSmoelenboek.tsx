import { useEffect, useState } from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IColleague } from "../types/colleagueType";
import { IProfile } from "../types/profileTypes";
import { getProfileList } from "../functions/getProfileList";
import { getAvailableSkills } from "../functions/getAvailableSkills";
import { getColleaguesFromGraph } from "../functions/getColleagueApi";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { getPresenceByIds } from "../communications/getPresencesByUserId";

export const useSmoelenboek = (props: ISmoelenboekProps) => {
  const [colleagues, setColleagues] = useState<IColleague[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [presenceMap, setPresenceMap] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const searchActive =
    selectedRoles.length > 0 || selectedSkills.length > 0 || search !== "";

  useEffect(() => {
    props.context.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3) => {
        Promise.all([
          getColleaguesFromGraph(client).then(async (fetchedColleagues) => {
            setColleagues(fetchedColleagues);

            const userIds = fetchedColleagues
              .map((c) => c.GraphId ?? "")
              .filter(Boolean);
            const presence = await getPresenceByIds(client, userIds);
            setPresenceMap(presence);
          }),
          getProfileList(props, setProfiles),
          getAvailableSkills(props).then(setAvailableSkills),
        ])
          .catch(console.error)
          .finally(() => setLoading(false));
      })
      .catch(console.error);
  }, []);

  const combined = colleagues.map((colleague) => {
    const profile = profiles.find((p) => p.Email === colleague.Name?.EMail);
    return {
      ...colleague,
      Personalnote: profile?.Personalnote || "",
      Skills: profile?.Skills || [],
      ProfileId: profile?.Id,
      Profilephoto: profile?.Profilephoto || "",
      Presence: presenceMap[colleague.GraphId ?? ""] ?? "unknown",
    };
  });

  useEffect(() => {
    console.log("Colleagues:", combined);
  }, [combined]);

  const skills = [
    ...new Set(combined.flatMap((c) => c.Skills).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  const roles = [
    ...new Set(combined.map((c) => c.Role).filter((r): r is string => !!r)),
  ].sort((a, b) => a.localeCompare(b));

  const filtered = combined
    .filter((c) => {
      const matchesName =
        search === "" ||
        c.Name?.Title?.toLowerCase().includes(search.toLowerCase());
      const matchesRole =
        selectedRoles.length === 0 || selectedRoles.includes(c.Role || "");
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
    searchActive,
  };
};
