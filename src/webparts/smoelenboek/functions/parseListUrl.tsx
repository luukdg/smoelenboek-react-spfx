export interface IListUrlParts {
  siteUrl: string;
  listName: string;
}

export const parseListUrl = (url: string): IListUrlParts | null => {
  try {
    const parsed = new URL(url);

    // Extract site URL - everything before /Lists/
    const listsIndex = parsed.pathname.indexOf("/Lists/");
    if (listsIndex === -1) return null;

    const sitePath = parsed.pathname.substring(0, listsIndex);
    const siteUrl = `${parsed.origin}${sitePath}`;

    // Extract list name - between /Lists/ and the next /
    const afterLists = parsed.pathname.substring(listsIndex + 7); // 7 = "/Lists/".length
    const listName = decodeURIComponent(afterLists.split("/")[0]);

    return { siteUrl, listName };
  } catch {
    return null;
  }
};
