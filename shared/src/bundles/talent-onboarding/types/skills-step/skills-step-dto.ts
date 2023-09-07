type SkillsStepDto = {
    hardSkills: { value: string; label: string }[];
    englishLevel: string;
    notConsidered: string[];
    preferredLanguages: string[];
    projectLinks: {
        url: string;
    }[];
};

export { type SkillsStepDto };
