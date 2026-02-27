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
import { uploadProfilePhoto } from "../functions/uploadProfilePhoto";

interface IEditProfileDialogProps {
  spProps: ISmoelenboekProps;
  profileId: number | undefined;
  email: string;
  currentNote: string;
  currentSkills: string[];
  availableSkills: string[];
  currentPhoto?: string;
  onSaved: () => void;
}

const EditProfileDialog = ({
  spProps,
  profileId,
  email,
  currentNote,
  currentSkills,
  availableSkills,
  currentPhoto,
  onSaved,
}: IEditProfileDialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(currentNote || "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    currentSkills || [],
  );
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(currentPhoto || "");

  const handleSave = async (): Promise<void> => {
    setSaving(true);

    if (photoFile && profileId) {
      await uploadProfilePhoto(spProps, profileId, photoFile, currentPhoto);
    }

    await saveProfile(spProps, profileId, email, note, selectedSkills);
    setSaving(false);
    setOpen(false);
    onSaved();
  };

  const toggleSkill = (skill: string): void => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file)); // preview before saving
    }
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
            Edit your profile
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
                      marginBottom: "8px",
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
              <div>
                <strong>Profile photo</strong>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Button
                    appearance="secondary"
                    onClick={() =>
                      document.getElementById("photoUpload")?.click()
                    }
                  >
                    Upload photo
                  </Button>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
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
