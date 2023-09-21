import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type FileModel } from '../files/file.model.js';
import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type OnboardingSteps,
    type PreferredLanguages,
} from './enums/enums.js';
import { type UserDetailsProperties } from './types/types.js';

class UserDetailsEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'isApproved': boolean;

    private 'deniedReason': string | null;

    private 'isHired': boolean;

    private 'profileName': string | null;

    private 'salaryExpectation': number | null;

    private 'hiredSalary': number | null;

    private 'jobTitle': ValueOf<typeof JobTitle> | null;

    private 'location': ValueOf<typeof CountryList> | null;

    private 'experienceYears': number | null;

    private 'employmentType': ValueOf<typeof EmploymentType>[] | null;

    private 'description': string | null;

    private 'englishLevel': ValueOf<typeof EnglishLevel> | null;

    private 'notConsidered': ValueOf<typeof NotConsidered>[] | null;

    private 'preferredLanguages': ValueOf<typeof PreferredLanguages>[] | null;

    private 'projectLinks': string[] | null;

    private 'photoId': string | null;

    private 'fullName': string | null;

    private 'phone': string | null;

    private 'linkedinLink': string | null;

    private 'companyName': string | null;

    private 'companyLogoId': string | null;

    private 'companyWebsite': string | null;

    private 'employerPosition': string | null;

    private 'cvId': string | null;

    private 'completedStep': ValueOf<typeof OnboardingSteps> | null;

    private 'photo': ValueOf<typeof FileModel> | null;

    private 'companyLogo': ValueOf<typeof FileModel> | null;

    private constructor({
        id,
        userId,
        isApproved,
        deniedReason,
        isHired,
        profileName,
        salaryExpectation,
        hiredSalary,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
        englishLevel,
        notConsidered,
        preferredLanguages,
        projectLinks,
        photoId,
        fullName,
        phone,
        linkedinLink,
        companyName,
        companyLogoId,
        companyWebsite,
        employerPosition,
        cvId,
        completedStep,
        photo,
        companyLogo,
    }: UserDetailsProperties) {
        this.id = id;
        this.userId = userId;
        this.isApproved = isApproved;
        this.deniedReason = deniedReason;
        this.isHired = isHired;
        this.profileName = profileName;
        this.salaryExpectation = salaryExpectation;
        this.hiredSalary = hiredSalary;
        this.jobTitle = jobTitle;
        this.location = location;
        this.experienceYears = experienceYears;
        this.employmentType = employmentType;
        this.description = description;
        this.englishLevel = englishLevel;
        this.notConsidered = notConsidered;
        this.preferredLanguages = preferredLanguages;
        this.projectLinks = projectLinks;
        this.photoId = photoId;
        this.fullName = fullName;
        this.phone = phone;
        this.linkedinLink = linkedinLink;
        this.companyName = companyName;
        this.companyLogoId = companyLogoId;
        this.companyWebsite = companyWebsite;
        this.employerPosition = employerPosition;
        this.cvId = cvId;
        this.completedStep = completedStep;
        this.photo = photo;
        this.companyLogo = companyLogo;
    }

    public static initialize({
        id,
        userId,
        isApproved,
        deniedReason,
        isHired,
        profileName,
        salaryExpectation,
        hiredSalary,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
        englishLevel,
        notConsidered,
        preferredLanguages,
        projectLinks,
        photoId,
        fullName,
        phone,
        linkedinLink,
        companyName,
        companyLogoId,
        companyWebsite,
        employerPosition,
        cvId,
        completedStep,
        photo,
        companyLogo,
    }: UserDetailsProperties): UserDetailsEntity {
        return new UserDetailsEntity({
            id,
            userId,
            isApproved,
            deniedReason,
            isHired,
            profileName,
            salaryExpectation,
            hiredSalary,
            jobTitle,
            location,
            experienceYears,
            employmentType,
            description,
            englishLevel,
            notConsidered,
            preferredLanguages,
            projectLinks,
            photoId,
            fullName,
            phone,
            linkedinLink,
            companyName,
            companyLogoId,
            companyWebsite,
            employerPosition,
            cvId,
            completedStep,
            photo,
            companyLogo,
        });
    }

    public static initializeNew({
        userId,
        isApproved,
        deniedReason,
        isHired,
        profileName,
        salaryExpectation,
        hiredSalary,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
        englishLevel,
        notConsidered,
        preferredLanguages,
        projectLinks,
        photoId,
        fullName,
        phone,
        linkedinLink,
        companyName,
        companyLogoId,
        companyWebsite,
        employerPosition,
        cvId,
        completedStep,
        photo,
        companyLogo,
    }: UserDetailsProperties): UserDetailsEntity {
        return new UserDetailsEntity({
            id: null,
            userId,
            isApproved,
            deniedReason,
            isHired,
            profileName,
            salaryExpectation,
            hiredSalary,
            jobTitle,
            location,
            experienceYears,
            employmentType,
            description,
            englishLevel,
            notConsidered,
            preferredLanguages,
            projectLinks,
            photoId,
            fullName,
            phone,
            linkedinLink,
            companyName,
            companyLogoId,
            companyWebsite,
            employerPosition,
            cvId,
            completedStep,
            photo,
            companyLogo,
        });
    }

    public toObject(): UserDetailsProperties {
        return {
            id: this.id as string,
            userId: this.userId,
            isApproved: this.isApproved,
            deniedReason: this.deniedReason,
            isHired: this.isHired,
            profileName: this.profileName,
            salaryExpectation: this.salaryExpectation,
            hiredSalary: this.hiredSalary,
            jobTitle: this.jobTitle,
            location: this.location,
            experienceYears: this.experienceYears,
            employmentType: this.employmentType,
            description: this.description,
            englishLevel: this.englishLevel,
            notConsidered: this.notConsidered,
            preferredLanguages: this.preferredLanguages,
            projectLinks: this.projectLinks,
            photoId: this.photoId,
            fullName: this.fullName,
            phone: this.phone,
            linkedinLink: this.linkedinLink,
            companyName: this.companyName,
            companyLogoId: this.companyLogoId,
            companyWebsite: this.companyWebsite,
            employerPosition: this.employerPosition,
            cvId: this.cvId,
            completedStep: this.completedStep,
            photo: this.photo,
            companyLogo: this.companyLogo,
        };
    }

    public toNewObject(): UserDetailsProperties {
        return {
            id: null,
            userId: this.userId,
            isApproved: this.isApproved,
            deniedReason: this.deniedReason,
            isHired: this.isHired,
            profileName: this.profileName,
            salaryExpectation: this.salaryExpectation,
            hiredSalary: this.hiredSalary,
            jobTitle: this.jobTitle,
            location: this.location,
            experienceYears: this.experienceYears,
            employmentType: this.employmentType,
            description: this.description,
            englishLevel: this.englishLevel,
            notConsidered: this.notConsidered,
            preferredLanguages: this.preferredLanguages,
            projectLinks: this.projectLinks,
            photoId: this.photoId,
            fullName: this.fullName,
            phone: this.phone,
            linkedinLink: this.linkedinLink,
            companyName: this.companyName,
            companyLogoId: this.companyLogoId,
            companyWebsite: this.companyWebsite,
            employerPosition: this.employerPosition,
            cvId: this.cvId,
            completedStep: this.completedStep,
            photo: this.photo,
            companyLogo: this.companyLogo,
        };
    }
}

export { UserDetailsEntity };
