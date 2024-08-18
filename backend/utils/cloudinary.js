import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "web_chat_usersPhoto",
    });

    fs.unlinkSync(localFilePath);

    return response.secure_url;
  } catch (error) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const destroyOnCloudinary = async (imgPublicId) => {
  try {
    if(!imgPublicId) return null;
    cloudinary.uploader.destroy(`web_chat_usersPhoto/${imgPublicId}`);
    return;
  } catch (error) {
    return null;
  }
}

export { uploadOnCloudinary,destroyOnCloudinary };
