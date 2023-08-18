import { MMKV } from 'react-native-mmkv';

import { type ValueOf } from '~/bundles/common/types/types';

import { type StorageKey } from './enums/enums';
import { type Storage } from './interfaces/interfaces';

class BaseStorage implements Storage {
    private store: MMKV;

    public constructor() {
        this.store = new MMKV();
    }

    public set(key: ValueOf<typeof StorageKey>, value: string): Promise<void> {
        this.store.set(key as string, value);

        return Promise.resolve();
    }

    public get<T = string>(key: ValueOf<typeof StorageKey>): Promise<T | null> {
        return Promise.resolve(
            (this.store.getString(key as string) as T) ?? null,
        );
    }

    public drop(key: ValueOf<typeof StorageKey>): Promise<void> {
        this.store.delete(key as string);

        return Promise.resolve();
    }

    public async has(key: ValueOf<typeof StorageKey>): Promise<boolean> {
        const value = await this.get(key);

        return Boolean(value);
    }
}

export { BaseStorage };
