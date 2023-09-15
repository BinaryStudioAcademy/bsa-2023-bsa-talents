import { Color, FontFamily, TextCategory } from '~/bundles/common/enums/enums';

const FONTS = {
    [TextCategory.H1]: {
        fontFamily: FontFamily.INTER_BOLD,
        fontSize: 42,
        color: Color.TEXT,
    },
    [TextCategory.H2]: {
        fontFamily: FontFamily.INTER_BOLD,
        fontSize: 28,
        color: Color.TEXT,
    },
    [TextCategory.H3]: {
        fontFamily: FontFamily.INTER_MEDIUM,
        fontSize: 26,
        color: Color.TEXT,
    },
    [TextCategory.H4]: {
        fontFamily: FontFamily.INTER_MEDIUM,
        fontSize: 24,
        color: Color.TEXT,
    },
    [TextCategory.H5]: {
        fontFamily: FontFamily.INTER_MEDIUM,
        fontSize: 18,
        color: Color.TEXT,
    },
    [TextCategory.H6]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 16,
        color: Color.TEXT,
    },
    [TextCategory.MENU]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 18,
        color: Color.TEXT,
    },
    [TextCategory.BODY1]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 14,
        color: Color.TEXT,
    },
    [TextCategory.BUTTON]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 16,
        color: Color.TEXT,
    },
    [TextCategory.CAPTION]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 12,
        color: Color.TEXT,
    },
    [TextCategory.INPUT]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 13,
        color: Color.TEXT,
    },
    [TextCategory.LABEL]: {
        fontFamily: FontFamily.INTER_MEDIUM,
        fontSize: 13,
        color: Color.TEXT,
    },
    [TextCategory.STEP]: {
        fontFamily: FontFamily.INTER_BOLD,
        fontSize: 13,
        color: Color.PRIMARY,
        textTransform: 'uppercase' as const,
    },
    [TextCategory.PLACEHOLDER]: {
        fontFamily: FontFamily.INTER_REGULAR,
        fontSize: 13,
        color: Color.TEXT2,
    },
};

export { FONTS };
