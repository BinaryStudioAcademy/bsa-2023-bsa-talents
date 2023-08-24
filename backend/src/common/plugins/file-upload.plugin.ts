import multer from 'fastify-multer';

const storage = multer.memoryStorage();

const uploadFile = multer({
    storage,
});

export { uploadFile };
