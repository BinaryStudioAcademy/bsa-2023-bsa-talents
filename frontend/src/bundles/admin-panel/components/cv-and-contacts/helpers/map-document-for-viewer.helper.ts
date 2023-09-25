const mapDocumentForViewer = (
    cvUrl: string,
): { uri: string; fileType: string }[] => {
    const [extension] = cvUrl.split('.').reverse();
    const fileType = extension === 'pdf' ? 'pdf' : 'docx';

    return [
        {
            uri: cvUrl,
            fileType,
        },
    ];
};

export { mapDocumentForViewer };
