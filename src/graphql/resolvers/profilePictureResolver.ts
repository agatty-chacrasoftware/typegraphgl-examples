import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import {
	createEmployeeProfilePicture,
	uploadImageToCloudinary,
} from "../../helpers/profilePictureService";
import { ProfilePictureModel } from "../models/profilePictureModel";

@Resolver()
export class ProfilePictureResolver {
	@Mutation(() => ProfilePictureModel)
	async addProfilePicture(
		@Arg("picture", () => GraphQLUpload)
		{ createReadStream }: Upload,
		@Arg("employeeId", () => Int)
		employeeId: number
	) {
		const profilePictureUrl = await uploadImageToCloudinary(createReadStream);

		const employeeProfilePictureDetails = await createEmployeeProfilePicture(
			profilePictureUrl,
			Number(employeeId)
		);

		return employeeProfilePictureDetails;
	}
}
