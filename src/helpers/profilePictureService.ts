const cloudinary = require("cloudinary").v2;

export const getCloudinaryUrl = async (createReadStream) => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	const { secure_url: profilePictureUrl } = await new Promise(
		(resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream((error, result) => {
					if (error) {
						reject(error);
					}

					resolve(result);
				})
			);
		}
	);

	if (!profilePictureUrl) {
		throw new Error("Not able to upload image tocloudinary");
	}

	return profilePictureUrl;
};
