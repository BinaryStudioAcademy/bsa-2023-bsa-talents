type Url = { url: string };

const toUrlLinks = (links: string[] | undefined): Url[] => {
    return links ? links.map((link) => ({ url: link })) : [];
};

const fromUrlLinks = (links: Url[] | undefined): string[] => {
    return links ? links.map((link) => link.url) : [];
};

export { fromUrlLinks, toUrlLinks };
