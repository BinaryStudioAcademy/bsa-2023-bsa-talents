import {
    CheckCircle,
    DoNotDisturbOn,
    Email,
    Language,
    Paid,
    PhoneAndroid,
    QuestionAnswer,
    SwitchCamera,
    Telegram,
} from '@mui/icons-material';

const CandidateIcons = {
    SALARY: Paid,
    LOCATION: Language,
    EXPERIENCE: SwitchCamera,
    ENGLISH: QuestionAnswer,
    EMPLOYMENT: CheckCircle,
    NOT_CONSIDERED: DoNotDisturbOn,
    TELEGRAM: Telegram,
    PHONE: PhoneAndroid,
    EMAIL: Email,
} as const;

export { CandidateIcons };
