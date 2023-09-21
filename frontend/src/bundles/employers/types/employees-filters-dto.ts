// type EmployeesFiltersDto = {
//     searchType: string;
//     searchValue: string;
//     searchActiveCandidatesOnly: boolean;
//     jobTitle: string[];
//     yearsOfExperience: string[];
//     hardSkills: string[];
//     userBsaCharacteristics: string[];
//     BSABadges: string[];
//     userBsaProject: string[];
//     location: string[];
//     englishLevel: string[];
//     employmentType: string[];
//     sortBy: string;
// };

import { type UserDetailsSearchUsersRequestDto } from './types.js';

type EmployeesFiltersDto = UserDetailsSearchUsersRequestDto;

export { type EmployeesFiltersDto };
