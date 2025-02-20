import { configDotenv } from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

configDotenv()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function fetchWorks() {
    try {
        const response = await cloudinary.api.resources_by_asset_folder(process.env.ASSET_FOLDER)

        return response.resources;
    } catch (error) {
        console.error(error);       
    }
}

export default async function handler (req, res) {
    try {
        const resources = await fetchWorks();

        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({
            info : 'error fetching images from cloudinary',
            error: err
        })
    }
}