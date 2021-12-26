import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import dotenv from "dotenv";
// import { createEmployeeProfilePicture } from "../../helpers/employeeProfilePictureService";
dotenv.config();
const cloudinary = require("cloudinary").v2;

@Resolver()
export class ProfilePictureResolver {
	@Mutation(() => Boolean)
	async addProfilePicture(
		@Arg("picture", () => GraphQLUpload)
		{ createReadStream }: Upload,
		@Arg("employeeId", () => String)
		employeeId: string
	): Promise<boolean> {
		try {
			console.log(employeeId);

			cloudinary.config({
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET,
			});

			const result = await new Promise((resolve, reject) => {
				createReadStream().pipe(
					cloudinary.uploader.upload_stream((error, result) => {
						if (error) {
							reject(error);
						}

						resolve(result);
					})
				);
			});

			console.log(result);

			// if (result.secureUrl) {
			// 	const response = await createEmployeeProfilePicture(
			// 		result.secureUrl,
			// 		Number(employeeId)
			// 	);
			// 	console.log(response);
			// }

			return true;
		} catch (err) {
			throw err;
		}
	}
}
