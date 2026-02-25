import * as React from "react";
import { Input, Select, Button } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { IFilterBarProps } from "../types/filterTypes";

const FilterBar = ({
  search,
  setSearch,
  selectedRoles,
  setSelectedRoles,
  selectedSkills,
  setSelectedSkills,
  roles,
  skills,
}: IFilterBarProps) => {
  const hasFilters =
    selectedRoles.length > 0 || selectedSkills.length > 0 || search !== "";

  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedSkills([]);
    setSearch("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10px",
        marginTop: "20px",
      }}
    >
      <Input
        placeholder="Find colleagues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={selectedRoles[0] || ""}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (o) => o.value,
          );
          setSelectedRoles(selected);
        }}
      >
        <option value="" disabled selected>
          Filter on roles...
        </option>
        {roles.map((role, i) => (
          <option key={i} value={role}>
            {role}
          </option>
        ))}
      </Select>

      <Select
        value={selectedSkills[0] || ""}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (o) => o.value,
          );
          setSelectedSkills(selected);
        }}
      >
        <option value="" disabled>
          Filter on skills...
        </option>
        {skills.map((skill, i) => (
          <option key={i} value={skill}>
            {skill}
          </option>
        ))}
      </Select>
      {hasFilters && (
        <Button
          appearance="subtle"
          icon={<DismissRegular />}
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
