import { HardSkillsEntity } from '~/bundles/hard-skills/hard-skills.entity.js';
import { type HardSkillsModel } from '~/bundles/hard-skills/hard-skills.model.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

class HardSkillsRepository implements Repository {
    private hardSkillsModel: typeof HardSkillsModel;

    public constructor(hardSkillsModel: typeof HardSkillsModel) {
        this.hardSkillsModel = hardSkillsModel;
    }

    public async findAll(): Promise<HardSkillsEntity[]> {
        const skills = await this.hardSkillsModel.query().execute();
        return skills.map((it) => HardSkillsEntity.initialize(it));
    }

    public create(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public find(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public update(): Promise<HardSkillsEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { HardSkillsRepository };
