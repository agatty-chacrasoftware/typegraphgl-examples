import cloudinary from "cloudinary";

export const uploadImageToCloudinary = async (createReadStream) => {
	const { secure_url: profilePictureUrl } = await new Promise(
		(resolve, reject) => {
			createReadStream().pipe(
				cloudinary.v2.uploader.upload_stream(
					{ folder: "test" },
					(error, result) => {
						if (error) {
							reject(error);
						}

						resolve(result);
					}
				)
			);
		}
	);

	return profilePictureUrl;
};
