import { SPHttpClient } from "@microsoft/sp-http";
import { ISmoelenboekProps } from "../types/ISmoelenboekProps";

export const uploadProfilePhoto = async (
  props: ISmoelenboekProps,
  profileId: number,
  file: File,
  currentPhoto?: string,
): Promise<void> => {
  const siteUrl =
    "https://insidemedia-my.sharepoint.com/personal/luuk_de_graaf_wppmedia_com";

  // 1. Delete previous attachment if exists
  if (currentPhoto) {
    const oldFileName = currentPhoto.split("/").pop();
    await props.context.spHttpClient.post(
      `${siteUrl}/_api/web/lists/getbytitle('SmoelenboekProfile')/items(${profileId})/AttachmentFiles/getByFileName('${oldFileName}')`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "X-HTTP-Method": "DELETE",
          "IF-MATCH": "*",
        },
        body: null as unknown as string,
      },
    );
  }

  // 2. Upload new attachment
  const arrayBuffer = await file.arrayBuffer();
  await props.context.spHttpClient.post(
    `${siteUrl}/_api/web/lists/getbytitle('SmoelenboekProfile')/items(${profileId})/AttachmentFiles/add(FileName='${file.name}')`,
    SPHttpClient.configurations.v1,
    { body: arrayBuffer as unknown as string },
  );

  // 3. Save the URL to Profilephoto column
  const photoUrl = `${siteUrl}/Lists/SmoelenboekProfile/Attachments/${profileId}/${file.name}`;
  await props.context.spHttpClient.post(
    `${siteUrl}/_api/web/lists/getbytitle('SmoelenboekProfile')/items(${profileId})`,
    SPHttpClient.configurations.v1,
    {
      body: JSON.stringify({ Profilephoto: photoUrl }),
      headers: {
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*",
        "Content-Type": "application/json",
      },
    },
  );
};
