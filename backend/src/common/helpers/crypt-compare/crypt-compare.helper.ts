import { compare } from 'bcrypt';

const cryptCompare = async (
    data: string,
    encrypted: string,
): Promise<boolean> => {
    return await compare(data, encrypted);
};

export { cryptCompare };
