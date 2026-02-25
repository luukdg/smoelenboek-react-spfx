import * as React from "react";
import { IColleague } from "../types/colleagueType";
import ColleagueCard from "./ColleagueCard";

interface IColleagueGridProps {
  colleagues: IColleague[];
}

const ColleagueGrid = ({ colleagues }: IColleagueGridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {colleagues.map((colleague) => (
        <ColleagueCard key={colleague.Name?.EMail} colleague={colleague} />
      ))}
    </div>
  );
};

export default ColleagueGrid;
