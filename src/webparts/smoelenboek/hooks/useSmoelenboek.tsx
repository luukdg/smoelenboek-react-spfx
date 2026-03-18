import { useEffect, useState, useCallback } from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IColleague } from "../types/colleagueType";
import { IProfile } from "../types/profileTypes";
import { getProfileList } from "../functions/getProfileList";
import { getAvailableSkills } from "../functions/getAvailableSkills";
import { getColleaguesFromGraph } from "../functions/getColleagueApi";
import { getPresenceByIds } from "../communications/getPresencesByUserId";

export const useSmoelenboek = (props: ISmoelenboekProps) => {
  const [colleagues, setColleagues] = useState<IColleague[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [presenceMap, setPresenceMap] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const searchActive =
    selectedRoles.length > 0 ||
    selectedSkills.length > 0 ||
    selectedLocation.length > 0 ||
    search !== "";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const client = await props.context.msGraphClientFactory.getClient("3");

      const [fetchedColleagues] = await Promise.all([
        getColleaguesFromGraph(client, props.studiomFilter),
        getProfileList(props, setProfiles),
      ]);

      setColleagues(fetchedColleagues);

      const userIds = fetchedColleagues
        .map((c) => c.GraphId ?? "")
        .filter(Boolean);

      const presence = await getPresenceByIds(client, userIds);
      setPresenceMap(presence);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [props.studiomFilter]); // only refetch when filter changes

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      const matchesLocation =
        selectedLocation.length === 0 ||
        selectedLocation.includes(c.Location || "");
      return matchesName && matchesRole && matchesSkills && matchesLocation;
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

  const filterKey = `${selectedRoles.join(",")}|${selectedSkills.join(",")}|${selectedLocation.join(",")}`;

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
    selectedLocation,
    setSelectedLocation,
  };
};
