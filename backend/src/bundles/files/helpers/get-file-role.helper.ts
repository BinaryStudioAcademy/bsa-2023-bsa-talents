import { type FileRoleValue } from '../types/types.js';

const getFileRole = (fileName: string): FileRoleValue => {
    const [role]: FileRoleValue[] = fileName.split('_') as FileRoleValue[];
    return role;
};

export { getFileRole };
