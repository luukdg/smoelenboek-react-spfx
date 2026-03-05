import * as React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Avatar,
  Text,
  Badge,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { IColleague } from "../types/colleagueType";
import { getPhotoUrl } from "../functions/getPhotoUrl";
import { parseProfilePhoto } from "../functions/parseProfilePhoto";

const useStyles = makeStyles({
  card: {
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground3,
    animationName: {
      from: {
        opacity: "0",
        transform: "translateY(16px)",
      },
      to: {
        opacity: "1",
        transform: "translateY(0)",
      },
    },
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationFillMode: "both",
  },
  name: {
    fontSize: tokens.fontSizeBase400,
  },
  jobTitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  location: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
  },
});

interface IColleagueCardProps {
  colleague: IColleague;
  index?: number;
}

const ColleagueCard = ({
  colleague,
  index = 0,
}: IColleagueCardProps): JSX.Element => {
  const styles = useStyles();

  return (
    <Card
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s`, display: "flex" }}
    >
      <CardHeader
        image={
          <Avatar
            name={colleague.Name?.Title}
            image={{
              src: colleague.Profilephoto
                ? parseProfilePhoto(colleague.Profilephoto)
                : getPhotoUrl(colleague.Name?.EMail ?? ""),
            }}
            size={48}
          />
        }
        header={
          <Text className={styles.name} weight="semibold">
            {colleague.Name?.Title}
          </Text>
        }
        description={
          <div>
            <Text size={200} block className={styles.jobTitle}>
              {colleague.Role || "No job title"}
            </Text>
            <Text size={200} block className={styles.location}>
              {colleague.Location}
            </Text>
          </div>
        }
      />
      {colleague.Personalnote && (
        <div
          style={{
            width: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <>
            <strong>About me:</strong>
            <div>{colleague.Personalnote}</div>
          </>
        </div>
      )}
      <CardFooter>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {colleague.Skills?.map((skill, i) => (
            <Badge key={i} appearance="filled">
              {skill}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ColleagueCard;
