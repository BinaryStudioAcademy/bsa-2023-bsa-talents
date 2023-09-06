import { Language } from '@mui/icons-material';
import { Paid } from '@mui/icons-material';
import { SwitchCamera } from '@mui/icons-material';
import { Email } from '@mui/icons-material';
import { QuestionAnswer } from '@mui/icons-material';
import { PhoneAndroid } from '@mui/icons-material';
import { CheckCircle } from '@mui/icons-material';
import { DoNotDisturbOn } from '@mui/icons-material';
import { Telegram } from '@mui/icons-material';

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
