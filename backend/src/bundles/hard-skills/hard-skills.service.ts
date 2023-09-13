import { type HardSkillsEntity } from '~/bundles/hard-skills/hard-skills.entity.js';
import { type HardSkillsRepository } from '~/bundles/hard-skills/hard-skills.repository.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

class HardSkillsService implements Service {
    private hardSkillsRepository: HardSkillsRepository;

    public constructor(hardSkillsRepository: HardSkillsRepository) {
        this.hardSkillsRepository = hardSkillsRepository;
    }

    public async findAll(): Promise<{ items: HardSkillsEntity[] }> {
        const skills = await this.hardSkillsRepository.findAll();
        return { items: skills };
    }

    public find(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public create(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public update(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { HardSkillsService };
