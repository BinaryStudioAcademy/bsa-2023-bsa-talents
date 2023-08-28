import { StorageBase } from './storage-base.package.js';

const storage = new StorageBase(window.localStorage);

export { storage };
export { StorageKey } from './enums/enums.js';
export { type Storage } from './types/types.js';
