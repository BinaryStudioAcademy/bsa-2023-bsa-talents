import locationIcon from '~/assets/img/profile-parameters/country.svg';
import englishIcon from '~/assets/img/profile-parameters/english.svg';
import experienceIcon from '~/assets/img/profile-parameters/experience.svg';
import emailIcon from '~/assets/img/profile-parameters/mail.svg';
import notConsideredIcon from '~/assets/img/profile-parameters/not-consider.svg';
import phoneIcon from '~/assets/img/profile-parameters/phone.svg';
import salaryIcon from '~/assets/img/profile-parameters/salary.svg';
import telegramIcon from '~/assets/img/profile-parameters/telegram.svg';
import workIcon from '~/assets/img/profile-parameters/work.svg';

const CandidateIcons = {
    SALARY: salaryIcon,
    LOCATION: locationIcon,
    EXPERIENCE: experienceIcon,
    ENGLISH: englishIcon,
    EMPLOYMENT: workIcon,
    NOT_CONSIDERED: notConsideredIcon,
    TELEGRAM: telegramIcon,
    PHONE: phoneIcon,
    EMAIL: emailIcon,
} as const;

export { CandidateIcons };
