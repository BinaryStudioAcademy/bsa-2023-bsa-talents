import { type AvatarType } from '~/bundles/common/enums/ui/ui';
import { type ValueOf } from '~/bundles/common/types/types';

type AvatarProperties = {
    avatarSize?: ValueOf<typeof AvatarType>;
    fullName?: string;
    uri?: string;
};

export { type AvatarProperties };
