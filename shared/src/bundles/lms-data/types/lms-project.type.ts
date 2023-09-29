type LMSProject = {
    name: string | null;
    details: {
        en: string | null;
        ua: string | null;
    } | null;
    repositoryUrl: string | null;
};

export { type LMSProject };
