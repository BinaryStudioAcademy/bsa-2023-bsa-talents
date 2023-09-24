type Url = { url: string };

function toUrlLinks(links: string[] | undefined): Url[] {
    return links ? links.map((link) => ({ url: link })) : [];
}

function fromUrlLinks(links: Url[] | undefined): string[] {
    return links ? links.map((link) => link.url) : [];
}

export { fromUrlLinks, toUrlLinks };
