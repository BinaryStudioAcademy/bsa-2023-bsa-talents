import { BaseStorage } from './base-storage.package';

const storage = new BaseStorage();

export { storage };
export { StorageKey } from './enums/enums';
export { socketMiddleware } from './middlewares/middlewares';
export { type Storage } from './types/types';
