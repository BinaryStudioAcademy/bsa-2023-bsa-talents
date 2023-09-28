import { type EmployerDataDto } from '~/bundles/employer/types/types.js';
import { type UserDetailsGeneralCustom } from '~/bundles/talent-onboarding/types/types.js';

function employerDataMapper(
    response: UserDetailsGeneralCustom,
): EmployerDataDto {
    return {
        userId: response.userId as string,
        companyWebsite: response.companyWebsite as string,
        fullName: response.fullName as string,
        companyLogo: response.companyLogoId as string,
        photo: response.photoId as string,
        employerPosition: response.employerPosition as string,
        companyName: response.companyName as string,
        location: response.location as string,
        description: response.description as string,
    };
}

export { employerDataMapper };
