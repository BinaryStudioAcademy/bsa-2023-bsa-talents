import { type EmployerDataDto } from '~/bundles/employers/types/types.js';

function employerDataMapper(response: EmployerDataDto): EmployerDataDto {
    return {
        userId: response.userId,
        companyWebsite: response.companyWebsite,
        fullName: response.fullName,
        companyLogo: response.companyLogo,
        photo: response.photo,
        employerPosition: response.employerPosition,
        companyName: response.companyName,
        location: response.location,
        description: response.description,
    };
}

export { employerDataMapper };
