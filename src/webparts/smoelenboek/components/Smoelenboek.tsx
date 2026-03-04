import * as React from "react";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import {
  FluentProvider,
  Text,
  Spinner,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  makeStyles,
  Divider,
} from "@fluentui/react-components";
import FilterBar from "./FilterBar";
import ColleagueGrid from "./ColleagueGrid";
import EditProfileDialog from "./editProfileDialog";
import { useSmoelenboek } from "../hooks/useSmoelenboek";

const useStyles = makeStyles({
  mainTitle: {
    fontWeight: "bold",
    fontSize: "2rem",
  },
  divCenter: {
    display: "flex",
    alignItems: "center",

    flexDirection: "column",
  },
  profileButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
});

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
    searchActive,
  } = useSmoelenboek(props);

  const theme = props.hasTeamsContext
    ? props.isDarkTheme
      ? teamsDarkTheme
      : teamsLightTheme
    : props.isDarkTheme
      ? webDarkTheme
      : webLightTheme;

  const styles = useStyles();

  if (loading) {
    return (
      <FluentProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Spinner label="Loading colleagues..." />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        {isInDirectory && (
          <div className={styles.profileButton}>
            <EditProfileDialog
              theme={theme}
              spProps={props}
              profileId={myProfile?.ProfileId}
              email={currentUserEmail}
              currentNote={myProfile?.Personalnote || ""}
              currentSkills={myProfile?.Skills || []}
              currentPhoto={myProfile?.Profilephoto || ""}
              availableSkills={availableSkills}
              onSaved={refreshProfiles}
            />
          </div>
        )}
        <div className={styles.divCenter}>
          <Text className={styles.mainTitle}>Smoelenboek</Text>
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

        {searchActive && (
          <div>
            <Divider style={{ margin: "20px 0" }}></Divider>
            <ColleagueGrid key={filterKey} colleagues={filtered} />
          </div>
        )}
      </div>
    </FluentProvider>
  );
};

export default Smoelenboek;
