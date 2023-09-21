type SkillsStepDto = {
    hardSkills: { id: string; name: string }[];
    englishLevel: string;
    notConsidered: string[];
    preferredLanguages: string[];
    projectLinks: {
        url: string;
    }[];
};

export { type SkillsStepDto };
