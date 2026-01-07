import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuid } from 'uuid'

export const uploadFile = async (filePath: string, fileName: string) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
    const result = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        resource_type: 'raw', // For non-image files like PDFs
    })
    return result
}

export const uploadImage = async (filePath: string) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
    const result = await cloudinary.uploader.upload(filePath, {
        public_id: uuid(),
        resource_type: 'image', // For non-image files like PDFs
    })
    return result
}