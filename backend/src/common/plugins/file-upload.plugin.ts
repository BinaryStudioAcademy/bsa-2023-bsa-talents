import multer from 'fastify-multer';

const storage = multer.memoryStorage();

const uploadFile = multer({
    storage,
    limits: {
        fileSize: 10_000_000,
    },
});

export { uploadFile };
