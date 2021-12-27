import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { getCloudinaryUrl } from "../../helpers/profilePictureService";

@Resolver()
export class ProfilePictureResolver {
	@Mutation(() => String)
	async addProfilePicture(
		@Arg("picture", () => GraphQLUpload)
		{ createReadStream }: Upload
	) {
		const profilePictureUrl = await getCloudinaryUrl(createReadStream);

		return profilePictureUrl;
	}
}
