"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
const uploadFile = async (filePath, fileName) => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
    const result = await cloudinary_1.v2.uploader.upload(filePath, {
        public_id: fileName,
        resource_type: 'raw', // For non-image files like PDFs
    });
    return result;
};
exports.uploadFile = uploadFile;
const uploadImage = async (filePath) => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
    const result = await cloudinary_1.v2.uploader.upload(filePath, {
        public_id: (0, uuid_1.v4)(),
        resource_type: 'image', // For non-image files like PDFs
    });
    return result;
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary.js.map