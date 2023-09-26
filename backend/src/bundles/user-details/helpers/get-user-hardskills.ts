import { type HardSkillsEntity } from '~/bundles/hard-skills/hard-skills.entity.js';
import { hardSkillsService } from '~/bundles/hard-skills/hard-skills.js';
import { talentHardSkillsService } from '~/bundles/talent-hard-skills/talent-hard-skills.js';

const getUserHardSkills = async (
    userDetailsId: string,
): Promise<HardSkillsEntity[]> => {
    const hardSkillsData = await talentHardSkillsService.findByUserDetailsId(
        userDetailsId,
    );

    const userHardSkills: HardSkillsEntity[] = [];

    for (const skill of hardSkillsData) {
        if (skill.hardSkillId) {
            const hardSkill = await hardSkillsService.findById(
                skill.hardSkillId,
            );
            if (hardSkill) {
                userHardSkills.push(hardSkill);
            }
        }
    }

    return userHardSkills;
};

export { getUserHardSkills };
