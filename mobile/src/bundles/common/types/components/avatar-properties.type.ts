import { type ValueOf } from 'shared/build/types/value-of.type.js';

import { type AvatarType } from '~/bundles/common/enums/ui/avatar-type.enum';

type AvatarProperties = {
    avatarSize?: ValueOf<typeof AvatarType>;
    fullName?: string;
    uri?: string;
};

export { type AvatarProperties };
