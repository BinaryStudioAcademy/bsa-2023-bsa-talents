import { type UserDetailsSearchUsersRequestDto } from './types.js';

type EmployeesFiltersDto = Omit<
    UserDetailsSearchUsersRequestDto,
    'hardSkills'
> & { hardSkills: { value: string; label: string }[] };

export { type EmployeesFiltersDto };
