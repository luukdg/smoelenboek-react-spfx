import * as React from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import {
  FluentProvider,
  webLightTheme,
  Text,
  Spinner,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import FilterBar from "./FilterBar";
import ColleagueGrid from "./ColleagueGrid";
import EditProfileDialog from "./editProfileDialog";
import { useSmoelenboek } from "../hooks/useSmoelenboek";

const Smoelenboek = (props: ISmoelenboekProps): JSX.Element => {
  const {
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
  } = useSmoelenboek(props);

  if (loading) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner label="Loading colleagues..." />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={teamsDarkTheme}>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Text size={800} weight="bold">
            Smoelenboek StudioM
          </Text>
          {isInDirectory && (
            <EditProfileDialog
              spProps={props}
              profileId={myProfile?.ProfileId}
              email={currentUserEmail}
              currentNote={myProfile?.Personalnote || ""}
              currentSkills={myProfile?.Skills || []}
              currentPhoto={myProfile?.Profilephoto || ""}
              availableSkills={availableSkills}
              onSaved={refreshProfiles}
            />
          )}
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
        <ColleagueGrid key={filterKey} colleagues={filtered} />
      </div>
    </FluentProvider>
  );
};

export default Smoelenboek;
