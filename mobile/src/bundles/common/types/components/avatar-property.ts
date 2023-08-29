import { type ValueOf } from 'shared/build/types/value-of.type';

import { type AvatarType } from '~/bundles/common/enums/ui/avatar-type.enum';

type AvatarProperty = {
    avatarSize?: ValueOf<typeof AvatarType>;
    fullName?: string;
    uri?: string;
};

export { type AvatarProperty };
