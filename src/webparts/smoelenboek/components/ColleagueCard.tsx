import * as React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Avatar,
  Text,
  Badge,
} from "@fluentui/react-components";
import { IColleague } from "../types/colleagueType";
import { getPhotoUrl } from "../functions/getPhotoUrl";

interface IColleagueCardProps {
  colleague: IColleague;
}

const ColleagueCard = ({ colleague }: IColleagueCardProps) => {
  return (
    <Card style={{ display: "flex" }}>
      <CardHeader
        image={
          <Avatar
            name={colleague.Name?.Title}
            image={{ src: getPhotoUrl(colleague.Name?.EMail) }}
            size={48}
          />
        }
        header={<Text weight="semibold">{colleague.Name?.Title}</Text>}
        description={
          <div>
            <Text size={200} block>
              {colleague.Role}
            </Text>
            <Text size={200} style={{ color: "#605E5C" }} block>
              {colleague.Beschikbaarheid}
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
            <strong>Over mij:</strong>
            <div>{colleague.Personalnote}</div>
          </>
        </div>
      )}
      <CardFooter>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {colleague.Skills?.map((skill, i) => (
            <Badge key={i} appearance="tint">
              {skill}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ColleagueCard;
