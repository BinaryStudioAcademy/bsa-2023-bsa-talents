import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    texts: Record<string, string>;
};

const AnimatedTextBlock: React.FC<Properties> = ({ texts }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const currentIndexReference = useRef(0);
    const ERASE_DELAY = 3500;
    const TYPE_SPEED = 65;
    const RERUN_DELAY = 2000;
    const ONE = 1;
    const typeTextTimeoutReference = useRef<number | null>(null);
    const eraseTextTimeoutReference = useRef<number | null>(null);

    const textData: string[] = Object.values(texts);

    const typeText = useCallback(
        (textArray: string[]): void => {
            if (currentIndexReference.current < textArray.length && isTyping) {
                const nextCharacter = textArray[currentIndexReference.current];
                setCurrentText((previousText) => previousText + nextCharacter);
                currentIndexReference.current++;
                typeTextTimeoutReference.current = window.setTimeout(() => {
                    typeText(textArray);
                }, TYPE_SPEED);
            } else {
                typeTextTimeoutReference.current = null;
                eraseTextTimeoutReference.current = window.setTimeout(() => {
                    setIsTyping(false);
                }, ERASE_DELAY);
            }
        },
        [isTyping],
    );

    const eraseText = useCallback((): void => {
        if (currentIndexReference.current > 0 && !isTyping) {
            setCurrentText((previousText) => previousText.slice(0, -ONE));
            currentIndexReference.current--;
        }

        if (currentIndexReference.current === 0) {
            if (!isTyping && currentTextIndex < textData.length - ONE) {
                setCurrentTextIndex((previousText) => previousText + ONE);
                currentIndexReference.current = 0;
                setIsTyping(true);
            }

            if (currentTextIndex === textData.length - ONE) {
                currentIndexReference.current = 0;
                eraseTextTimeoutReference.current = window.setTimeout(() => {
                    setCurrentTextIndex(0);
                    setIsTyping(true);
                }, RERUN_DELAY);
            }
        }
    }, [currentTextIndex, isTyping, textData.length]);

    useEffect(() => {
        const textArray = textData[currentTextIndex]?.split('');

        if (isTyping) {
            typeTextTimeoutReference.current = window.setTimeout(() => {
                typeText(textArray);
            }, TYPE_SPEED);
        } else {
            eraseTextTimeoutReference.current = window.setTimeout(() => {
                eraseText();
            }, TYPE_SPEED);
        }

        return () => {
            if (typeTextTimeoutReference.current) {
                clearTimeout(typeTextTimeoutReference.current);
            }
            if (eraseTextTimeoutReference.current) {
                clearTimeout(eraseTextTimeoutReference.current);
            }
        };
    }, [currentTextIndex, isTyping, textData, eraseText, typeText]);

    return (
        <div className={styles.animatedTextWrapper}>
            <p className={styles.text}>
                <span className={styles.typedText}>
                    {currentText}
                    <span className={styles.cursor}>&nbsp;</span>
                </span>
            </p>
        </div>
    );
};

export { AnimatedTextBlock };
