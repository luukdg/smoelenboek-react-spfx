import * as React from "react";
import { IColleague } from "../types/colleagueType";
import ColleagueCard from "./ColleagueCard";

interface IColleagueGridProps {
  colleagues: IColleague[];
  siteUrl: string;
}

const ColleagueGrid = ({
  colleagues,
  siteUrl,
}: IColleagueGridProps): JSX.Element => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {colleagues.map((colleague, index) => (
        <ColleagueCard
          key={colleague.Name?.EMail}
          colleague={colleague}
          index={index}
          siteUrl={siteUrl}
        />
      ))}
    </div>
  );
};

export default ColleagueGrid;
