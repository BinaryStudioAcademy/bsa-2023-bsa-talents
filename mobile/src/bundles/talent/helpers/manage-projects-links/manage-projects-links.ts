type UrlObject = { url: string };

const stringsToUrlObjects = (links: string[] | null): UrlObject[] => {
    return links?.map((url) => ({ url })) ?? [];
};

const urlObjectsToStrings = (links: UrlObject[] | null): string[] => {
    return links?.map(({ url }) => url) ?? [];
};

export { stringsToUrlObjects, urlObjectsToStrings };
