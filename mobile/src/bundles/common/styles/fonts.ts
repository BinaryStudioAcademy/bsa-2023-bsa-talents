import { Color, FontFamily, TextCategory } from '~/bundles/common/enums/enums';

const FONTS = {
    [TextCategory.H1]: {
        fontFamily: FontFamily.INTER_700,
        fontSize: 42,
        color: Color.TEXT,
    },
    [TextCategory.H2]: {
        fontFamily: FontFamily.INTER_700,
        fontSize: 28,
        color: Color.TEXT,
    },
    [TextCategory.H3]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 26,
        color: Color.TEXT,
    },
    [TextCategory.H4]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 24,
        color: Color.TEXT,
    },
    [TextCategory.H5]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 18,
        color: Color.TEXT,
    },
    [TextCategory.H6]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 16,
        color: Color.TEXT,
    },
    [TextCategory.MENU]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 18,
        color: Color.TEXT,
    },
    [TextCategory.BODY1]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 14,
        color: Color.TEXT,
    },
    [TextCategory.BUTTON]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 16,
        color: Color.TEXT,
    },
    [TextCategory.CAPTION]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 12,
        color: Color.TEXT,
    },
    [TextCategory.INPUT]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 13,
        color: Color.TEXT,
    },
    [TextCategory.LABEL]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 13,
        color: Color.TEXT,
    },
};

export { FONTS };
