import {
    type BsaBadgesStepDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepDto>;
type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepDto>;

export {
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
