import * as React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Textarea,
  Checkbox,
  FluentProvider,
  webLightTheme,
  Text,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";
import { saveProfile } from "../functions/saveProfile";

interface IEditProfileDialogProps {
  spProps: ISmoelenboekProps;
  profileId: number | null;
  email: string;
  currentNote: string;
  currentSkills: string[];
  availableSkills: string[];
  onSaved: () => void;
}

const EditProfileDialog = ({
  spProps,
  profileId,
  email,
  currentNote,
  currentSkills,
  availableSkills,
  onSaved,
}: IEditProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(currentNote || "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    currentSkills || [],
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveProfile(spProps, profileId, email, note, selectedSkills);
    setSaving(false);
    setOpen(false);
    onSaved();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  useEffect(() => {
    setNote(currentNote || "");
    setSelectedSkills(currentSkills || []);
  }, [currentNote, currentSkills]);

  return (
    <FluentProvider theme={webLightTheme}>
      <Dialog open={open} onOpenChange={(e, data) => setOpen(data.open)}>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="primary" size="small" icon={<EditRegular />}>
            Edit profile
          </Button>
        </DialogTrigger>
        <DialogSurface style={{ backgroundColor: "white" }}>
          <DialogBody>
            <DialogTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>Edit your profile</div>
                <div>
                  <Text size={200} style={{ color: "#888" }}>
                    {email}
                  </Text>
                </div>
              </div>
            </DialogTitle>

            <DialogContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <strong>About me</strong>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tell something about yourself..."
                    style={{ width: "100%", marginTop: "8px" }}
                    rows={4}
                  />
                </div>

                <div>
                  <strong>Skills</strong>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      marginTop: "4px",
                    }}
                  >
                    {availableSkills.map((skill, i) => (
                      <Checkbox
                        key={i}
                        label={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};

export default EditProfileDialog;
