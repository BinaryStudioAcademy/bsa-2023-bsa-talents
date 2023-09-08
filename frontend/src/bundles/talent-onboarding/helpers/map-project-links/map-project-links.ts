type UrlObject = { url: string };

function toUrlLinks(links: string[] | undefined): UrlObject[] {
    return links ? links.map((link) => ({ url: link })) : [];
}

function fromUrlLinks(links: UrlObject[] | undefined): string[] {
    return links ? links.map((link) => link.url) : [];
}

export { fromUrlLinks, toUrlLinks };
