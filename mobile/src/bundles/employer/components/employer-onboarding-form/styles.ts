import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
    },
    defaultContainer: {
        width: 100,
        height: 100,
    },
    employerProfileContainer: {
        borderRadius: 50,
        backgroundColor: '#D1D1D1',
    },
    companyLogoContainer: {
        borderRadius: 0,
        borderWidth: 1,
        color: '#000',
        backgroundColor: '#FFFFFF',
    },
    defaultPhoto: {
        width: 60,
        height: 60,
        fontSize: 60,
        color: '#000',
    },
    companyLogo: {
        backgroundColor: '#FFFFFF',
    },
    employerPhoto: {
        backgroundColor: '#D1D1D1',
    },
    photoShape: {
        borderRadius: 0,
        borderWidth: 1,
    },
});

export { styles };
