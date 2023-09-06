import { Typography } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type CandidateIcons } from '~/bundles/talent-onboarding/enums/candidate-icons.enum.js';

import styles from './styles.module.scss';

type Properties = {
    icon: ValueOf<typeof CandidateIcons>;
    imgAlt: string;
    text: string | number | string[];
    className?: string;
    typographyVariant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'menu'
        | 'body1'
        | 'button'
        | 'caption'
        | 'input'
        | 'label';
};

const CandidateParameter: React.FC<Properties> = ({
    icon,
    className,
    text,
    imgAlt,
    typographyVariant = 'body1',
}) => {
    return (
        <li className={styles.candidateParam}>
            <img src={icon} className={styles.icon} alt={imgAlt} />
            <Typography variant={typographyVariant} className={className}>
                {text}
            </Typography>
        </li>
    );
};

export { CandidateParameter };
