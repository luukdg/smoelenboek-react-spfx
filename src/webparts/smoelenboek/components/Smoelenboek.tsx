import * as React from "react";
import { useEffect, useState } from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { IColleague } from "../types/colleagueType";
import { IProfile } from "../types/profileTypes";
import { getColleagueList } from "../functions/getColleagueList";
import { getProfileList } from "../functions/getProfileList";
import {
  FluentProvider,
  webLightTheme,
  Text,
  Button,
} from "@fluentui/react-components";
import FilterBar from "./FilterBar";
import ColleagueGrid from "./ColleagueGrid";
import { saveProfile } from "../functions/saveProfile";
import { EditRegular } from "@fluentui/react-icons";

const Smoelenboek = (props: ISmoelenboekProps) => {
  const [colleagues, setColleagues] = useState<IColleague[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    getColleagueList(props, setColleagues);
    getProfileList(props, setProfiles);
  }, []);

  const combined = colleagues.map((colleague) => {
    const profile = profiles.find((p) => p.Email === colleague.Name?.EMail);
    return {
      ...colleague,
      Personalnote: profile?.Personalnote || "",
      Skills: profile?.Skills || [],
    };
  });

  const skills = [
    ...new Set(combined.flatMap((c) => c.Skills).filter(Boolean)),
  ];
  const roles = [...new Set(combined.map((c) => c.Role).filter(Boolean))];

  const filtered = combined.filter((c) => {
    const matchesName =
      search === "" ||
      c.Name?.Title?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      selectedRoles.length === 0 || selectedRoles.includes(c.Role);

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => c.Skills.includes(skill));

    return matchesName && matchesRole && matchesSkills;
  });

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Text size={800} weight="bold">
            Smoelenboek StudioM
          </Text>
          <Button
            icon={<EditRegular />}
            onClick={() =>
              saveProfile(
                props,
                null,
                props.context.pageContext.user.email,
                "",
                [],
              )
            }
          >
            Edit your profile
          </Button>
        </div>
        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          roles={roles}
          skills={skills}
        />

        <ColleagueGrid colleagues={filtered} />
      </div>
    </FluentProvider>
  );
};

export default Smoelenboek;
