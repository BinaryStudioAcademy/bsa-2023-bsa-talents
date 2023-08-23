import { hash } from 'bcrypt';

const encrypt = async (data: string, rounds: number): Promise<string> => {
    return await hash(data, rounds);
};

export { encrypt };
