type Url = { url: string };

const stringsToUrlObjects = (links: string[] | null): Url[] => {
    return links?.map((url) => ({ url })) ?? [];
};

const urlObjectsToStrings = (links: Url[] | null): string[] => {
    return links?.map(({ url }) => url) ?? [];
};

export { stringsToUrlObjects, urlObjectsToStrings };
