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
import logoLight from "../assets/StudioM_WPPMediaBrand_black.png";
import logoDark from "../assets/StudioM_WPPMediaBrand_white.png";

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
    selectedLocation,
    setSelectedLocation,
  } = useSmoelenboek(props);

  const theme = props.hasTeamsContext
    ? props.isDarkTheme
      ? teamsDarkTheme
      : teamsLightTheme
    : props.isDarkTheme
      ? webDarkTheme
      : webLightTheme;

  const logo = props.isDarkTheme ? logoDark : logoLight;

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
      <div
        style={{ padding: "20px", position: "relative", minHeight: "100vh" }}
      >
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
          <img
            src={logo}
            alt="Logo"
            style={{ width: "300px", height: "auto" }}
          />
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
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {searchActive && (
          <div>
            <Divider style={{ margin: "20px 0" }} />
            <ColleagueGrid
              key={filterKey}
              colleagues={filtered}
              siteUrl={props.siteUrl}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  );
};

export default Smoelenboek;
