import { genSalt } from 'bcrypt';

const generateSalt = async (rounds: number): Promise<string> => {
    return await genSalt(rounds);
};

export { generateSalt };
