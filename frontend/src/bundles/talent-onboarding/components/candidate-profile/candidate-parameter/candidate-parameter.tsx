import { Typography } from '~/bundles/common/components/components.js';

import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
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
    className,
    text,
    typographyVariant = 'body1',
    children,
}) => {
    return (
        <li className={styles.candidateParam}>
            {children}
            <Typography variant={typographyVariant} className={className}>
                {text}
            </Typography>
        </li>
    );
};

export { CandidateParameter };
