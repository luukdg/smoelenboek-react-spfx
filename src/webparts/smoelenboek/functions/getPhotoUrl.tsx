export const getPhotoUrl = (email: string, siteUrl: string): string => {
  return `${siteUrl}/_layouts/15/userphoto.aspx?size=L&accountname=${email}`;
};
