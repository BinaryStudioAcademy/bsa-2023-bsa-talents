import { hash } from 'bcrypt';

const encrypt = (data: string, rounds: number): Promise<string> => {
    return hash(data, rounds);
};

export { encrypt };
